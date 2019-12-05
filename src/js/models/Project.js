export default class Project {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this._todos = [];
  }

  addTodo(todo) {
    this._todos.push(todo);
  }

  get todos() {
    return this._todos;
  }
}