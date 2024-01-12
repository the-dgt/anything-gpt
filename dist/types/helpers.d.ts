export type StreamNextFn<T> = (chunk: string, done?: boolean) => T | void;
