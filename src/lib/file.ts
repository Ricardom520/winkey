import { fs } from './index'

/** 指定路径下所有文件名 */
export const readFolder = (target: string) => {
  return fs.readdirSync(target)
}