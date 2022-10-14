"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 教授架入口文件
 */
const command_1 = require("./command");
const path = require("path");
const pacote = require("pacote");
const lib_1 = require("./lib");
let pkgVersion = '';
let pkgName = '';
// 获取当前包的信息
const getPkgInfo = () => {
    const jsonPath = path.join(__dirname, '../package.json');
    const jsonContent = lib_1.fs.readFileSync(jsonPath, 'utf-8');
    const jsonResult = JSON.parse(jsonContent);
    pkgVersion = jsonResult.version;
    pkgName = jsonResult.name;
};
// 获取最新包最新版本
const getLatestVersion = async () => {
    const manifest = await pacote.manifest(`${pkgName}@latest`);
    return manifest.version;
};
getPkgInfo();
command_1.default.version(pkgVersion);
command_1.default.on('command:*', async ([cmd]) => {
    command_1.default.outputHelp();
    (0, lib_1.error)(`未知命令 command ${lib_1.chalk.yellow(cmd)}.`);
    const latestVersion = await getLatestVersion();
    if (latestVersion !== pkgVersion) {
        (0, lib_1.info)(`可更新版本，${lib_1.chalk.green(pkgVersion)} -> ${lib_1.chalk.green(latestVersion)} \n执行npm install -g ${pkgName}`);
    }
    process.exitCode = 1;
});
command_1.default.parseAsync(process.argv);
