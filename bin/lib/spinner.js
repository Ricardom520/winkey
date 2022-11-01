"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipSpinner = exports.waitSpinner = exports.cmdSpinner = exports.warnSpinner = exports.updateSpinner = exports.addSpinner = exports.failSpinner = exports.succeedSpiner = exports.startSpinner = exports.infoSpinner = exports.spinner = void 0;
const ora = require("ora");
const chalk = require("chalk");
exports.spinner = ora();
const infoSpinner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '🚘',
        text: chalk.cyan(text)
    });
};
exports.infoSpinner = infoSpinner;
const startSpinner = (text) => {
    const msg = `${text}...\n`;
    exports.spinner.start(msg);
    exports.spinner.stopAndPersist({
        symbol: '✨',
        text: msg,
    });
};
exports.startSpinner = startSpinner;
const succeedSpiner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '🎉',
        text: `${text}\n`
    });
};
exports.succeedSpiner = succeedSpiner;
const failSpinner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '☠️',
        text: chalk.red(text)
    });
};
exports.failSpinner = failSpinner;
const addSpinner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '😏',
        text: chalk.greenBright(text)
    });
};
exports.addSpinner = addSpinner;
const updateSpinner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '😮',
        text: chalk.dim(text)
    });
};
exports.updateSpinner = updateSpinner;
const warnSpinner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '😡',
        text: chalk.yellow(text)
    });
};
exports.warnSpinner = warnSpinner;
const cmdSpinner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '👻',
        text: chalk.white(text)
    });
};
exports.cmdSpinner = cmdSpinner;
const waitSpinner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '🥱',
        text: text
    });
};
exports.waitSpinner = waitSpinner;
const tipSpinner = (text) => {
    exports.spinner.stopAndPersist({
        symbol: '🐌',
        text: text || '这是提示'
    });
};
exports.tipSpinner = tipSpinner;
