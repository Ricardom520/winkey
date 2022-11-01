"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.tip = exports.wait = exports.cmd = exports.update = exports.success = exports.add = exports.error = exports.info = exports.warn = exports.LogType = void 0;
const _1 = require(".");
var LogType;
(function (LogType) {
    LogType["Warn"] = "warn";
    LogType["Info"] = "info";
    LogType["Error"] = "error";
    LogType["Add"] = "add";
    LogType["Update"] = "update";
    LogType["Cmd"] = "cmd";
    LogType["Success"] = "success";
    LogType["Wait"] = "wait";
    LogType["Tip"] = "tip";
})(LogType = exports.LogType || (exports.LogType = {}));
const warn = (text) => {
    (0, _1.warnSpinner)(text);
};
exports.warn = warn;
const info = (text) => {
    (0, _1.infoSpinner)(text);
};
exports.info = info;
const error = (text) => {
    (0, _1.failSpinner)(text);
};
exports.error = error;
const add = (text) => {
    (0, _1.addSpinner)(text);
};
exports.add = add;
const success = (text) => {
    (0, _1.succeedSpiner)(text);
};
exports.success = success;
const update = (text) => {
    (0, _1.updateSpinner)(text);
};
exports.update = update;
const cmd = (text) => {
    (0, _1.cmdSpinner)(text);
};
exports.cmd = cmd;
const wait = (text) => {
    (0, _1.waitSpinner)(text);
};
exports.wait = wait;
const tip = (text) => {
    (0, _1.tipSpinner)(text);
};
exports.tip = tip;
const logger = (type, text) => {
    switch (type) {
        case LogType.Add:
            (0, exports.add)(text);
            break;
        case LogType.Cmd:
            (0, exports.cmd)(text);
            break;
        case LogType.Error:
            (0, exports.error)(text);
            break;
        case LogType.Info:
            (0, exports.info)(text);
            break;
        case LogType.Success:
            (0, exports.success)(text);
            break;
        case LogType.Update:
            (0, exports.update)(text);
            break;
        case LogType.Warn:
            (0, exports.warn)(text);
            break;
        case LogType.Wait:
            (0, exports.wait)(text);
            break;
        case LogType.Tip:
            (0, exports.tip)(text);
            break;
        default:
            (0, exports.info)(text);
            break;
    }
};
exports.logger = logger;
