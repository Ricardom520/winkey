"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devAction = void 0;
const path = require("path");
const fs = require("fs");
const winkey_os_1 = require("winkey-os");
const consts_1 = require("../lib/consts");
const lib_1 = require("../lib");
const devAction = async (_, cmder) => {
    let targetPath = consts_1.cwd;
    if (cmder.args && cmder.args[0]) {
        targetPath = path.resolve(targetPath, cmder.args[0]);
    }
    if (!fs.existsSync(targetPath)) {
        (0, lib_1.logger)(lib_1.LogType.Error, '所选目录不存在');
        return;
    }
    const pkg = require(path.resolve(targetPath, 'package.json'));
    if (pkg.winkeyWorkFlow === 'vite') {
        (0, winkey_os_1.runSpawn)({
            cmd: 'vite --config ./winkey.config.ts',
            targetPath: targetPath,
            type: 'inherit'
        });
    }
};
exports.devAction = devAction;
