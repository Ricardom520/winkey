import * as path from 'path'
import * as fs from 'fs'
import { ActionSturct } from '../model/action'
import { mkdirSync } from '../lib/utils'
import { IS_WINDOWS } from '../lib/consts'
import { runSpawn } from '../lib/os'
import { infoSpinner } from '../lib/spinner'
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
  
  if (!fs.existsSync(CONFIG_PLUGIN_PATH)) {
    await mkdirSync(CONFIG_PLUGIN_PATH).catch((er) => {
      throw er
    })

    await reset().catch((er) => {
      throw er
    })
  }

  await runSpawn(
    `npm install ${names.join(' ')}@0.0.25-alpha.0 --save`,
    CONFIG_PLUGIN_PATH,
    (msg) => {
      infoSpinner(msg.toString())
    }
  )
  .catch((er) => {
    throw er
    return
  })

  await localConfig.updateSeedInfo().catch((er) => {
    throw er
  })
}