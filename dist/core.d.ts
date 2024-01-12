import { type CreateInstanceOptions } from "./types/options";
import { type AbstractEnvironmentContext } from "./types/context";
export declare function core<T extends AbstractEnvironmentContext>(this: T, options: CreateInstanceOptions | undefined, strings: TemplateStringsArray, ...values: any[]): Promise<any>;
