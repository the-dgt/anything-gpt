import {type ChatCompletionResponsePromise, type ChatMessage} from '@/types/gpt.ts'

export interface AbstractStorageContext {
  get: (key: string) => any
  set: (key: string, value: any) => void
}

export interface AbstractEnvironmentContext {
  state: ChatMessage[]
  storage: AbstractStorageContext
  text: (response: ChatCompletionResponsePromise) => Promise<any>
  stream: (response: ChatCompletionResponsePromise) => Promise<any>
  error: (error: Response | Error) => Promise<void>
}
