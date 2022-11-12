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
exports.updateAction = void 0;
var chalk = require("chalk");
var path = require("path");
var fs = require("fs");
var inquirer = require("inquirer");
var formatter_1 = require("../lib/formatter");
var search_1 = require("../lib/search");
var consts_1 = require("../lib/consts");
var logger_1 = require("../lib/logger");
var install_1 = require("./install");
var localConfig_1 = require("../lib/localConfig");
var process_1 = require("../lib/process");
var lang_1 = require("../lang");
var USERPROFILE = process.env[consts_1.IS_WINDOWS ? 'USERPROFILE' : 'HOME'];
var CONFIG_PATH = path.join(USERPROFILE, '.init-project');
var CONFIG_PLUGIN_PATH = path.join(CONFIG_PATH, 'plugins');
var logProcess = new process_1["default"]();
var localConfig = new localConfig_1["default"]();
var reset = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, localConfig.reset()["catch"](function (err) {
                    throw err;
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var updateAction = function (_, cmder) { return __awaiter(void 0, void 0, void 0, function () {
    var targetPath, seedsMap, config, installedSeeds, seedItems, seeds, iSeed, choices, r, seedInfo, seedName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logProcess.start(lang_1["default"].UPDATE.START);
                logProcess.wait(lang_1["default"].UPDATE.LIST_START);
                targetPath = process.cwd();
                if (cmder.args && cmder.args[0]) {
                    targetPath = path.resolve(cmder.args[0]);
                }
                if (!fs.existsSync(targetPath)) {
                    (0, logger_1.logger)(logger_1.LogType.Error, '所选目录不存在');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, search_1.listSeed)({
                        map: true
                    })];
            case 1:
                seedsMap = _a.sent();
                logProcess.finsh(lang_1["default"].INIT.LIST_FINISHED);
                return [4 /*yield*/, localConfig.get()];
            case 2:
                config = (_a.sent()) || {};
                installedSeeds = config.seeds || [];
                seedItems = installedSeeds.map(function (seed) {
                    var seedItem = config.seedMap[seed];
                    var dev = seedItem.dev;
                    var name = seed;
                    var shortName = (0, formatter_1.seedFull2Short)(name);
                    return {
                        name: name,
                        shortName: shortName,
                        installed: true,
                        dev: dev,
                        choice: "".concat(chalk.yellow.bold(shortName), " ").concat(chalk.gray('(')).concat(dev ? 'local' : seedsMap[seed].version).concat(chalk.gray(')'))
                    };
                });
                seeds = Object.keys(seedsMap).map(function (name) { return name; });
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
                            message: "".concat(lang_1["default"].UPDATE.QUEATION_SELECT_TYPE, ":"),
                            "default": choices[0],
                            choices: choices
                        }
                    ])];
            case 3:
                r = _a.sent();
                iSeed = seedItems.filter(function (item) { return item.choice === r.seed; })[0].name;
                seedInfo = seedItems.filter(function (item) { return item.name === iSeed; })[0];
                seedName = seedInfo.name;
                if (seedInfo.installed) {
                    seedName = seedName + "@".concat(seedsMap[seedName].version);
                }
                logProcess.start(lang_1["default"].UPDATE.SEED_INSTALLSTART);
                logProcess.wait(lang_1["default"].UPDATE.SEED_INSTALLING);
                return [4 /*yield*/, (0, install_1.installAction)([seedName])["catch"](function (er) {
                        logProcess.finsh(er, 1);
                    })];
            case 4:
                _a.sent();
                logProcess.finsh(lang_1["default"].UPDATE.SEED_INSTALLED);
                return [2 /*return*/];
        }
    });
}); };
exports.updateAction = updateAction;
