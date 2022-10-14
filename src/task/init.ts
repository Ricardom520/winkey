import * as chalk from 'chalk'
import * as inquirer from 'inquirer' 
import { ActionSturct } from '../model/action'
import { SeedDataStruct, SeedItemStruct } from '../model/seed'
import { listSeed } from '../lib/search'
import { seedFull2Short } from '../lib/formatter'
import LogProcess from '../lib/process'
import LocalConfig from '../lib/localConfig'
import lang from '../lang'
import { installAction } from './install'

const logProcess = new LogProcess()
const localConfig = new LocalConfig()

export const initAction = async (_, cmder: ActionSturct) => {
  logProcess.start(lang.INIT.START)
  logProcess.wait(lang.INIT.LIST_START)
  let targetPath = process.cwd()

  if (cmder.args[0]) {
    targetPath = cmder.args[0]
  }

  const seeds = await listSeed()
  
  logProcess.finsh(lang.INIT.LIST_FINISHED)

  const config: SeedDataStruct | Object = (await localConfig.get()) || {}

  const installedSeeds = (config as SeedDataStruct).seeds || []

  let seedItems: SeedItemStruct[] = installedSeeds.map((seed: string) => {
    const seedItem = (config as SeedDataStruct).seedMap[seed]
    const { version, dev } = seedItem
    const name = seed
    const shortName = seedFull2Short(name)
    
    return {
      name,
      shortName,
      installed: true,
      dev,
      choice: `${chalk.yellow.bold(shortName)} ${chalk.gray('(')}${
        dev ? 'local' : version
      }${chalk.gray(')')}`
    }
  })

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
      message: `${lang.INIT.QUEATION_SELECT_TYPE}:`,
      default: choices[0],
      choices: choices
    }
  ])

  iSeed = seedItems.filter((item) => item.choice === r.seed)[0].name

  const seedInfo = seedItems.filter((item) => item.name === iSeed)[0]
  // 判断选中的 seed 是否已经安装
  if (!seedInfo.installed) {
    logProcess.start(lang.INIT.SEED_INSTALLED)
    logProcess.wait(lang.INIT.SEED_INSTALLING)

    await installAction([seedInfo.name]).catch((er) => {
      logProcess.finsh(er, 1)
    })
  }
}