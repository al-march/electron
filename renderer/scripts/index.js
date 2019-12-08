const { ipcRenderer } = require('electron')

// удаление туду листа
const deleteTodo = e => {
  ipcRenderer.send('delete-todo', e.target.textContent)
}

// открытие окна добавления туду
document.querySelector('#create-todo').addEventListener('click', () => {
  ipcRenderer.send('add-todo-window')
})



// генерация туду
ipcRenderer.on('todos', (event, todos) => {
  // получение тудутега
  const todoList = document.querySelector('#todo-list')
  console.log(todos);
  // генерация разметки
  const todoItems = todos.reduce((html, todo) => {


    html +=
      `
    <li> 
      <div class="collapsible-header">
        <i class="material-icons">place</i>
        ${todo.name} 
        <span class="badge">1</span>
      </div>
      <div class="collapsible-body"><p>${todo.desc}</p></div>
    </li>
    `
    return html
  }, '')

  todoList.innerHTML = todoItems

  todoList.querySelectorAll('.collection-item').forEach(item => {
    item.addEventListener('click', deleteTodo)
  })
})

M.AutoInit()