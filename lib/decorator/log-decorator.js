"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.info = exports.log = void 0;
const log_1 = require("../log");
const generic_log_decorator_1 = require("./generic-log-decorator");
class LogDecorator extends generic_log_decorator_1.GenericLogDecorator {
    constructor() {
        super(...arguments);
        this.log = () => (target, key, descriptor) => LogDecorator.apply(key, descriptor, log_1.LogLevel.DEBUG);
        this.info = () => (target, key, descriptor) => LogDecorator.apply(key, descriptor, log_1.LogLevel.INFO);
        this.warn = () => (target, key, descriptor) => LogDecorator.apply(key, descriptor, log_1.LogLevel.WARN);
    }
}
const decorator = new LogDecorator();
const { log } = decorator;
exports.log = log;
const { info } = decorator;
exports.info = info;
const { warn } = decorator;
exports.warn = warn;
