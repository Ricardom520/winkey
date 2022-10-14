import * as ora from 'ora'
import * as readline from 'readline'
import { startSpinner, succeedSpiner, failSpinner } from './spinner'

enum FinishStatus {
  Fail = 1,
  Success = 0
}

class LogProcess {
  private spinner = null
  private timer = null
  private speedTime = 0

  start(txt?: string) {
    startSpinner(txt || '开始咯~')
  }

  wait(txt?: string) {
    this.spinner = ora({
      prefixText: txt || '正在执行',
      spinner: 'monkey'
    }).start()

    this.timer = setInterval(() => {
      this.speedTime += 100
      this.spinner.text = `${this.speedTime / 1000}s`
    }, 100)
  }

  finsh(txt?: string, status?: FinishStatus) {
    clearInterval(this.timer)
    this.spinner.stop()
    if (status) {
      failSpinner(txt || 'sorry~失败')
    } else {
      succeedSpiner(`consume:${this.speedTime / 1000}s ${txt}` || '结束咯~')
    }
  }
}

export default LogProcess