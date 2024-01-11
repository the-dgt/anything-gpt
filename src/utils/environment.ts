import { AbstractEnvironmentContext, ChatCompletionResponsePromise } from "@/types"

export const useEnvironment = (env: Partial<AbstractEnvironmentContext>): AbstractEnvironmentContext => {
	return {
		state: env.state || [],
		storage: env.storage || new Map(),
		text: async (response: ChatCompletionResponsePromise) => {
			return env?.text?.(response)
		},
		stream: async (response: ChatCompletionResponsePromise) => {
			return env?.stream?.(response)
		},
		error: async (response: Response | Error) => {
			return env?.error?.(response)
		},
	}
}
