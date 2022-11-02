"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.initAction = void 0;
var chalk = require("chalk");
var path = require("path");
var inquirer = require("inquirer");
var search_1 = require("../lib/search");
var formatter_1 = require("../lib/formatter");
var process_1 = require("../lib/process");
var localConfig_1 = require("../lib/localConfig");
var lang_1 = require("../lang");
var install_1 = require("./install");
var utils_1 = require("../lib/utils");
var lib_1 = require("../lib");
var logger_1 = require("../lib/logger");
var logProcess = new process_1["default"]();
var localConfig = new localConfig_1["default"]();
var initAction = function (_, cmder) { return __awaiter(void 0, void 0, void 0, function () {
    var targetPath, seeds, config, installedSeeds, seedItems, iSeed, choices, r, seedInfo, iSeedPack, fileMap, iSeedConfig, seedSourcePath, files, err_1, rMap, er_1, iLog, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                logProcess.start(lang_1["default"].INIT.START);
                logProcess.wait(lang_1["default"].INIT.LIST_START);
                targetPath = process.cwd();
                if (cmder.args && cmder.args[0]) {
                    targetPath = path.resolve(cmder.args[0]);
                }
                return [4 /*yield*/, (0, search_1.listSeed)()];
            case 1:
                seeds = _b.sent();
                logProcess.finsh(lang_1["default"].INIT.LIST_FINISHED);
                return [4 /*yield*/, localConfig.get()];
            case 2:
                config = (_b.sent()) || {};
                installedSeeds = config.seeds || [];
                seedItems = installedSeeds.map(function (seed) {
                    var seedItem = config.seedMap[seed];
                    var version = seedItem.version, dev = seedItem.dev;
                    var name = seed;
                    var shortName = (0, formatter_1.seedFull2Short)(name);
                    return {
                        name: name,
                        shortName: shortName,
                        installed: true,
                        dev: dev,
                        choice: "".concat(chalk.yellow.bold(shortName), " ").concat(chalk.gray('(')).concat(dev ? 'local' : version).concat(chalk.gray(')'))
                    };
                });
                seedItems = seedItems.concat(seeds
                    .filter(function (name) { return installedSeeds.indexOf(name) === -1; })
                    .map(function (name) {
                    var shortName = (0, formatter_1.seedFull2Short)(name);
                    return {
                        name: name,
                        shortName: shortName,
                        installed: false,
                        dev: false,
                        choice: chalk.gray(shortName)
                    };
                }));
                seedItems.sort(function (a, b) {
                    if (a.installed && !b.installed) {
                        return -1;
                    }
                    else if (!a.installed && b.installed) {
                        return 1;
                    }
                    else if (a.installed && b.installed) {
                        if (a.dev && !b.dev) {
                            return -1;
                        }
                        else if (!a.dev && b.dev) {
                            return 1;
                        }
                        else {
                            return a.name.localeCompare(b.name);
                        }
                    }
                    else {
                        return a.name.localeCompare(b.name);
                    }
                });
                iSeed = '';
                choices = seedItems.map(function (item) { return item.choice; });
                return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'list',
                            name: 'seed',
                            message: "".concat(lang_1["default"].INIT.QUEATION_SELECT_TYPE, ":"),
                            "default": choices[0],
                            choices: choices
                        }
                    ])];
            case 3:
                r = _b.sent();
                iSeed = seedItems.filter(function (item) { return item.choice === r.seed; })[0].name;
                seedInfo = seedItems.filter(function (item) { return item.name === iSeed; })[0];
                if (!!seedInfo.installed) return [3 /*break*/, 6];
                logProcess.start(lang_1["default"].INIT.SEED_INSTALLED);
                logProcess.wait(lang_1["default"].INIT.SEED_INSTALLING);
                return [4 /*yield*/, (0, install_1.installAction)([seedInfo.name])["catch"](function (er) {
                        logProcess.finsh(er, 1);
                    })];
            case 4:
                _b.sent();
                logProcess.finsh(lang_1["default"].INIT.SEED_INSTALLED);
                return [4 /*yield*/, localConfig.get()];
            case 5:
                config = _b.sent();
                _b.label = 6;
            case 6:
                iSeedPack = require(config.seedMap[seedInfo.name].main);
                if (!((_a = iSeedPack === null || iSeedPack === void 0 ? void 0 : iSeedPack.hooks) === null || _a === void 0 ? void 0 : _a.beforeStart)) return [3 /*break*/, 8];
                (0, lib_1.infoSpinner)(lang_1["default"].INIT.HOOKS_BEFORE_START_RUN);
                return [4 /*yield*/, iSeedPack.hooks.beforeStart({
                        targetPath: targetPath
                    })["catch"](function (err) {
                        (0, lib_1.failSpinner)(err);
                    })];
            case 7:
                _b.sent();
                (0, lib_1.infoSpinner)(lang_1["default"].INIT.HOOKS_BEFORE_START_FINISHED);
                _b.label = 8;
            case 8:
                // 准备需要复制的文件
                if (!iSeedPack.path) {
                    (0, lib_1.failSpinner)(lang_1["default"].INIT.SEED_COPY_PATH_UNDEFINED);
                    return [2 /*return*/];
                }
                fileMap = {};
                iSeedConfig = config.seedMap[iSeed];
                seedSourcePath = path.resolve(path.dirname(iSeedConfig.main), iSeedPack.path);
                (0, lib_1.infoSpinner)(lang_1["default"].INIT.SEED_COPY_MAP_PRINT);
                if (!lib_1.fs.existsSync(seedSourcePath)) {
                    (0, lib_1.failSpinner)(lang_1["default"].INIT.SEED_COPY_PATH_NOT_EXISTS);
                    return [2 /*return*/];
                }
                files = [];
                _b.label = 9;
            case 9:
                _b.trys.push([9, 11, , 12]);
                return [4 /*yield*/, (0, utils_1.readFilePaths)(seedSourcePath)];
            case 10:
                files = _b.sent();
                return [3 /*break*/, 12];
            case 11:
                err_1 = _b.sent();
                throw err_1;
            case 12:
                files.forEach(function (iPath) {
                    fileMap[iPath] = [
                        path.resolve(targetPath, path.relative(seedSourcePath, iPath))
                    ];
                });
                if (!(iSeedPack.hooks && iSeedPack.hooks.beforeCopy)) return [3 /*break*/, 17];
                (0, lib_1.infoSpinner)(lang_1["default"].INIT.HOOKS_BEFORE_COPY_RUN);
                rMap = void 0;
                _b.label = 13;
            case 13:
                _b.trys.push([13, 15, , 16]);
                return [4 /*yield*/, iSeedPack.hooks.beforeCopy({
                        fileMap: fileMap,
                        targetPath: targetPath
                    })];
            case 14:
                rMap = _b.sent();
                return [3 /*break*/, 16];
            case 15:
                er_1 = _b.sent();
                throw er_1;
            case 16:
                if (typeof rMap === 'object') {
                    fileMap = rMap;
                }
                (0, lib_1.infoSpinner)(lang_1["default"].INIT.HOOKS_BEFORE_START_FINISHED);
                _b.label = 17;
            case 17:
                (0, lib_1.infoSpinner)(lang_1["default"].INIT.SEED_COPY_MAP_PRINT);
                Object.keys(fileMap).forEach(function (iPath) {
                    (0, lib_1.infoSpinner)("".concat(chalk.yellow(iPath), " => ").concat(chalk.green(fileMap[iPath].join(','))));
                });
                _b.label = 18;
            case 18:
                _b.trys.push([18, 20, , 21]);
                return [4 /*yield*/, (0, utils_1.copyFiles)(fileMap)];
            case 19:
                iLog = _b.sent();
                return [3 /*break*/, 21];
            case 20:
                err_2 = _b.sent();
                throw err_2;
            case 21:
                iLog.add.forEach(function (iPath) {
                    (0, lib_1.addSpinner)(iPath);
                });
                iLog.update.forEach(function (iPath) {
                    (0, lib_1.updateSpinner)(iPath);
                });
                if (!(iSeedPack.hooks && iSeedPack.hooks.afterCopy)) return [3 /*break*/, 23];
                (0, lib_1.infoSpinner)(lang_1["default"].INIT.HOOKS_AFTER_COPY_RUN);
                return [4 /*yield*/, iSeedPack.hooks.afterCopy({
                        fileMap: fileMap,
                        targetPath: targetPath,
                        logger: logger_1.logger
                    })];
            case 22:
                _b.sent();
                (0, lib_1.infoSpinner)(lang_1["default"].INIT.HOOKS_AFTER_COPY_FINISHED);
                _b.label = 23;
            case 23: return [2 /*return*/];
        }
    });
}); };
exports.initAction = initAction;
