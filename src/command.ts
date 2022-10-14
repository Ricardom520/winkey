/**
 * description: 命令配置文件
 * author: Ricardom
 */

import * as commander from 'commander'
import lang from './lang'
import task from './task'

const { program } = commander

/** 初始化脚手架 */
program.command('init').action(task.initAction)

export default program
