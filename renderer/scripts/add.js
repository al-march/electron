const { ipcRenderer } = require('electron')

const form = document.querySelector('#add-todo-form')
const inputName = document.querySelector('#add-todo-input__name')
const inputDescr = document.querySelector('#add-todo-input__desc')


form.addEventListener('submit', (e) => {
  e.preventDefault()

  ipcRenderer.send('add-todo', inputName.value, inputDescr.value)
  
  inputName.value = ''
  inputDescr.value = ''
})