"use strict";
/**
 * description: 命令配置文件
 * author: Ricardom
 */
exports.__esModule = true;
var commander = require("commander");
var task_1 = require("./task");
var program = commander.program;
/** 初始化脚手架 */
program.command('init').action(task_1["default"].initAction);
/** 运行 */
program.command('dev').action(task_1["default"].devAction);
/** 打包 */
program.command('build').action(task_1["default"].buildAction);
/** 更新seed包 */
program.command('update').action(task_1["default"].updateAction);
/** 展示命令 */
program.command('list').option('-s, --seeds', '查看所有seeds包').action(task_1["default"].listAction);
/** 单独安装seed包 */
program.command('install').action(task_1["default"].installAction);
exports["default"] = program;
