declare const instance: (api_key: string) => (...args: any[]) => Promise<(fn: import("../types").StreamNextFn<import("../types").ChatMessage[]>) => Promise<import("../types").ChatMessage[]>>;
export default instance;
