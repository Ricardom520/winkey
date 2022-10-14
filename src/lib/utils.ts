import * as path from 'path'
import * as fs from 'fs'

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