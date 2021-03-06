import uniqid from 'uniqid';

export default class Project {
  constructor(title, description, todos = []) {
    this.id = uniqid();
    this.title = title;
    this.description = description;
    this.todos = todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}