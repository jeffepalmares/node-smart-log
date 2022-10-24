"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericLogDecorator = void 0;
const log_1 = require("../log");
const log_actions_1 = require("../log/log-actions");
const logger_1 = require("../log/logger");
class GenericLogDecorator {
    static handleParameters(args, parameters) {
        for (const parameter of parameters) {
            if (typeof parameter === 'object') {
                if (parameter != null && parameter && parameter.constructor && parameter.constructor.name === 'Object') {
                    args.push(parameter);
                }
            }
            else {
                args.push(parameter);
            }
        }
        return args;
    }
    static handlerMethodTrace(logTrace, start, logLevel, err) {
        if (err) {
            logTrace.hasFailed = true;
            logTrace.errorMessage = err.message;
        }
        logTrace.duration = new Date().getTime() - start.getTime();
        if (logLevel == log_1.LogLevel.DEBUG && logTrace.hasFailed) {
            logger_1.Logger.warn(`Called method: ${logTrace.method}`, logTrace);
        }
        else {
            logger_1.Logger[logLevel](`Called method: ${logTrace.method}`, logTrace);
        }
    }
    static handleAsyncFunction(result, logTrace, start, logLvel) {
        return new Promise((resolve, reject) => {
            result
                .then((funcResult) => {
                GenericLogDecorator.handlerMethodTrace(logTrace, start, logLvel);
                return resolve(funcResult);
            })
                .catch((err) => {
                GenericLogDecorator.handlerMethodTrace(logTrace, start, logLvel, err);
                return reject(err);
            });
        });
    }
    static apply(key, descriptor, logLevel) {
        const originalMethod = descriptor.value;
        descriptor.value = function () {
            const start = new Date();
            const args = GenericLogDecorator.handleParameters([], arguments);
            const constructorName = this && this.constructor ? this.constructor.name : 'unknown';
            const logTrace = {
                action: log_actions_1.LogActions.MethodTrace,
                method: `${constructorName}.${String(key)}`,
                class: constructorName,
                function: String(key),
                parameters: args,
                hasFailed: false,
            };
            try {
                const result = originalMethod.apply(this, arguments);
                if (result instanceof Promise) {
                    return GenericLogDecorator.handleAsyncFunction(result, logTrace, start, logLevel);
                }
                GenericLogDecorator.handlerMethodTrace(logTrace, start, logLevel);
                return result;
            }
            catch (err) {
                GenericLogDecorator.handlerMethodTrace(logTrace, start, logLevel, err);
                throw err;
            }
        };
        return descriptor;
    }
}
exports.GenericLogDecorator = GenericLogDecorator;
