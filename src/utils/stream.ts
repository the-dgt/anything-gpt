export const chunkify = <T>(
	response: Response,
	next: (chunk: string, done: boolean) => T | void,
) => {
	const reader = response.body!.getReader()

	return reader
		.read()
		.then(async function nextChunk({ done, value }: ReadableStreamReadResult<Uint8Array>): Promise<T> {
			if (done) {
				return next("", true) as T
			}

			String
				.fromCharCode(...value)
				.replace(
					/"content":"([^"]*)"/g,
					(match, content) => (next(content.replace(/\\n/g, "\n"), false), match)
				)

			return reader.read().then(nextChunk)
		})
}
