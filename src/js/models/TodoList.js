export default class TodoList {
  constructor() {
    this._todos = [];
  }

  addTodo(todo) {
    this._todos.push(todo);
  }

  get todos() {
    return this._todos;
  }
}