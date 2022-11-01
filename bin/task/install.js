"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installAction = void 0;
const path = require("path");
const fs = require("fs");
const winkey_os_1 = require("winkey-os");
const utils_1 = require("../lib/utils");
const consts_1 = require("../lib/consts");
const logger_1 = require("../lib/logger");
const localConfig_1 = require("../lib/localConfig");
const process_1 = require("../lib/process");
const lang_1 = require("../lang");
const USERPROFILE = process.env[consts_1.IS_WINDOWS ? 'USERPROFILE' : 'HOME'];
const CONFIG_PATH = path.join(USERPROFILE, '.init-project');
const CONFIG_PLUGIN_PATH = path.join(CONFIG_PATH, 'plugins');
const logProcess = new process_1.default();
const localConfig = new localConfig_1.default();
const reset = async () => {
    await localConfig.reset().catch((err) => {
        throw err;
    });
};
const installAction = async (names, cmder) => {
    logProcess.start(lang_1.default.INSTALL.START);
    let targetPath = CONFIG_PLUGIN_PATH;
    if (cmder.args && cmder.args[0]) {
        targetPath = path.resolve(targetPath, cmder.args[0]);
    }
    if (!fs.existsSync(targetPath)) {
        await (0, utils_1.mkdirSync)(targetPath).catch((er) => {
            throw er;
        });
        await reset().catch((er) => {
            throw er;
        });
    }
    await (0, winkey_os_1.runSpawn)({
        cmd: `npm install ${names.join(' ')}@0.0.34-alpha.0 --save`,
        targetPath: targetPath,
        logger: logger_1.logger
    }).catch((er) => {
        throw er;
        return;
    });
    await localConfig.updateSeedInfo().catch((er) => {
        throw er;
    });
};
exports.installAction = installAction;
