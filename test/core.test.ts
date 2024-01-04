
import {core} from "../src/core"
import {ChatMessage} from "../src/types/gpt"
import {CreateInstanceOptions} from "../src/types/options"
import {AbstractEnvironmentContext} from "../src/types/context"

describe("core", () => {
	const globalFetch = global.fetch

	afterEach(() => {
		global.fetch = globalFetch
	})

	// Sends a valid request to the OpenAI API with the provided prompt and API key, and returns the response
	it("should send a valid request to the OpenAI API and return the response", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo"
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockResolvedValue({
			status: 200,
			json: jest.fn().mockResolvedValue({
				choices: []
			})
		})

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(fetchMock).toHaveBeenCalledWith("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: "Bearer API_KEY",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...options.gpt,
				messages: [{ role: "user", content: prompt }]
			})
		})
	})

	// Adds the user's prompt to the state array
	it("should add the user's prompt to the state array", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo"
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockResolvedValue({
			status: 200,
			json: jest.fn().mockResolvedValue({
				choices: []
			})
		})

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(state).toEqual([{ role: "user", content: prompt }])
	})

	// Handles and logs errors when the API key is undefined
	it("should handle and log errors when the API key is undefined", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo"
			},
			instance: {
				api_key: undefined as any
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const consoleErrorMock = jest.spyOn(console, "error").mockImplementation()

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(consoleErrorMock).toHaveBeenCalledWith("ERROR: ChatGPT API KEY is undefined.")
	})

	// Handles and logs errors when the fetch request fails
	fit("should handle and log errors when the fetch request fails", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo"
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockRejectedValue(new Error("Fetch error"))
		const consoleErrorMock = jest.spyOn(console, "error").mockImplementation()

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(consoleErrorMock).toHaveBeenCalledWith(new Error("Fetch error"))
	})

	// Handles and logs errors when the response body is undefined
	it("should handle and log errors when the response body is undefined", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo"
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockResolvedValue({
			status: 200
		})
		const consoleErrorMock = jest.spyOn(console, "error").mockImplementation()

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(consoleErrorMock).toHaveBeenCalledWith({ status: 200 })
	})

	// Handles and logs errors when the response status is not 200
	it("should handle and log errors when the response status is not 200", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo"
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockResolvedValue({
			status: 400,
			json: jest.fn().mockResolvedValue({
				choices: []
			})
		})
		const consoleErrorMock = jest.spyOn(console, "error").mockImplementation()

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(consoleErrorMock).toHaveBeenCalledWith({ status: 400 })
	})

	// Handles and logs errors when the response is not JSON-parseable
	it("should handle and log errors when the response is not JSON-parseable", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo"
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockResolvedValue({
			status: 200,
			json: jest.fn().mockRejectedValue(new Error("JSON parse error"))
		})
		const consoleErrorMock = jest.spyOn(console, "error").mockImplementation()

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(consoleErrorMock).toHaveBeenCalledWith(new Error("JSON parse error"))
	})

	// Handles and logs errors when the response JSON does not contain a 'choices' array
	it("should handle and log errors when the response JSON does not contain a 'choices' array", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo"
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockResolvedValue({
			status: 200,
			json: jest.fn().mockResolvedValue({})
		})
		const consoleErrorMock = jest.spyOn(console, "error").mockImplementation()

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(consoleErrorMock).toHaveBeenCalledWith({})
	})

	// Streams back partial progress when the 'stream' option is enabled
	it("should stream back partial progress when the 'stream' option is enabled", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo",
				stream: true
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockResolvedValue({
			status: 200,
			json: jest.fn().mockResolvedValue({
				choices: []
			})
		})

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		const response = await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(response).toEqual([])
	})

	// Echoes back the prompt in addition to the completion when the 'echo' option is enabled
	it("should echo back the prompt in addition to the completion when the 'echo' option is enabled", async () => {
		const options: CreateInstanceOptions = {
			gpt: {
				model: "gpt-3.5-turbo",
				echo: true
			},
			instance: {
				api_key: "API_KEY"
			}
		}

		const prompt = "Test prompt"
		const state: ChatMessage[] = []
		const fetchMock = jest.fn().mockResolvedValue({
			status: 200,
			json: jest.fn().mockResolvedValue({
				choices: []
			})
		})

		global.fetch = fetchMock

		const env = {
			state,
			stream: () => {},
			error: () => {},
		} as unknown as AbstractEnvironmentContext

		const response = await core.call(env, options, [prompt] as unknown as TemplateStringsArray)

		expect(response).toEqual([{ role: "user", content: prompt }])
	})

})
