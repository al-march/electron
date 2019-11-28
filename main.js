const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
let win

function createWindow() {
  // Создаём окно браузера.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Отображаем средства разработчика.
  win.webContents.openDevTools()

  // Будет вызвано, когда окно будет закрыто.
  win.on('closed', () => {
    // Разбирает объект окна, обычно вы можете хранить окна     
    // в массиве, если ваше приложение поддерживает несколько окон в это время,
    // тогда вы должны удалить соответствующий элемент.
    win = null
  })
}

// Этот метод будет вызываться, когда Electron закончит 
// инициализацию и готов к созданию окон браузера.
// Некоторые API могут использоваться только после возникновения этого события.
app.on('ready', createWindow)

// Выходим, когда все окна будут закрыты.
app.on('window-all-closed', () => {
  // Для приложений и строки меню в macOS является обычным делом оставаться
  // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // На MacOS обычно пересоздают окно в приложении,
  // после того, как на иконку в доке нажали и других открытых окон нету.
  if (win === null) {
    createWindow()
  }
})

// В этом файле вы можете включить код другого основного процесса 
// вашего приложения. Можно также поместить их в отдельные файлы и применить к ним require.


const request = require('request-promise');
const Exporter = require('./textExport/exporter')
const exporter = new Exporter();

ipcMain.on('consol-fs', (event, input) => {
  let html;
  const options = {
    method: 'GET',
    uri: input
  }
  request(options)
    .then(function (response) {

      html = exporter.init(response);
      win.send('render-info', html)
      // Запрос был успешным, используйте объект ответа как хотите
    })
    .catch(function (err) {
      // Произошло что-то плохое, обработка ошибки
    })
})


// стянуть картинки
const ImgExporter = require('./imgExporter/exporter')
const imgExp = new ImgExporter();

ipcMain.on('url_for_img', (event, url) => {

  let src;
  const options = {
    method: 'GET',
    uri: url
  }
  request(options)
    .then(function (response) {
      src = imgExp.init(response);
      console.log(src);
      
      win.send('img_info', src)
      // Запрос был успешным, используйте объект ответа как хотите
    })
    .catch(function (err) {
      console.log(err);
      
      // Произошло что-то плохое, обработка ошибки
    })
})
