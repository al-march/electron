const path = require('path')
const { app, ipcMain } = require('electron')

// модули
const Window = require('./modules/Window')
const DataStore = require('./modules/DataStore')

// создание нового todo-store
const todosData = new DataStore({ name: 'Todos Main'})

todosData.set('unicorn', '🦄');


function main () {
  // окно todo
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html'),
  })
  let addTodoWin

  // инициализация с todos
  mainWindow.once('show', () => {
    mainWindow.webContents.send('todos', todosData.todos)
  })
  // создание окна с созданием todo
  ipcMain.on('add-todo-window', () => {

    if (!addTodoWin) {
      addTodoWin = new Window({
        file: path.join('renderer', 'add.html'),
        width: 800,
        height: 400,
        // закрытие вместе с главным окном
        parent: mainWindow
      })
    }

    // очистка
    addTodoWin.on('closed', () => {
      addTodoWin = null
    })
  })
}

// создание туду и обновление
ipcMain.on('add-todo', (event, todo) => {
  const updatedTodos = todosData.addTodo(todo).todos // вызов метода добавления туду и вызов обновленной базы

  mainWindow.send('todos', updatedTodos)
})

// удаление туду
ipcMain.on('delete-todo', (event, todo) => {
  const updatedTodos = todosData.deleteTodo(todo).todos // вызов метода удаления туду и вызов обновленной базы

  mainWindow.send('todos', updatedTodos)
})

app.on('ready', main)

app.on('window-all-closed', function() {
  app.quit()
})

