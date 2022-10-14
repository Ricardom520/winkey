import * as fs from 'fs'
import { IS_WINDOWS } from '../lib/consts'

const child_process = require('child_process')

export const runSpawn = (ctx, iEnv, iPath, showOutput?) => {
  const iSpawn = child_process.spawn
  const runner = (next, reject) => {
    if (typeof iEnv === 'string') {
      // (str, iPath, showOutput, newWindow)
      showOutput = iPath
      iPath = iEnv
      iEnv = null
    }
    let ops = []
    let hand = ''
    const cwd = iPath || process.cwd()

    if (IS_WINDOWS) {
      hand = 'cmd.exe'
      ops = ['/s', '/c', ctx]
    } else {
      hand = '/bin/sh'
      ops = ['-c', ctx]
    }

    if (iPath && !fs.existsSync(iPath)) {
      return reject(`runSpawn 当前目录不存在: ${iPath}`)
    }

    const child = iSpawn(hand, ops, {
      cwd: cwd,
      silent: showOutput ? true : false,
      stdio: 'pipe',
      env: iEnv,
    })

    if (typeof showOutput === 'function') {
      child.stdout.on('data', (d) => {
        showOutput(d)
      })
    }
    // error handle
    let errMsg = ''
    child.stderr.on('data', (d) => {
      errMsg = `${errMsg}${d.toString()}`
    })
    child.on('exit', (code) => {
      if (code) {
        if (errMsg) {
          reject(errMsg)
        } else {
          reject(new Error(`get exit code ${code}`))
        }
      } else {
        next()
      }
    })
  }

  return new Promise(runner)
}