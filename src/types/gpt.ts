export interface ChatCompletionOptions {
  model: string // Specifies the model to be used (e.g., 'gpt-3.5-turbo')
  max_tokens?: number // Maximum number of tokens to generate
  temperature?: number // Controls randomness (0-1). Lower values make the model more deterministic
  top_p?: number // Controls diversity via nucleus sampling (0-1). Higher values mean more diversity
  n?: number // Number of completions to generate for each prompt
  stream?: boolean // Whether to stream back partial progress (defaults to false)
  logprobs?: number // Include the log probabilities on the logprobs most likely tokens. Up to 5
  echo?: boolean // Echo back the prompt in addition to the completion
  stop?: string | string[] // One or more sequences where the API will stop generating further tokens
  presence_penalty?: number // Increases the likelihood of talking about new topics (0-1)
  frequency_penalty?: number // Decreases the likelihood of repeating the same line verbatim (0-1)
  best_of?: number // Generates `n` completions server-side and returns the "best" (highest scoring) one
  user?: string // An optional unique identifier to represent the end-user
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    message: ChatMessage
    index: number
    logprobs: any // Replace 'any' with a more specific type if available
    finish_reason: string
  }>
}

export interface StreamedChatCompletionResponse {
  data: {
    id: string
    object: string
    created: number
    model: string
    choices: Array<{
      message: ChatMessage
      index: number
      logprobs: any
      finish_reason: string
    }>
  }
}

export interface ChatCompletionResponsePromise extends Response {
  json: () => Promise<ChatCompletionResponse>
}
