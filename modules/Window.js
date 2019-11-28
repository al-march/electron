const {BrowserWindow} = require('electron')

// стандартные настройки окна
const defaultProps = {
  width: 1200,
  height: 600,
  show: false
}

class Window extends BrowserWindow {
  constructor ({file, ...windowSettings}) {
    // вызывает новое окно с данными параметрами
    super({ ...defaultProps, ...windowSettings})

    // загрузка html и открытие инструментов разработчика
    this.loadFile(file)
    this.webContents.openDevTools()

    // показывается, когда готово
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}


module.exports = Window