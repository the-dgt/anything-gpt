import {useEnvironment} from "../src/environment"

describe("useEnvironment", () => {

	// Returns an object with default values when no environment is provided
	it("should return an object with default values when no environment is provided", () => {
		const result = useEnvironment({})
		expect(result.state).toEqual([])
		expect(result.storage).toEqual(new Map())
		expect(result.text).toBeDefined()
		expect(result.stream).toBeDefined()
		expect(result.error).toBeDefined()
	})

	// Returns an object with the provided state and storage values
	it("should return an object with the provided state and storage values", () => {
		const state = [{ role: "user", content: "Hello" }] as any
		const storage = new Map([["key", "value"]])
		const result = useEnvironment({ state, storage })
		expect(result.state).toEqual(state)
		expect(result.storage).toEqual(storage)
		expect(result.text).toBeDefined()
		expect(result.stream).toBeDefined()
		expect(result.error).toBeDefined()
	})

	// Calls the text function from the provided environment when text function is called
	it("should call the text function from the provided environment when text function is called", async () => {
		const textFunction = jest.fn()
		const env = { text: textFunction }
		const result = useEnvironment(env)
		const response = { json: jest.fn() }
		await result.text(response as unknown as Response)
		expect(textFunction).toHaveBeenCalledWith(response)
	})

	// Calls the stream function from the provided environment when stream function is called
	it("should call the stream function from the provided environment when stream function is called", async () => {
		const streamFunction = jest.fn()
		const env = { stream: streamFunction }
		const result = useEnvironment(env)
		const response = { json: jest.fn() }
		await result.stream(response as unknown as Response)
		expect(streamFunction).toHaveBeenCalledWith(response)
	})

	// Calls the error function from the provided environment when error function is called
	it("should call the error function from the provided environment when error function is called", async () => {
		const errorFunction = jest.fn()
		const env = { error: errorFunction }
		const result = useEnvironment(env)
		const response = new Error("Test error")
		await result.error(response)
		expect(errorFunction).toHaveBeenCalledWith(response)
	})

	// Returns an object with empty state and storage when partial environment is provided with no values
	it("should return an object with empty state and storage when partial environment is provided with no values", () => {
		const result = useEnvironment({})
		expect(result.state).toEqual([])
		expect(result.storage).toEqual(new Map())
		expect(result.text).toBeDefined()
		expect(result.stream).toBeDefined()
		expect(result.error).toBeDefined()
	})

	// Returns an object with empty state and default storage when partial environment is provided with no storage value
	it("should return an object with empty state and default storage when partial environment is provided with no storage value", () => {
		const result = useEnvironment({ state: [] })
		expect(result.state).toEqual([])
		expect(result.storage).toEqual(new Map())
		expect(result.text).toBeDefined()
		expect(result.stream).toBeDefined()
		expect(result.error).toBeDefined()
	})

	// Returns an object with default state and empty storage when partial environment is provided with no state value
	it("should return an object with default state and empty storage when partial environment is provided with no state value", () => {
		const result = useEnvironment({ storage: new Map() })
		expect(result.state).toEqual([])
		expect(result.storage).toEqual(new Map())
		expect(result.text).toBeDefined()
		expect(result.stream).toBeDefined()
		expect(result.error).toBeDefined()
	})

	// Returns an object with empty state and default storage when partial environment is provided with undefined storage value
	it("should return an object with empty state and default storage when partial environment is provided with undefined storage value", () => {
		const result = useEnvironment({ state: [], storage: undefined })
		expect(result.state).toEqual([])
		expect(result.storage).toEqual(new Map())
		expect(result.text).toBeDefined()
		expect(result.stream).toBeDefined()
		expect(result.error).toBeDefined()
	})

	// Returns an object with default state and empty storage when partial environment is provided with undefined state value
	it("should return an object with default state and empty storage when partial environment is provided with undefined state value", () => {
		const result = useEnvironment({ state: undefined, storage: new Map() })
		expect(result.state).toEqual([])
		expect(result.storage).toEqual(new Map())
		expect(result.text).toBeDefined()
		expect(result.stream).toBeDefined()
		expect(result.error).toBeDefined()
	})

})
