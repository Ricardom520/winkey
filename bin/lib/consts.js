"use strict";
exports.__esModule = true;
exports.IS_WINDOWS = exports.getRootName = exports.platform = exports.cwd = void 0;
exports.cwd = process.cwd();
exports.platform = process.platform;
var getRootName = function () {
    var rootPath = exports.cwd;
    // linux 环境
    if (exports.platform.indexOf('win') === -1) {
        rootPath.replace(/\//g, '\\');
    }
    var arr = rootPath.split('\\');
    return arr[arr.length - 1];
};
exports.getRootName = getRootName;
exports.IS_WINDOWS = process.platform === 'win32';
