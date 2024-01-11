// @description,
// OpenAI Chat Completion API returns string with escaped characters,
// as a result we see the response with escaped characters, like \\n, \\":
//
// 'Here is a simple Python code using double quotes:\\n\\n```python\\nprint(\\"Hello, World!\\")\\n```'
//
// "unescape" function returns unescaped string
export const unescape = (str: string): string => {
	try {
		return JSON.parse(`["${str}"]`)[0] || str
	} catch (e) {
		return str
	}
}
