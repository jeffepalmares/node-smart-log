"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerConstants = exports.LoggerContext = exports.LogLevel = exports.buildLogger = exports.Logger = void 0;
const logger_constants_1 = require("./logger-constants");
Object.defineProperty(exports, "LoggerConstants", { enumerable: true, get: function () { return logger_constants_1.LoggerConstants; } });
const log_1 = require("./log");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return log_1.Logger; } });
Object.defineProperty(exports, "buildLogger", { enumerable: true, get: function () { return log_1.buildLogger; } });
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return log_1.LogLevel; } });
Object.defineProperty(exports, "LoggerContext", { enumerable: true, get: function () { return log_1.LoggerContext; } });
__exportStar(require("./decorator"), exports);
