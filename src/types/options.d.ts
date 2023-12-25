import { type ChatCompletionOptions } from '@/types/gpt'

export interface InstanceOptions {
  api_key: string
  markdown?: boolean
}

export interface CreateInstanceOptions {
  gpt: ChatCompletionOptions
  instance: InstanceOptions
}
