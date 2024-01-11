export const decode = (value: Uint8Array): string => TextDecoder
	? new TextDecoder().decode(value, { stream: true })
	: String.fromCharCode(...value) // fallback if TextDecoder isn't defined
