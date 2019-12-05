export default class TodoList {
  constructor(title, description, dueDate, priority = 'default', notes = [], checklist = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
  }
}