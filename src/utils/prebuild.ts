import {AbstractEnvironmentContext, ChatMessage, CreateInstanceOptions, StreamNextFn} from "@/types"
import {core} from "@/core.ts"
import {useEnvironment} from "@/utils/environment.ts"
import {chunkify} from "@/utils/chunkify.ts"
import {useOptions} from "@/utils/options.ts"

export const prebuild = (
	options: Partial<CreateInstanceOptions> & Partial<ReturnType<typeof useEnvironment>>
) => 
	(api_key: string) => 
		(...args: any[]) =>
			new Promise<(fn: StreamNextFn<ChatMessage[]>) => Promise<ChatMessage[]>>(
				(resolve, reject) => core.apply(
					useEnvironment({
						state: [],
						async stream(response) {
							return resolve((next, chunks: string[] = []) =>
								chunkify(response, (chunk, done) =>
									chunks.push(chunk) && done
										? Object.assign(
                  this.state!,
                  {[this.state!.length - 1]: {role: "assistant", content: chunks.join("")}}
										)
										: next(chunk)
								))
						},
						error: reject as AbstractEnvironmentContext["error"],
					}),
					[
						useOptions({
							gpt: options.gpt,
							instance: Object.assign({ api_key }, options?.instance),
						}),
						...args as unknown as [TemplateStringsArray, ...any[]]
					]
				)
			)