"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerContext = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const context_local_storage_1 = require("context-local-storage");
const logger_configs_1 = require("./logger-configs");
class LoggerContext {
    /**
     * Get start a new isolated async storage context
     * The function to be executed in a storage context
     * @param next: {Function}
     *
     * Optional CorrelationId to be set on this new log context
     * @param correlationId: {string}
     */
    static startLoggerContext(next, correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return context_local_storage_1.StorageContext.run(() => __awaiter(this, void 0, void 0, function* () {
                context_local_storage_1.StorageContext.scope();
                if (correlationId) {
                    LoggerContext.setCorrelationId(correlationId);
                }
                return next();
            }));
        });
    }
    /**
     * Sets correlation id
     * The setted correlationId will be printed in every application log
     * @param correlationId: {string}
     */
    static setCorrelationId(correlationId) {
        context_local_storage_1.StorageContext.scope();
        context_local_storage_1.StorageContext.setContextValue('correlationId', correlationId, context_local_storage_1.ClsContextNamespace.LOGGER);
    }
    /**
     * Gets correlation id
     * @returns correlation id {string}
     */
    static getCorrelationId() {
        const value = context_local_storage_1.StorageContext.getContextValue('correlationId', context_local_storage_1.ClsContextNamespace.LOGGER);
        return value;
    }
    /**
     * Extra data
     * You can set some extra info to you log
     * For Example: You can specify the user loggedId so everytime your user has logged in just add the id here and a key then in every appliction log the user id will be logged
     * @param key: {string}
     * @param value: {string}
     */
    static setLogInfoData(key, value) {
        const data = LoggerContext.getLogInfoData();
        data[key] = value;
        context_local_storage_1.StorageContext.setContextValue('extraLogInfo', data, context_local_storage_1.ClsContextNamespace.LOGGER);
    }
    /**
     * Extra data
     * Returns the storaged extra log data
     */
    static getLogInfoData() {
        const data = context_local_storage_1.StorageContext.getContextValue('extraLogInfo', context_local_storage_1.ClsContextNamespace.LOGGER);
        return data || {};
    }
    /**
     * Fields name to be added in list of fields should be hidden on logs, by default the fields will be hidden are: ['password', 'cpf', 'psw', 'senha']
     * @param fields {string[]}
     * @return {void}
     */
    static addLoggerHidenField(fields) {
        fields = fields || [];
        logger_configs_1.LoggerConfigs.hiddenFields = logger_configs_1.LoggerConfigs.hiddenFields.concat(fields);
    }
    /**
     * Replace fields to be hidden on logs, by default the fields will be hidden are: ['password', 'cpf', 'psw', 'senha']
     * @param fields {string[]}
     * @return {void}
     */
    static setLoggerHidenField(fields) {
        fields = fields || [];
        logger_configs_1.LoggerConfigs.hiddenFields = fields;
    }
}
exports.LoggerContext = LoggerContext;
