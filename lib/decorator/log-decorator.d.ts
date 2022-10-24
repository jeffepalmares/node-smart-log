declare const log: () => (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => PropertyDescriptor;
declare const info: () => (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => PropertyDescriptor;
declare const warn: () => (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => PropertyDescriptor;
export { log, info, warn };
