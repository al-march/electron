const { ipcRenderer } = require('electron')

const form = document.querySelector('#add-todo-form')
const input = document.querySelector('#add-todo-form')


form.addEventListener('submit', (e) => {
  e.preventDefault()

  ipcRenderer.send('add-todo', input.value)

  input.value = ''
})