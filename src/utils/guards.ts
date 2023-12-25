export const noResponseGuard = (response: any) => response?.body
	? response
	: Promise.reject(response)

export const statusGuard = (response: any) => [response?.status, response?.statusCode].some(code => code === 200)
	? response
	: Promise.reject(response)