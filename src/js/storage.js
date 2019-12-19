import Project from './models/Project';
import Todo from './models/Todo';

export default class Storage {
  constructor(key) {
    this.key = key;
  }

  saveProjects(projects) {
    localStorage.setItem(this.key, JSON.stringify(projects));
  }

  loadProjects() {
    const data = localStorage.getItem(this.key);
    if (!data) return;

    const parsed = JSON.parse(data);
    const projects = [];
    console.log(parsed);
    for (let project of parsed) {
      project.todos = project.todos.map(todo => {
        return new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.completed);
      });
      projects.push(new Project(project.title, project.description, project.todos));
    }

    return projects;
  }
}