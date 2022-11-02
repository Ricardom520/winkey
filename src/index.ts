/**
 * description: 教架入口文件
 * author: Ricardom
 */
import program from './command'
import * as path from 'path'
import { error, chalk, fs, info } from './lib'

let pkgVersion = ''
let pkgName = ''

// 获取当前包的信息
const getPkgInfo = () => {
  const jsonPath = path.join(__dirname, '../package.json')
  const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
  const jsonResult = JSON.parse(jsonContent)

  pkgVersion = jsonResult.version
  pkgName = jsonResult.name
}

getPkgInfo()

program.version(pkgVersion)

program.on('command:*', async ([cmd]) => {
  program.outputHelp()
  error(`未知命令 command ${chalk.yellow(cmd)}.`)

  process.exitCode = 1
})

program.parseAsync(process.argv)