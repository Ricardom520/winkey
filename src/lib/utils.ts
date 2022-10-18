import * as path from 'path'
import * as fs from 'fs'
import { failSpinner } from './spinner'

const typeFunction = (obj) => {
  let type;
  const toString = Object.prototype.toString;
  if (obj === null) {
    type = String(obj);
  } else {
    type = toString.call(obj).toLowerCase();
    type = type.substring(8, type.length - 1);
  }
  return type;
}

const isIgnoreFunction = (iPath, filter) => {
  let ignore = false;
  if (filter) {
    if (typeFunction(filter) === 'function') {
      ignore = !filter(iPath);
    } else if (typeFunction(filter) === 'regexp') {
      ignore = iPath.match(filter);
    }
  }
  return ignore;
}

export const markTry = (fn) => {
  try {
    fn()
  } catch(err) {
    failSpinner(err)
  }
}

export const makeAsync = (fn, isMocha?) => {
  return function (next) {
    if (isMocha) {
      this.timeout(0);
    }
    fn().then((...argu) => {
      if (typeof next === 'function') {
        next(...argu);
      }
    }).catch((er) => {
      throw er;
    });
  };
}

export const makeAwait = (fn) => {
  return new Promise(fn);
}

export const mkdirSync = (toFile) => {
  const tPath = toFile.replace(/[/\\]$/, '');
  const r = [];
  (function deep(iPath) {
    if (fs.existsSync(iPath) || /[/\\]$/.test(iPath)) {
      return;
    } else {
      deep(path.dirname(iPath));
      fs.mkdirSync(iPath);
      r.push(iPath);
    }
  })(tPath);
  return Promise.resolve(r);
}

export const readFilePaths = (fromPath, filter?, reverse?) => {
  let targetPaths;
  if (typeFunction(fromPath) === 'array') {
    targetPaths = fromPath;
  } else {
    targetPaths = [fromPath];
  }

  const readPath = (iPath) => {
    let r = [];

    if (!fs.existsSync(iPath)) {
      return Promise.resolve(r);
    }


    const runner = (next, reject) => {
      const stat = fs.statSync(iPath);
      if (stat.isDirectory()) {
        const rPaths = fs.readdirSync(iPath).map((name) => path.join(iPath, name));


        let padding = rPaths.length;
        const paddingCheck = () => {
          if (!padding) {
            next(r);
          }
        };

        rPaths.forEach((iiPath) => {
          readPath(iiPath).then((data) => {
            r = r.concat(data);
            padding--;
            paddingCheck();
          }).catch((er) => {
            reject(er);
          });
        });
        paddingCheck();
      } else {
        let isIgnore = isIgnoreFunction(iPath, filter);
        if (reverse) {
          isIgnore = !isIgnore;
        }
        if (!isIgnore) {
          r.push(iPath);
        }
        return next(r);
      }
    };

    return new Promise(runner);
  };

  const runner = (next, reject) => {
    let r = [];
    let padding = targetPaths.length;
    const paddingCheck = () => {
      if (!padding) {
        next(r);
      }
    };

    targetPaths.forEach((iPath) => {
      readPath(iPath).then((data) => {
        r = r.concat(data);
        padding--;
        paddingCheck();
      }).catch((er) => {
        reject(er);
      });
    });

    paddingCheck();
  };

  return new Promise(runner);
}

export const copyFiles = (fromPath, toPath?, filter?) => {
  let copyMap = {};
  let iFilter;
  if (typeof fromPath === 'object') {
    copyMap = Object.assign(copyMap, fromPath);
    iFilter = toPath;
  } else {
    if (typeFunction(toPath) === 'array') {
      copyMap[fromPath] = toPath;
    } else {
      copyMap[fromPath] = [toPath];
    }
    iFilter = filter;
  }

  // 数据格式化 转成 {from: [toFile]} 格式
  Object.keys(copyMap).forEach((key) => {
    if (!fs.existsSync(key)) {
      delete copyMap[key];
      return;
    }
    if (typeFunction(copyMap[key]) !== 'array') {
      copyMap[key] = [copyMap[key]];
    }
  });


  const copyFile = (fromFile, toFile) => {
    const r = {
      add: [],
      update: []
    };

    if (isIgnoreFunction(fromFile, iFilter)) {
      return Promise.resolve(r);
    }


    // build dir and log
    if (fs.existsSync(toFile)) {
      r.update.push(toFile);
    } else {
      mkdirSync(path.dirname(toFile));
      r.add.push(toFile);
    }

    const runner = (next, reject) => {
      const rStream = fs.createReadStream(fromFile);
      const wStream = fs.createWriteStream(toFile);
      rStream.pipe(wStream);
      wStream.on('finish', () => {
        next(r);
      });
      wStream.on('error', (er) => {
        reject(er);
      });
    };
    return new Promise(runner);
  };

  const copyPath = (fromPath, toPath) => {
    const r = {
      add: [],
      update: []
    };
    if (isIgnoreFunction(fromPath, iFilter)) {
      return Promise.resolve(r);
    }

    if (!fs.existsSync(toPath)) {
      mkdirSync(toPath);
    }

    const runner = (next, reject) => {
      const dirMap = {};
      const dirs = fs.readdirSync(fromPath).map((name) => {
        const iPath = path.join(fromPath, name);
        dirMap[iPath] = path.join(toPath, name);
        return iPath;
      });

      let padding = dirs.length;
      const paddingCheck = () => {
        if (!padding) {
          next(r);
        }
      };

      dirs.forEach((iPath) => {
        const stat = fs.statSync(iPath);
        let handle = null;
        if (stat.isDirectory()) {
          handle = copyPath;
        } else {
          handle = copyFile;
        }
        handle(iPath, dirMap[iPath]).then((data) => {
          r.update = r.update.concat(data.update);
          r.add = r.add.concat(data.add);
          padding--;
          paddingCheck();
        }).catch((er) => {
          reject(er);
        });
      });

      paddingCheck();
    };

    return new Promise(runner);
  };

  const runner = (next, reject) => {
    let r = {
      add: [],
      update: []
    };
    let padding = Object.keys(copyMap).length;
    const paddingCheck = function() {
      if (!padding) {
        next(r);
      }
    };


    Object.keys(copyMap).forEach((key) => {
      const fromStat = fs.statSync(key);
      let handle = null;
      if (fromStat.isDirectory()) { // 文件夹
        handle = copyPath;
      } else { //文件
        handle = copyFile;
      }

      const arr = [];
      copyMap[key].forEach((toFile) => {
        arr.push(handle(key, toFile));
      });
      Promise.all(arr).then((values) => {
        values.map((data) => {
          r.add = r.add.concat(data.add);
          r.update = r.update.concat(data.update);
        });
        padding--;
        paddingCheck();
      }).catch((er) => {
        reject(er);
      });
    });

    paddingCheck();
  };

  return new Promise(runner);
}