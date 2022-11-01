/**
 * description: 命令配置文件
 * author: Ricardom
 */

import * as commander from 'commander'
import task from './task'

const { program } = commander

/** 初始化脚手架 */
program.command('init').action(task.initAction)

/** 运行 */
program.command('dev').action(task.devAction)

/** 打包 */
program.command('build').action(task.buildAction)

/** 展示命令 */
program.command('list').option('-s, --seeds', '查看所有seeds包').action(task.listAction)

export default program
