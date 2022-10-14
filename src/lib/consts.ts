export const cwd = process.cwd()

export const platform = process.platform

export const getRootName = () => {
  let rootPath = cwd

  // linux 环境
  if (platform.indexOf('win') === -1) {
    rootPath.replace(/\//g, '\\')
  } 

  const arr = rootPath.split('\\')

  return arr[arr.length - 1]
}

export const IS_WINDOWS = process.platform === 'win32'