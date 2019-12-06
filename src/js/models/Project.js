import TodoList from './TodoList';
import uniqid from 'uniqid';

export default class Project {
  constructor(title, description, dueDate) {
    this.id = uniqid();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this._todos = new TodoList();
  }
}