import uniqid from 'uniqid';

export default class TodoList {
  constructor(title, description, dueDate, priority = 'default') {
    this.id = uniqid();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}