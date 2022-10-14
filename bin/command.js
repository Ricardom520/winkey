"use strict";
/**
 * description: 命令配置文件
 * author: Ricardom
 */
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const lang_1 = require("./lang");
const task_1 = require("./task");
const { program } = commander;
/** 初始化脚手架 */
program.command('init').description(lang_1.default.INIT.START).action(task_1.default.initAction);
exports.default = program;
