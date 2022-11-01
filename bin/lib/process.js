"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ora = require("ora");
const spinner_1 = require("./spinner");
var FinishStatus;
(function (FinishStatus) {
    FinishStatus[FinishStatus["Fail"] = 1] = "Fail";
    FinishStatus[FinishStatus["Success"] = 0] = "Success";
})(FinishStatus || (FinishStatus = {}));
class LogProcess {
    constructor() {
        this.spinner = null;
        this.timer = null;
        this.speedTime = 0;
    }
    start(txt) {
        this.speedTime = 0;
        (0, spinner_1.startSpinner)(txt || '开始咯~');
    }
    wait(txt) {
        this.spinner = ora({
            prefixText: txt || '正在执行',
            spinner: 'monkey'
        }).start();
        this.timer = setInterval(() => {
            this.speedTime += 100;
            this.spinner.text = `${this.speedTime / 1000}s`;
        }, 100);
    }
    finsh(txt, status) {
        clearInterval(this.timer);
        this.spinner.stop();
        if (status) {
            (0, spinner_1.failSpinner)(txt || 'sorry~失败');
        }
        else {
            (0, spinner_1.succeedSpiner)(`consume:${this.speedTime / 1000}s ${txt}` || '结束咯~');
        }
    }
}
exports.default = LogProcess;
