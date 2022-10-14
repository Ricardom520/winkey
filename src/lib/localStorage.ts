import * as path from 'path'
import * as fs from 'fs'
import { makeAsync, makeAwait } from './utils'
import { SeedDataStruct } from '../model/seed'

const USERPROFILE = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
const CONFIG_PATH = path.join(USERPROFILE, '.init-project')

class LocalStorage {
  public savePath: string
  private defaultData: SeedDataStruct
  private data: SeedDataStruct

  constructor(name, data) {
    const savePath = path.join(CONFIG_PATH, `${name}.json`)
    let iData = data || {}

    if (fs.existsSync(savePath)) {
      try {
        iData = require(savePath)
      } catch (er) {
        fs.writeFileSync(savePath, JSON.stringify(iData, null, 2))
      }
    } else {
      makeAsync(async () => {
        await fs.mkdirSync(path.dirname(savePath))
        await makeAwait((next) => {
          fs.writeFile(savePath, JSON.stringify(data, null, 2), () => {
            next()
          })
        })
      })
    }

    this.savePath = savePath
    this.defaultData = data
  }

  async get() {
    if (fs.existsSync(this.savePath)) {
      await makeAwait((next) => {
        fs.readFile(this.savePath, (err, data) => {
          try {
            this.data = JSON.parse(data.toString())
          } catch (err) {
            this.data = this.defaultData
          }
          next()
        })
      })
    }

    return Promise.resolve(this.data)
  }

  async set(data) {
    this.data = data
    await makeAwait((next) => {
      fs.writeFile(this.savePath, JSON.stringify(this.data, null, 2), () => {
        next()
      })
    })
    return this.data
  }
}

export default LocalStorage