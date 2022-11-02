"use strict";
exports.__esModule = true;
exports.readFolder = void 0;
var index_1 = require("./index");
/** 指定路径下所有文件名 */
var readFolder = function (target) {
    return index_1.fs.readdirSync(target);
};
exports.readFolder = readFolder;
