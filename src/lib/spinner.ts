import * as ora from 'ora'
import * as chalk from 'chalk'

export const spinner = ora()

export const infoSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '🚘',
    text: chalk.cyan(text)
  })
}

export const startSpinner = (text?: string) => {
  const msg = `${text}...\n`

  spinner.start(msg)
  spinner.stopAndPersist({
    symbol: '✨',
    text: msg,
  })
}

export const succeedSpiner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '🎉',
    text: `${text}\n`
  })
}

export const failSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '☠️',
    text: chalk.red(text)
  })
}

export const addSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '😏',
    text: chalk.greenBright(text)
  })
}

export const updateSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '😮',
    text: chalk.dim(text)
  })
}

export const warnSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '😡',
    text: chalk.yellow(text)
  })
}

export const cmdSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '👻',
    text: chalk.white(text)
  })
}

export const waitSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '🥱',
    text: text
  })
}

export const tipSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '🐌',
    text: text || '这是提示'
  })
}