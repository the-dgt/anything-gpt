/// <reference types="node" />
export interface ChatCompletionOptions {
    model: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    logprobs?: number;
    echo?: boolean;
    stop?: string | string[];
    presence_penalty?: number;
    frequency_penalty?: number;
    best_of?: number;
    user?: string;
}
export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        message: ChatMessage;
        index: number;
        logprobs: any;
        finish_reason: string;
    }>;
}
export interface StreamedChatCompletionResponse {
    data: {
        id: string;
        object: string;
        created: number;
        model: string;
        choices: Array<{
            message: ChatMessage;
            index: number;
            logprobs: any;
            finish_reason: string;
        }>;
    };
}
export interface ChatCompletionResponsePromise extends Response {
    json: () => Promise<ChatCompletionResponse>;
}
