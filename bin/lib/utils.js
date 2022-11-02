"use strict";
exports.__esModule = true;
exports.copyFiles = exports.readFilePaths = exports.mkdirSync = exports.makeAwait = exports.makeAsync = exports.markTry = void 0;
var path = require("path");
var fs = require("fs");
var spinner_1 = require("./spinner");
var typeFunction = function (obj) {
    var type;
    var toString = Object.prototype.toString;
    if (obj === null) {
        type = String(obj);
    }
    else {
        type = toString.call(obj).toLowerCase();
        type = type.substring(8, type.length - 1);
    }
    return type;
};
var isIgnoreFunction = function (iPath, filter) {
    var ignore = false;
    if (filter) {
        if (typeFunction(filter) === 'function') {
            ignore = !filter(iPath);
        }
        else if (typeFunction(filter) === 'regexp') {
            ignore = iPath.match(filter);
        }
    }
    return ignore;
};
var markTry = function (fn) {
    try {
        fn();
    }
    catch (err) {
        (0, spinner_1.failSpinner)(err);
    }
};
exports.markTry = markTry;
var makeAsync = function (fn, isMocha) {
    return function (next) {
        if (isMocha) {
            this.timeout(0);
        }
        fn().then(function () {
            var argu = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argu[_i] = arguments[_i];
            }
            if (typeof next === 'function') {
                next.apply(void 0, argu);
            }
        })["catch"](function (er) {
            throw er;
        });
    };
};
exports.makeAsync = makeAsync;
var makeAwait = function (fn) {
    return new Promise(fn);
};
exports.makeAwait = makeAwait;
var mkdirSync = function (toFile) {
    var tPath = toFile.replace(/[/\\]$/, '');
    var r = [];
    (function deep(iPath) {
        if (fs.existsSync(iPath) || /[/\\]$/.test(iPath)) {
            return;
        }
        else {
            deep(path.dirname(iPath));
            fs.mkdirSync(iPath);
            r.push(iPath);
        }
    })(tPath);
    return Promise.resolve(r);
};
exports.mkdirSync = mkdirSync;
var readFilePaths = function (fromPath, filter, reverse) {
    var targetPaths;
    if (typeFunction(fromPath) === 'array') {
        targetPaths = fromPath;
    }
    else {
        targetPaths = [fromPath];
    }
    var readPath = function (iPath) {
        var r = [];
        if (!fs.existsSync(iPath)) {
            return Promise.resolve(r);
        }
        var runner = function (next, reject) {
            var stat = fs.statSync(iPath);
            if (stat.isDirectory()) {
                var rPaths = fs.readdirSync(iPath).map(function (name) { return path.join(iPath, name); });
                var padding_1 = rPaths.length;
                var paddingCheck_1 = function () {
                    if (!padding_1) {
                        next(r);
                    }
                };
                rPaths.forEach(function (iiPath) {
                    readPath(iiPath).then(function (data) {
                        r = r.concat(data);
                        padding_1--;
                        paddingCheck_1();
                    })["catch"](function (er) {
                        reject(er);
                    });
                });
                paddingCheck_1();
            }
            else {
                var isIgnore = isIgnoreFunction(iPath, filter);
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
    var runner = function (next, reject) {
        var r = [];
        var padding = targetPaths.length;
        var paddingCheck = function () {
            if (!padding) {
                next(r);
            }
        };
        targetPaths.forEach(function (iPath) {
            readPath(iPath).then(function (data) {
                r = r.concat(data);
                padding--;
                paddingCheck();
            })["catch"](function (er) {
                reject(er);
            });
        });
        paddingCheck();
    };
    return new Promise(runner);
};
exports.readFilePaths = readFilePaths;
var copyFiles = function (fromPath, toPath, filter) {
    var copyMap = {};
    var iFilter;
    if (typeof fromPath === 'object') {
        copyMap = Object.assign(copyMap, fromPath);
        iFilter = toPath;
    }
    else {
        if (typeFunction(toPath) === 'array') {
            copyMap[fromPath] = toPath;
        }
        else {
            copyMap[fromPath] = [toPath];
        }
        iFilter = filter;
    }
    // 数据格式化 转成 {from: [toFile]} 格式
    Object.keys(copyMap).forEach(function (key) {
        if (!fs.existsSync(key)) {
            delete copyMap[key];
            return;
        }
        if (typeFunction(copyMap[key]) !== 'array') {
            copyMap[key] = [copyMap[key]];
        }
    });
    var copyFile = function (fromFile, toFile) {
        var r = {
            add: [],
            update: []
        };
        if (isIgnoreFunction(fromFile, iFilter)) {
            return Promise.resolve(r);
        }
        // build dir and log
        if (fs.existsSync(toFile)) {
            r.update.push(toFile);
        }
        else {
            (0, exports.mkdirSync)(path.dirname(toFile));
            r.add.push(toFile);
        }
        var runner = function (next, reject) {
            var rStream = fs.createReadStream(fromFile);
            var wStream = fs.createWriteStream(toFile);
            rStream.pipe(wStream);
            wStream.on('finish', function () {
                next(r);
            });
            wStream.on('error', function (er) {
                reject(er);
            });
        };
        return new Promise(runner);
    };
    var copyPath = function (fromPath, toPath) {
        var r = {
            add: [],
            update: []
        };
        if (isIgnoreFunction(fromPath, iFilter)) {
            return Promise.resolve(r);
        }
        if (!fs.existsSync(toPath)) {
            (0, exports.mkdirSync)(toPath);
        }
        var runner = function (next, reject) {
            var dirMap = {};
            var dirs = fs.readdirSync(fromPath).map(function (name) {
                var iPath = path.join(fromPath, name);
                dirMap[iPath] = path.join(toPath, name);
                return iPath;
            });
            var padding = dirs.length;
            var paddingCheck = function () {
                if (!padding) {
                    next(r);
                }
            };
            dirs.forEach(function (iPath) {
                var stat = fs.statSync(iPath);
                var handle = null;
                if (stat.isDirectory()) {
                    handle = copyPath;
                }
                else {
                    handle = copyFile;
                }
                handle(iPath, dirMap[iPath]).then(function (data) {
                    r.update = r.update.concat(data.update);
                    r.add = r.add.concat(data.add);
                    padding--;
                    paddingCheck();
                })["catch"](function (er) {
                    reject(er);
                });
            });
            paddingCheck();
        };
        return new Promise(runner);
    };
    var runner = function (next, reject) {
        var r = {
            add: [],
            update: []
        };
        var padding = Object.keys(copyMap).length;
        var paddingCheck = function () {
            if (!padding) {
                next(r);
            }
        };
        Object.keys(copyMap).forEach(function (key) {
            var fromStat = fs.statSync(key);
            var handle = null;
            if (fromStat.isDirectory()) { // 文件夹
                handle = copyPath;
            }
            else { //文件
                handle = copyFile;
            }
            var arr = [];
            copyMap[key].forEach(function (toFile) {
                arr.push(handle(key, toFile));
            });
            Promise.all(arr).then(function (values) {
                values.map(function (data) {
                    r.add = r.add.concat(data.add);
                    r.update = r.update.concat(data.update);
                });
                padding--;
                paddingCheck();
            })["catch"](function (er) {
                reject(er);
            });
        });
        paddingCheck();
    };
    return new Promise(runner);
};
exports.copyFiles = copyFiles;
