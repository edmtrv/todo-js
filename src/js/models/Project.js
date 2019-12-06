import uniqid from 'uniqid';

export default class Project {
  constructor(title, description) {
    this.id = uniqid();
    this.title = title;
    this.description = description;
    this._todos = [];
  }

  addTodo(todo) {
    this._todos.push(todo);
  }

  removeTodo(id) {
    const index = this._todos.findIndex(todo => todo.id === id);
    this._todos.splice(index, 1);
  }

  get todos() {
    return this._todos;
  }
}