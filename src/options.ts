import {ChatCompletionOptions, InstanceOptions} from "@/types"

export const defaultGptOptions: ChatCompletionOptions = {
	model: "gpt-3.5-turbo",
	temperature: 0.7,
	max_tokens: 4000,
	stream: true
}

export const defaultInstanceOptions: InstanceOptions = {
	api_key: "",
	markdown: false
}

export const useOptions = (
	options?: { gpt?: Partial<ChatCompletionOptions>, instance?: Partial<InstanceOptions> }
) => ({
	gpt: {
		...defaultGptOptions,
		...options?.gpt,
	},
	instance: {
		...defaultInstanceOptions,
		...options?.instance,
	},
})
