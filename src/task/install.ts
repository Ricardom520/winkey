import * as path from 'path'
import * as fs from 'fs'
import { runSpawn } from 'winkey-os'
import { ActionSturct } from '../model/action'
import { mkdirSync } from '../lib/utils'
import { IS_WINDOWS } from '../lib/consts'
import { logger } from '../lib/logger'
import LocalConfig from '../lib/localConfig'
import LogProcess from '../lib/process'
import lang from '../lang'

const USERPROFILE =
  process.env[IS_WINDOWS ? 'USERPROFILE' : 'HOME']
const CONFIG_PATH = path.join(USERPROFILE, '.init-project')
const CONFIG_PLUGIN_PATH = path.join(CONFIG_PATH, 'plugins')

const logProcess = new LogProcess()
const localConfig = new LocalConfig()

const reset = async () => {
  await localConfig.reset().catch((err) => {
    throw err
  })
}

export const installAction = async (names, cmder?: ActionSturct) => {
  logProcess.start(lang.INSTALL.START)
  
  let targetPath = CONFIG_PLUGIN_PATH

  if (cmder.args && cmder.args[0]) {
    targetPath = path.resolve(targetPath, cmder.args[0])
  }

  if (!fs.existsSync(targetPath)) {
    await mkdirSync(targetPath).catch((er) => {
      throw er
    })

    await reset().catch((er) => {
      throw er
    })
  }

  await runSpawn({
    cmd: `npm install ${names.join(' ')}@0.0.34-alpha.0 --save`,
    targetPath: targetPath,
    logger: logger
  }).catch((er) => {
    throw er
    return
  })

  await localConfig.updateSeedInfo().catch((er) => {
    throw er
  })
}