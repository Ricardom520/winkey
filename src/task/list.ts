import { logger, LogType } from '../lib'
import { listSeed } from '../lib/search'
import LogProcess from '../lib/process'
import lang from '../lang'

interface listActionOptions {
  seeds?: boolean
}

const logProcess = new LogProcess()

export const listAction = async (val: listActionOptions) => {
  if (val.seeds) {
    logProcess.start(lang.SEEDS.START)
    logProcess.wait(lang.SEEDS.LOADING)
    const seeds = await listSeed()
    logProcess.finsh(lang.SEEDS.END)

    seeds.forEach((item: string) => {
      logger(LogType.Info, `seed包名称：${item}`)
    })
    return
  }

  logger(LogType.Info, lang.WINKEY.DEFAULT)
  logger(LogType.Tip, lang.WINKEY.DEV)
  logger(LogType.Tip, lang.WINKEY.BUILD)
  logger(LogType.Tip, lang.WINKEY.LISTSEEDS)
  logger(LogType.Tip, lang.WINKEY.UPDATESEEDS)
}