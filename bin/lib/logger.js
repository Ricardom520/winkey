"use strict";
exports.__esModule = true;
exports.logger = exports.tip = exports.wait = exports.cmd = exports.update = exports.success = exports.add = exports.error = exports.info = exports.warn = exports.LogType = void 0;
var _1 = require(".");
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
var warn = function (text) {
    (0, _1.warnSpinner)(text);
};
exports.warn = warn;
var info = function (text) {
    (0, _1.infoSpinner)(text);
};
exports.info = info;
var error = function (text) {
    (0, _1.failSpinner)(text);
};
exports.error = error;
var add = function (text) {
    (0, _1.addSpinner)(text);
};
exports.add = add;
var success = function (text) {
    (0, _1.succeedSpiner)(text);
};
exports.success = success;
var update = function (text) {
    (0, _1.updateSpinner)(text);
};
exports.update = update;
var cmd = function (text) {
    (0, _1.cmdSpinner)(text);
};
exports.cmd = cmd;
var wait = function (text) {
    (0, _1.waitSpinner)(text);
};
exports.wait = wait;
var tip = function (text) {
    (0, _1.tipSpinner)(text);
};
exports.tip = tip;
var logger = function (type, text) {
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
