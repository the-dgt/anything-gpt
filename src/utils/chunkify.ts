import {StreamNextFn} from "@/types"
import {decode} from "@/utils/decoder.ts"
import {unescape} from "@/utils/unescape.ts"

export const chunkify = <T>(
	response: Response,
	next: StreamNextFn<T>,
) => {
	const reader = response.body!.getReader()
	return reader.read()
		.then(async function nextChunk({ done, value }): Promise<T> {
			if (done) {
				return next("", true) as T
			}
      
			const regexp = /"content":\s*"((\\.|[^"])*)"/gm
			for await (const match of decode(value).matchAll(regexp)) {
				match[1] && await next(unescape(match[1]))
			}

			return reader.read().then(nextChunk)
		})
}
