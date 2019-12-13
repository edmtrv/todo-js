import uniqid from 'uniqid';

export default class Project {
  constructor(title, description) {
    this.id = uniqid();
    this.title = title;
    this.description = description;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos.splice(index, 1);
  }
}