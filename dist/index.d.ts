/// <reference types="node" />

export declare interface AbstractEnvironmentContext {
    state: ChatMessage[];
    storage: AbstractStorageContext;
    text: (response: ChatCompletionResponsePromise) => Promise<any>;
    stream: (response: ChatCompletionResponsePromise) => Promise<any>;
    error: (error: Response | Error) => Promise<any>;
}

export declare interface AbstractStorageContext {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
}

export declare interface ChatCompletionOptions {
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

export declare interface ChatCompletionResponse {
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

export declare interface ChatCompletionResponsePromise extends Response {
    json: () => Promise<ChatCompletionResponse>;
}

export declare interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export declare const chunkify: <T>(response: Response, next: StreamNextFn<T>) => Promise<T>;

export declare function core<T extends AbstractEnvironmentContext>(this: T, options: CreateInstanceOptions | undefined, strings: TemplateStringsArray, ...values: any[]): Promise<any>;

export declare interface CreateInstanceOptions {
    gpt: ChatCompletionOptions;
    instance: InstanceOptions;
}

export declare interface InstanceOptions {
    api_key: string;
    markdown?: boolean;
}

export declare interface StreamedChatCompletionResponse {
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

export declare type StreamNextFn<T> = (chunk: string, done?: boolean) => T | void;

export declare const useEnvironment: (env: Partial<AbstractEnvironmentContext>) => AbstractEnvironmentContext;

export declare const useOptions: (options?: {
    gpt?: Partial<ChatCompletionOptions>;
    instance?: Partial<InstanceOptions>;
}) => {
    gpt: {
        model: string;
        max_tokens?: number | undefined;
        temperature?: number | undefined;
        top_p?: number | undefined;
        n?: number | undefined;
        stream?: boolean | undefined;
        logprobs?: number | undefined;
        echo?: boolean | undefined;
        stop?: string | string[] | undefined;
        presence_penalty?: number | undefined;
        frequency_penalty?: number | undefined;
        best_of?: number | undefined;
        user?: string | undefined;
    };
    instance: {
        api_key: string;
        markdown?: boolean | undefined;
    };
};

export { }
