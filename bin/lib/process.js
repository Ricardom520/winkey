"use strict";
exports.__esModule = true;
var ora = require("ora");
var spinner_1 = require("./spinner");
var FinishStatus;
(function (FinishStatus) {
    FinishStatus[FinishStatus["Fail"] = 1] = "Fail";
    FinishStatus[FinishStatus["Success"] = 0] = "Success";
})(FinishStatus || (FinishStatus = {}));
var LogProcess = /** @class */ (function () {
    function LogProcess() {
        this.spinner = null;
        this.timer = null;
        this.speedTime = 0;
    }
    LogProcess.prototype.start = function (txt) {
        this.speedTime = 0;
        (0, spinner_1.startSpinner)(txt || '开始咯~');
    };
    LogProcess.prototype.wait = function (txt) {
        var _this = this;
        this.spinner = ora({
            prefixText: txt || '正在执行',
            spinner: 'monkey'
        }).start();
        this.timer = setInterval(function () {
            _this.speedTime += 100;
            _this.spinner.text = "".concat(_this.speedTime / 1000, "s");
        }, 100);
    };
    LogProcess.prototype.finsh = function (txt, status) {
        clearInterval(this.timer);
        this.spinner.stop();
        if (status) {
            (0, spinner_1.failSpinner)(txt || 'sorry~失败');
        }
        else {
            (0, spinner_1.succeedSpiner)("consume:".concat(this.speedTime / 1000, "s ").concat(txt) || '结束咯~');
        }
    };
    return LogProcess;
}());
exports["default"] = LogProcess;
