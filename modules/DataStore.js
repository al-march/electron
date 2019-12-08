const Store = require('electron-store')

class DataStore extends Store {
  constructor(settings) {
    // кастомные настройки к Store
    super(settings)
    this.todos = this.get('todos') || []

  }
  saveTodos() {
    // сохраняем todos в Json файле
    this.set('todos', this.todos)
    return this
  }

  getTodos() {
    // добавляем объект todo к остальным в JSON файле
    this.todos = this.get('todos') || []
    return this
  }

  addTodo(todo, desc) {
    let newTodo = {
      name: todo,
      desc: desc
    }
    this.todos = [...this.todos, newTodo]
    return this.saveTodos()
  }

  deleteTodo(todo) {

    this.todos = this.todos.filter(t => t !== todo)
    return this.saveTodos()
  }
}

// методы get и set - метода electron-store ('https://github.com/sindresorhus/electron-store?source=post_page-----8a542669ec4a----------------------')
// возвращать this не обязательно, но это хорошая практика. Позволяет создать цепочку вызовов. Например:
// const todosData = new DataStore({name: 'Todos Main'})
// todosData
//   .addTodo('Создать туду приложение')
//   .addTodo('еще одно туду')
//   .deleteTodo('удалить туду')

module.exports = DataStore