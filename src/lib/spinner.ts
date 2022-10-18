import * as ora from 'ora'
import * as chalk from 'chalk'

export const spinner = ora()

export const infoSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '🚘',
    text: text
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

export const processSpinner = (text?: string) => {
  
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
    text: chalk.cyan(text)
  })
}

export const updateSpinner = (text?: string) => {
  spinner.stopAndPersist({
    symbol: '😮',
    text: chalk.dim(text)
  })
}