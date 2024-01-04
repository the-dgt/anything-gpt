import {defaultGptOptions, defaultInstanceOptions, useOptions} from "../src/options"

describe("useOptions", () => {

	// Returns default options when no arguments are passed
	it("should return default options when no arguments are passed", () => {
		const result = useOptions()
		expect(result).toEqual({
			gpt: defaultGptOptions,
			instance: defaultInstanceOptions
		})
	})

	// Merges partial gpt options with default gpt options
	it("should merge partial gpt options with default gpt options", () => {
		const partialGptOptions = {
			model: "gpt-3.5-turbo",
			temperature: 0.5
		}
		const result = useOptions({ gpt: partialGptOptions })
		expect(result).toEqual({
			gpt: {
				...defaultGptOptions,
				...partialGptOptions
			},
			instance: defaultInstanceOptions
		})
	})

	// Merges partial instance options with default instance options
	it("should merge partial instance options with default instance options", () => {
		const partialInstanceOptions = {
			api_key: "12345",
			markdown: true
		}
		const result = useOptions({ instance: partialInstanceOptions })
		expect(result).toEqual({
			gpt: defaultGptOptions,
			instance: {
				...defaultInstanceOptions,
				...partialInstanceOptions
			}
		})
	})

	// Returns merged gpt and instance options
	it("should return merged gpt and instance options", () => {
		const partialGptOptions = {
			model: "gpt-3.5-turbo",
			temperature: 0.5
		}
		const partialInstanceOptions = {
			api_key: "12345",
			markdown: true
		}
		const result = useOptions({ gpt: partialGptOptions, instance: partialInstanceOptions })
		expect(result).toEqual({
			gpt: {
				...defaultGptOptions,
				...partialGptOptions
			},
			instance: {
				...defaultInstanceOptions,
				...partialInstanceOptions
			}
		})
	})

	// Returns merged gpt and instance options with partial options provided
	it("should return merged gpt and instance options with partial options provided", () => {
		const partialGptOptions = {
			model: "gpt-3.5-turbo",
			temperature: 0.5
		}
		const result = useOptions({ gpt: partialGptOptions })
		expect(result).toEqual({
			gpt: {
				...defaultGptOptions,
				...partialGptOptions
			},
			instance: defaultInstanceOptions
		})
	})

	// Returns default gpt options when only partial instance options are provided
	it("should return default gpt options when only partial instance options are provided", () => {
		const partialInstanceOptions = {
			api_key: "12345",
			markdown: true
		}
		const result = useOptions({ instance: partialInstanceOptions })
		expect(result).toEqual({
			gpt: defaultGptOptions,
			instance: {
				...defaultInstanceOptions,
				...partialInstanceOptions
			}
		})
	})

	// Returns default instance options when only partial gpt options are provided
	it("should return default instance options when only partial gpt options are provided", () => {
		const partialGptOptions = {
			model: "gpt-3.5-turbo",
			temperature: 0.5
		}
		const result = useOptions({ gpt: partialGptOptions })
		expect(result).toEqual({
			gpt: {
				...defaultGptOptions,
				...partialGptOptions
			},
			instance: defaultInstanceOptions
		})
	})

	// Returns default options when empty objects are passed as arguments
	it("should return default options when empty objects are passed as arguments", () => {
		const result = useOptions({ gpt: {}, instance: {} })
		expect(result).toEqual({
			gpt: defaultGptOptions,
			instance: defaultInstanceOptions
		})
	})

	// Returns default instance options when invalid instance options are provided
	it("should return default instance options when invalid instance options are provided", () => {
		const invalidInstanceOptions = {
			api_key: "",
			markdown: false
		}
		const result = useOptions({ instance: invalidInstanceOptions })
		expect(result).toEqual({
			gpt: defaultGptOptions,
			instance: defaultInstanceOptions
		})
	})

})
