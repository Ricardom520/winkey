import * as chalk from 'chalk'
import * as path from 'path'
import * as fs from 'fs'
import * as inquirer from 'inquirer' 
import { runSpawn } from 'winkey-os'
import { SeedDataStruct, SeedItemStruct } from '../model/seed'
import { ActionSturct } from '../model/action'
import { seedFull2Short } from '../lib/formatter'
import { listSeed } from '../lib/search'
import { IS_WINDOWS } from '../lib/consts'
import { logger, LogType } from '../lib/logger'
import { installAction } from './install'
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

export const updateAction = async (_, cmder?: ActionSturct) => {
  logProcess.start(lang.UPDATE.START)
  logProcess.wait(lang.UPDATE.LIST_START)
  let targetPath = process.cwd()

  if (cmder.args && cmder.args[0]) {
    targetPath = path.resolve(cmder.args[0])
  }

  if (!fs.existsSync(targetPath)) {
    logger(LogType.Error, '所选目录不存在')
    return
  }

  const seedsMap = await listSeed({
    map: true
  })

  logProcess.finsh(lang.INIT.LIST_FINISHED)

  let config: SeedDataStruct | Object = (await localConfig.get()) || {}

  const installedSeeds = (config as SeedDataStruct).seeds || []

  let seedItems: SeedItemStruct[] = installedSeeds.map((seed: string) => {
    const seedItem = (config as SeedDataStruct).seedMap[seed]
    const { dev } = seedItem
    const name = seed
    const shortName = seedFull2Short(name)
    
    return {
      name,
      shortName,
      installed: true,
      dev,
      choice: `${chalk.yellow.bold(shortName)} ${chalk.gray('(')}${
        dev ? 'local' : seedsMap[seed].version
      }${chalk.gray(')')}`
    }
  })

  const seeds = Object.keys(seedsMap).map((name) => name)

  seedItems = seedItems.concat(
    seeds
      .filter((name) => installedSeeds.indexOf(name) === -1)
      .map((name) => {
        const shortName = seedFull2Short(name)

        return {
          name,
          shortName,
          installed: false,
          dev: false,
          choice: chalk.gray(shortName)
        }
      })
  )

  seedItems.sort((a, b) => {
    if (a.installed && !b.installed) {
      return -1
    } else if (!a.installed && b.installed) {
      return 1
    } else if (a.installed && b.installed) {
      if (a.dev && !b.dev) {
        return -1
      } else if (!a.dev && b.dev) {
        return 1
      } else {
        return a.name.localeCompare(b.name)
      }
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  let iSeed = ''

  const choices = seedItems.map((item) => item.choice)
  const r = await inquirer.prompt([
    {
      type: 'list',
      name: 'seed',
      message: `${lang.UPDATE.QUEATION_SELECT_TYPE}:`,
      default: choices[0],
      choices: choices
    }
  ])

  iSeed = seedItems.filter((item) => item.choice === r.seed)[0].name

  const seedInfo = seedItems.filter((item) => item.name === iSeed)[0]

  let seedName = seedInfo.name

  if (seedInfo.installed) {
    seedName = seedName + `@${seedsMap[seedName].version}`
  }

  logProcess.start(lang.UPDATE.SEED_INSTALLSTART)
  logProcess.wait(lang.UPDATE.SEED_INSTALLING)

  await installAction([seedName]).catch((er) => {
    logProcess.finsh(er, 1)
  })

  logProcess.finsh(lang.UPDATE.SEED_INSTALLED)
}