import { type ChatCompletionOptions } from '../types/gpt.ts';
export interface InstanceOptions {
    api_key: string;
    markdown?: boolean;
}
export interface CreateInstanceOptions {
    gpt: ChatCompletionOptions;
    instance: InstanceOptions;
}
