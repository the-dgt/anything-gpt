import {noResponseGuard, statusGuard} from "../src/utils/guards"
import {chunkify} from "../src/utils/stream"

describe("noResponseGuard", () => {

	// Returns the response object if it has a truthy 'body' property.
	it("should return the response object when it has a truthy 'body' property", () => {
		const response = { body: "example body" }
		expect(noResponseGuard(response)).toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if it does not have a truthy 'body' property.
	it("should return a rejected promise with the response object as the reason when it does not have a truthy 'body' property", () => {
		const response = { body: null }
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if the input is falsy.
	it("should return a rejected promise with the response object as the reason when the input is falsy", () => {
		const response = null
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if the input is an empty object.
	it("should return a rejected promise with the response object as the reason when the input is an empty object", () => {
		const response = {}
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if the input is an empty array.
	it("should return a rejected promise with the response object as the reason when the input is an empty array", () => {
		const response = []
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if the input is a string with length 0.
	it("should return a rejected promise with the response object as the reason when the input is a string with length 0", () => {
		const response = ""
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if the input is a number with value 0.
	it("should return a rejected promise with the response object as the reason when the input is a number with value 0", () => {
		const response = 0
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if the input is null.
	it("should return a rejected promise with the response object as the reason when the input is null", () => {
		const response = null
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if the input is undefined.
	it("should return a rejected promise with the response object as the reason when the input is undefined", () => {
		const response = undefined
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

	// Returns a rejected promise with the response object as the reason if the input is NaN.
	it("should return a rejected promise with the response object as the reason when the input is NaN", () => {
		const response = NaN
		expect(noResponseGuard(response)).rejects.toBe(response)
	})

})

describe("statusGuard", () => {

	// Returns the response if the status code is 200.
	it("should return the response when the status code is 200", () => {
		// Arrange
		const response = { status: 200 }

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).toBe(response)
	})

	// Returns a rejected promise if the status code is not 200.
	it("should return a rejected promise when the status code is not 200", () => {
		// Arrange
		const response = { status: 400 }

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

	// Returns a rejected promise if the response is undefined.
	it("should return a rejected promise when the response is undefined", () => {
		// Arrange
		const response = undefined

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

	// Returns a rejected promise if the response is null.
	it("should return a rejected promise when the response is null", () => {
		// Arrange
		const response = null

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

	// Returns a rejected promise if the response has no status or statusCode property.
	it("should return a rejected promise when the response has no status or statusCode property", () => {
		// Arrange
		const response = {}

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

	// Returns a rejected promise if the status code is not a number.
	it("should return a rejected promise when the status code is not a number", () => {
		// Arrange
		const response = { status: "200" }

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

	// Returns a rejected promise if the response is an empty object.
	it("should return a rejected promise when the response is an empty object", () => {
		// Arrange
		const response = {}

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

	// Returns a rejected promise if the response is an empty array.
	it("should return a rejected promise when the response is an empty array", () => {
		// Arrange
		const response = []

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

	// Returns a rejected promise if the response has a status code of 0.
	it("should return a rejected promise when the response has a status code of 0", () => {
		// Arrange
		const response = { status: 0 }

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

	// Returns a rejected promise if the response has a negative status code.
	it("should return a rejected promise when the response has a negative status code", () => {
		// Arrange
		const response = { status: -200 }

		// Act
		const result = statusGuard(response)

		// Assert
		expect(result).rejects.toBe(response)
	})

})

const mockResponse = (chunks) => {
	const stream = new ReadableStream({
		start(controller) {
			if(chunks.length === 0) {
				controller.close() // Close the stream if no chunks are provided
			}
			chunks.forEach((chunk, index) => {
				controller.enqueue(new TextEncoder().encode(chunk))
				if (index === chunks.length - 1) {
					controller.close()
				}
			})
		}
	})

	return new Response(stream)
}

describe("chunkify", () => {
	// 1. Test empty response
	it("handles empty response", async () => {
		const response = mockResponse([])
		const next = jest.fn()
		await chunkify(response, next)
		expect(next).toHaveBeenCalledWith("", true)
	})

	// 2. Test single chunk
	it("handles single chunk", async () => {
		const response = mockResponse(["{\"content\":\"test\"}"])
		const next = jest.fn()
		await chunkify(response, next)
		expect(next).toHaveBeenCalledWith("test", false)
		expect(next).toHaveBeenCalledWith("", true)
	})

	it("handles multiple chunks", async () => {
		const response = mockResponse(["{\"content\":\"first\"}", "{\"content\":\"second\"}"])
		const next = jest.fn()
		await chunkify(response, next)
		expect(next).toHaveBeenCalledWith("first", false)
		expect(next).toHaveBeenCalledWith("second", false)
		expect(next).toHaveBeenCalledWith("", true)
	})

	// 4. Test JSON content replacement
	it("handles JSON content replacement", async () => {
		const response = mockResponse(["{\"content\":\"some\\ncontent\"}"])
		const next = jest.fn()
		await chunkify(response, next)
		expect(next).toHaveBeenCalledWith("some\ncontent", false)
		expect(next).toHaveBeenCalledWith("", true)
	})

	// 5. Test newline replacement in content
	it("replaces newline characters in content", async () => {
		const response = mockResponse(["{\"content\":\"line1\\nline2\"}"])
		const next = jest.fn()
		await chunkify(response, next)
		expect(next).toHaveBeenCalledWith("line1\nline2", false)
		expect(next).toHaveBeenCalledWith("", true)
	})

	// 6. Test with invalid JSON content
	it("handles invalid JSON content", async () => {
		const response = mockResponse(["invalid JSON"])
		const next = jest.fn()
		await chunkify(response, next)
		expect(next).toHaveBeenCalledWith("", true) // Assuming function skips invalid JSON
	})

	// 7. Test with non-JSON content
	it("handles non-JSON content", async () => {
		const response = mockResponse(["Non-JSON content"])
		const next = jest.fn()
		await chunkify(response, next)
		// Assuming the function does nothing with non-JSON content
		expect(next).toHaveBeenCalledWith("", true)
	})

	// 8. Test error handling
	it("handles stream reading errors", async () => {
		const response = mockResponse(["{\"content\":\"test\"}"])
		response.body!.getReader = () => ({
			read: () => Promise.reject(new Error("Stream error"))
		}) as any
		const next = jest.fn()
		await expect(chunkify(response, next)).rejects.toThrow("Stream error")
	})

	// 9. Test `done` flag handling
	it("handles the done flag correctly", async () => {
		const response = mockResponse(["{\"content\":\"final chunk\"}"])
		const next = jest.fn()
		await chunkify(response, next)
		expect(next).toHaveBeenCalledWith("final chunk", false)
		expect(next).toHaveBeenCalledWith("", true) // Check if done is handled correctly
	})

	// 10. Test stream end
	it("handles end of stream", async () => {
		const response = mockResponse(["{\"content\":\"chunk1\"}", "{\"content\":\"chunk2\"}"])
		const next = jest.fn()
		await chunkify(response, next)
		expect(next).toHaveBeenCalledWith("chunk1", false)
		expect(next).toHaveBeenCalledWith("chunk2", false)
		expect(next).toHaveBeenCalledWith("", true) // Check if the end of the stream is handled
	})
})