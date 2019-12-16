import uniqid from 'uniqid';

export default class Todo {
  constructor(title, description, dueDate, priority) {
    this.id = uniqid();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  editTodo(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  toggleTodo() {
    this.completed = this.completed ? false : true;
  }
}