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
exports.installAction = void 0;
var path = require("path");
var fs = require("fs");
var winkey_os_1 = require("winkey-os");
var utils_1 = require("../lib/utils");
var consts_1 = require("../lib/consts");
var logger_1 = require("../lib/logger");
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
var installAction = function (names, cmder) { return __awaiter(void 0, void 0, void 0, function () {
    var targetPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logProcess.start(lang_1["default"].INSTALL.START);
                targetPath = CONFIG_PLUGIN_PATH;
                if (cmder && cmder.args && cmder.args[0]) {
                    targetPath = path.resolve(targetPath, cmder.args[0]);
                }
                if (!!fs.existsSync(targetPath)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, utils_1.mkdirSync)(targetPath)["catch"](function (er) {
                        throw er;
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, reset()["catch"](function (er) {
                        throw er;
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, (0, winkey_os_1.runSpawn)({
                    cmd: "npm install ".concat(names.join(' '), "@0.0.40-alpha.0 --save"),
                    targetPath: targetPath,
                    logger: logger_1.logger
                })["catch"](function (er) {
                    throw er;
                    return;
                })];
            case 4:
                _a.sent();
                return [4 /*yield*/, localConfig.updateSeedInfo()["catch"](function (er) {
                        throw er;
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.installAction = installAction;
