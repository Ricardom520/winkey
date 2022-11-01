import * as chalk from 'chalk'
import { 
  addSpinner, 
  failSpinner, 
  infoSpinner, 
  succeedSpiner, 
  updateSpinner, 
  warnSpinner, 
  cmdSpinner,
  waitSpinner,
  tipSpinner
} from '.'

export enum LogType {
  Warn = 'warn',
  Info = 'info',
  Error = 'error',
  Add = 'add',
  Update = 'update',
  Cmd = 'cmd',
  Success = 'success',
  Wait = 'wait',
  Tip = 'tip'
}

export const warn = (text: string) => {
  warnSpinner(text)
}

export const info = (text: string) => {
  infoSpinner(text)
}

export const error = (text: string) => {
  failSpinner(text)
}

export const add = (text: string) => {
  addSpinner(text)
}

export const success = (text: string) => {
  succeedSpiner(text)
}

export const update = (text: string) => {
  updateSpinner(text)
}

export const cmd = (text: string) => {
  cmdSpinner(text)
}

export const wait = (text: string) => {
  waitSpinner(text)
}

export const tip = (text: string) => {
  tipSpinner(text)
}

export const logger = (type: LogType, text: string) => {
  switch(type) {
    case LogType.Add:
      add(text)
      break
    case LogType.Cmd:
      cmd(text)
      break
    case LogType.Error:
      error(text)
      break
    case LogType.Info:
      info(text)
      break
    case LogType.Success:
      success(text)
      break
    case LogType.Update:
      update(text)
      break
    case LogType.Warn:
      warn(text)
      break
    case LogType.Wait:
      wait(text)
      break
    case LogType.Tip:
      tip(text)
      break
    default:
      info(text)
      break
  }
}