"use strict";
exports.__esModule = true;
exports.tipSpinner = exports.waitSpinner = exports.cmdSpinner = exports.warnSpinner = exports.updateSpinner = exports.addSpinner = exports.failSpinner = exports.succeedSpiner = exports.startSpinner = exports.infoSpinner = exports.spinner = void 0;
var ora = require("ora");
var chalk = require("chalk");
exports.spinner = ora();
var infoSpinner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '🚘',
        text: chalk.cyan(text)
    });
};
exports.infoSpinner = infoSpinner;
var startSpinner = function (text) {
    var msg = "".concat(text, "...\n");
    exports.spinner.start(msg);
    exports.spinner.stopAndPersist({
        symbol: '✨',
        text: msg
    });
};
exports.startSpinner = startSpinner;
var succeedSpiner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '🎉',
        text: "".concat(text, "\n")
    });
};
exports.succeedSpiner = succeedSpiner;
var failSpinner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '☠️',
        text: chalk.red(text)
    });
};
exports.failSpinner = failSpinner;
var addSpinner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '😏',
        text: chalk.greenBright(text)
    });
};
exports.addSpinner = addSpinner;
var updateSpinner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '😮',
        text: chalk.dim(text)
    });
};
exports.updateSpinner = updateSpinner;
var warnSpinner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '😡',
        text: chalk.yellow(text)
    });
};
exports.warnSpinner = warnSpinner;
var cmdSpinner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '👻',
        text: chalk.white(text)
    });
};
exports.cmdSpinner = cmdSpinner;
var waitSpinner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '🥱',
        text: text
    });
};
exports.waitSpinner = waitSpinner;
var tipSpinner = function (text) {
    exports.spinner.stopAndPersist({
        symbol: '🐌',
        text: text || '这是提示'
    });
};
exports.tipSpinner = tipSpinner;
