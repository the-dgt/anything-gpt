import { type ChatCompletionResponsePromise } from "@/types/gpt"
import { type CreateInstanceOptions } from "@/types/options"
import { type AbstractEnvironmentContext } from "@/types/context"
import {noResponseGuard, statusGuard} from "@/utils/guards.ts"
import {useOptions} from "@/utils/options.ts"

export async function core<T extends AbstractEnvironmentContext> (
	this: T,
	options: CreateInstanceOptions = useOptions(),
	strings: TemplateStringsArray,
	...values: any[]
): Promise<any> {
	if (!options.instance.api_key) {
		throw new Error("ERROR: ChatGPT API KEY is undefined.")
	}

	const prompt = Array
		.from(strings)
		.map((str, i) => {
			const value = values[i]
			return str + (value instanceof Object ? JSON.stringify(value) : value || "")
		})
		.join("")

	this.state.push({ role: "user", content: prompt })

	return await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${options.instance.api_key}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			...options.gpt,
			messages: this.state
		})
	})
		.then(noResponseGuard)
		.then(statusGuard)
		.then(async (response: ChatCompletionResponsePromise) =>
			options.gpt.stream
				? this.stream(response)
				: this.text(response))
		.catch(error => this.error(error))
}
