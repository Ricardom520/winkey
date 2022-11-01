"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAction = void 0;
const chalk = require("chalk");
const path = require("path");
const inquirer = require("inquirer");
const search_1 = require("../lib/search");
const formatter_1 = require("../lib/formatter");
const process_1 = require("../lib/process");
const localConfig_1 = require("../lib/localConfig");
const lang_1 = require("../lang");
const install_1 = require("./install");
const utils_1 = require("../lib/utils");
const lib_1 = require("../lib");
const logger_1 = require("../lib/logger");
const logProcess = new process_1.default();
const localConfig = new localConfig_1.default();
const initAction = async (_, cmder) => {
    var _a;
    logProcess.start(lang_1.default.INIT.START);
    logProcess.wait(lang_1.default.INIT.LIST_START);
    let targetPath = process.cwd();
    if (cmder.args[0]) {
        targetPath = path.resolve(cmder.args[0]);
    }
    const seeds = await (0, search_1.listSeed)();
    logProcess.finsh(lang_1.default.INIT.LIST_FINISHED);
    let config = (await localConfig.get()) || {};
    const installedSeeds = config.seeds || [];
    let seedItems = installedSeeds.map((seed) => {
        const seedItem = config.seedMap[seed];
        const { version, dev } = seedItem;
        const name = seed;
        const shortName = (0, formatter_1.seedFull2Short)(name);
        return {
            name,
            shortName,
            installed: true,
            dev,
            choice: `${chalk.yellow.bold(shortName)} ${chalk.gray('(')}${dev ? 'local' : version}${chalk.gray(')')}`
        };
    });
    seedItems = seedItems.concat(seeds
        .filter((name) => installedSeeds.indexOf(name) === -1)
        .map((name) => {
        const shortName = (0, formatter_1.seedFull2Short)(name);
        return {
            name,
            shortName,
            installed: false,
            dev: false,
            choice: chalk.gray(shortName)
        };
    }));
    seedItems.sort((a, b) => {
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
    let iSeed = '';
    const choices = seedItems.map((item) => item.choice);
    const r = await inquirer.prompt([
        {
            type: 'list',
            name: 'seed',
            message: `${lang_1.default.INIT.QUEATION_SELECT_TYPE}:`,
            default: choices[0],
            choices: choices
        }
    ]);
    iSeed = seedItems.filter((item) => item.choice === r.seed)[0].name;
    const seedInfo = seedItems.filter((item) => item.name === iSeed)[0];
    // 判断选中的 seed 是否已经安装
    if (!seedInfo.installed) {
        logProcess.start(lang_1.default.INIT.SEED_INSTALLED);
        logProcess.wait(lang_1.default.INIT.SEED_INSTALLING);
        await (0, install_1.installAction)([seedInfo.name]).catch((er) => {
            logProcess.finsh(er, 1);
        });
        logProcess.finsh(lang_1.default.INIT.SEED_INSTALLED);
        config = await localConfig.get();
    }
    const iSeedPack = require(config.seedMap[seedInfo.name].main);
    // 启动前 hooks
    if ((_a = iSeedPack === null || iSeedPack === void 0 ? void 0 : iSeedPack.hooks) === null || _a === void 0 ? void 0 : _a.beforeStart) {
        (0, lib_1.infoSpinner)(lang_1.default.INIT.HOOKS_BEFORE_START_RUN);
        await iSeedPack.hooks.beforeStart({
            targetPath: targetPath
        }).catch((err) => {
            (0, lib_1.failSpinner)(err);
        });
        (0, lib_1.infoSpinner)(lang_1.default.INIT.HOOKS_BEFORE_START_FINISHED);
    }
    // 准备需要复制的文件
    if (!iSeedPack.path) {
        (0, lib_1.failSpinner)(lang_1.default.INIT.SEED_COPY_PATH_UNDEFINED);
        return;
    }
    let fileMap = {};
    const iSeedConfig = config.seedMap[iSeed];
    const seedSourcePath = path.resolve(path.dirname(iSeedConfig.main), iSeedPack.path);
    (0, lib_1.infoSpinner)(lang_1.default.INIT.SEED_COPY_MAP_PRINT);
    if (!lib_1.fs.existsSync(seedSourcePath)) {
        (0, lib_1.failSpinner)(lang_1.default.INIT.SEED_COPY_PATH_NOT_EXISTS);
        return;
    }
    let files = [];
    try {
        files = await (0, utils_1.readFilePaths)(seedSourcePath);
    }
    catch (err) {
        throw err;
    }
    files.forEach((iPath) => {
        fileMap[iPath] = [
            path.resolve(targetPath, path.relative(seedSourcePath, iPath))
        ];
    });
    // 复制前 hooks
    if (iSeedPack.hooks && iSeedPack.hooks.beforeCopy) {
        (0, lib_1.infoSpinner)(lang_1.default.INIT.HOOKS_BEFORE_COPY_RUN);
        let rMap;
        try {
            rMap = await iSeedPack.hooks.beforeCopy({
                fileMap,
                targetPath,
            });
        }
        catch (er) {
            throw er;
        }
        if (typeof rMap === 'object') {
            fileMap = rMap;
        }
        (0, lib_1.infoSpinner)(lang_1.default.INIT.HOOKS_BEFORE_START_FINISHED);
    }
    (0, lib_1.infoSpinner)(lang_1.default.INIT.SEED_COPY_MAP_PRINT);
    Object.keys(fileMap).forEach((iPath) => {
        (0, lib_1.infoSpinner)(`${chalk.yellow(iPath)} => ${chalk.green(fileMap[iPath].join(','))}`);
    });
    // 复制
    let iLog;
    try {
        iLog = await (0, utils_1.copyFiles)(fileMap);
    }
    catch (err) {
        throw err;
    }
    iLog.add.forEach((iPath) => {
        (0, lib_1.addSpinner)(iPath);
    });
    iLog.update.forEach((iPath) => {
        (0, lib_1.updateSpinner)(iPath);
    });
    // 复制后hook
    if (iSeedPack.hooks && iSeedPack.hooks.afterCopy) {
        (0, lib_1.infoSpinner)(lang_1.default.INIT.HOOKS_AFTER_COPY_RUN);
        await iSeedPack.hooks.afterCopy({
            fileMap,
            targetPath,
            logger: logger_1.logger
        });
        (0, lib_1.infoSpinner)(lang_1.default.INIT.HOOKS_AFTER_COPY_FINISHED);
    }
};
exports.initAction = initAction;
