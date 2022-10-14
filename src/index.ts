/**
 * description: 教架入口文件
 * author: Ricardom
 */
import program from './command'
import * as path from 'path'
import * as pacote from 'pacote'
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

// 获取最新包最新版本
const getLatestVersion = async () => {
  const manifest = await pacote.manifest(`${pkgName}@latest`)

  return manifest.version
}

getPkgInfo()

program.version(pkgVersion)

program.on('command:*', async ([cmd]) => {
  program.outputHelp()
  error(`未知命令 command ${chalk.yellow(cmd)}.`)

  const latestVersion = await getLatestVersion()

  if (latestVersion !== pkgVersion) {
    info(`可更新版本，${chalk.green(pkgVersion)} -> ${chalk.green(latestVersion)} \n执行npm install -g ${pkgName}`)
  }

  process.exitCode = 1
})

program.parseAsync(process.argv)