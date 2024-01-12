import { ChatCompletionOptions, InstanceOptions } from "../types";
export declare const defaultGptOptions: ChatCompletionOptions;
export declare const defaultInstanceOptions: InstanceOptions;
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
