import { AbstractEnvironmentContext, ChatCompletionResponsePromise } from "@/types"

export const useEnvironment = (env: Partial<AbstractEnvironmentContext>): AbstractEnvironmentContext => {
	return {
		state: env.state || [],
		storage: env.storage || new Map(),
		text: async function (response: ChatCompletionResponsePromise) {
			return env?.text?.call(this, response)
		},
		stream: async function (response: ChatCompletionResponsePromise) {
			return env?.stream?.call(this, response)
		},
		error: async function (response: Response | Error) {
			return env?.error?.call(this, response)
		},
	}
}
