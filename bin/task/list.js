"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAction = void 0;
const lib_1 = require("../lib");
const search_1 = require("../lib/search");
const process_1 = require("../lib/process");
const lang_1 = require("../lang");
const logProcess = new process_1.default();
const listAction = async (val) => {
    if (val.seeds) {
        logProcess.start(lang_1.default.SEEDS.START);
        logProcess.wait(lang_1.default.SEEDS.LOADING);
        const seeds = await (0, search_1.listSeed)();
        logProcess.finsh(lang_1.default.SEEDS.END);
        seeds.forEach((item) => {
            (0, lib_1.logger)(lib_1.LogType.Info, `seed包名称：${item}`);
        });
        return;
    }
    (0, lib_1.logger)(lib_1.LogType.Info, lang_1.default.WINKEY.DEFAULT);
    (0, lib_1.logger)(lib_1.LogType.Tip, lang_1.default.WINKEY.DEV);
    (0, lib_1.logger)(lib_1.LogType.Tip, lang_1.default.WINKEY.BUILD);
    (0, lib_1.logger)(lib_1.LogType.Tip, lang_1.default.WINKEY.LISTSEEDS);
};
exports.listAction = listAction;
