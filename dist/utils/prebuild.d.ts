import { ChatMessage, CreateInstanceOptions, StreamNextFn } from "../types";
import { useEnvironment } from "../utils/environment.ts";
export declare const prebuild: (options: Partial<CreateInstanceOptions> & Partial<ReturnType<typeof useEnvironment>>) => (api_key: string) => (...args: any[]) => Promise<(fn: StreamNextFn<ChatMessage[]>) => Promise<ChatMessage[]>>;
