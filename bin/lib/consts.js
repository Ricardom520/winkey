"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_WINDOWS = exports.getRootName = exports.platform = exports.cwd = void 0;
exports.cwd = process.cwd();
exports.platform = process.platform;
const getRootName = () => {
    let rootPath = exports.cwd;
    // linux 环境
    if (exports.platform.indexOf('win') === -1) {
        rootPath.replace(/\//g, '\\');
    }
    const arr = rootPath.split('\\');
    return arr[arr.length - 1];
};
exports.getRootName = getRootName;
exports.IS_WINDOWS = process.platform === 'win32';
