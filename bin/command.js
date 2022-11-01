"use strict";
/**
 * description: 命令配置文件
 * author: Ricardom
 */
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const task_1 = require("./task");
const { program } = commander;
/** 初始化脚手架 */
program.command('init').action(task_1.default.initAction);
/** 运行 */
program.command('dev').action(task_1.default.devAction);
/** 打包 */
program.command('build').action(task_1.default.buildAction);
/** 展示命令 */
program.command('list').option('-s, --seeds', '查看所有seeds包').action(task_1.default.listAction);
exports.default = program;
