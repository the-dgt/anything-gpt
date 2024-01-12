/// <reference types="node" />
import { StreamNextFn } from "../types";
export declare const chunkify: <T>(response: Response, next: StreamNextFn<T>) => Promise<T>;
