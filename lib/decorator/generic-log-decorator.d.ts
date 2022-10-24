import { LogLevel } from '../log';
export interface LogTrace {
    action: string;
    method: string;
    class: string;
    function: string;
    parameters?: any;
    hasFailed?: boolean;
    duration?: number;
    errorMessage?: unknown;
}
export declare abstract class GenericLogDecorator {
    private static handleParameters;
    private static handlerMethodTrace;
    private static handleAsyncFunction;
    protected static apply(key: PropertyKey, descriptor: PropertyDescriptor, logLevel: LogLevel): PropertyDescriptor;
}
