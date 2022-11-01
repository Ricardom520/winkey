"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFolder = void 0;
const index_1 = require("./index");
/** 指定路径下所有文件名 */
const readFolder = (target) => {
    return index_1.fs.readdirSync(target);
};
exports.readFolder = readFolder;
