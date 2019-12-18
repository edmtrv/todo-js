import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { $on } from './helpers';
import Project from './models/Project';
import Todo from './models/Todo';
import ProjectView from './views/ProjectView';
import TodoView from './views/TodoView';

const state = {};

const pView = new ProjectView();
const tView = new TodoView();

const app = () => {
  state.projects = [];
  const defaultProject = new Project('Default Project', 'Random todos go here');
  state.projects.push(defaultProject);
  pView.renderProjectsList(state.projects);

  pView.bindAddProject(handleAddProject);
  pView.bindSelectProject(handleSelectProject);
  tView.bindAddTodo(handleAddTodo);
  tView.bindToggleTodo(handleToggleTodo);
  tView.bindRemoveTodo(handleRemoveTodo);
};

const handleAddProject = (title, description) => {
  const project = new Project(title, description);
  state.projects.push(project);
  pView.renderProjectsList(state.projects);
};

const handleSelectProject = (id) => {
  const activeProject = state.projects.find(project => project.id === id);
  pView.renderProjectDetails(activeProject);
  tView.renderTodosList(activeProject);
};

const handleAddTodo = (projectId, title, description, dueDate, priority) => {
  const todo = new Todo(title, description, dueDate, priority);
  const project = state.projects.find(project => project.id === projectId);
  project.addTodo(todo);
  tView.renderTodosList(project);
};

const handleToggleTodo = (id) => {
  const [todo, _] = _findTodoById(id);
  todo.toggleTodo();
  return todo.completed;
};

const handleEditTodo = (id) => {

};

const handleRemoveTodo = (id) => {
  const [todo, project] = _findTodoById(id);

  if (todo) project.removeTodo(todo.id);
};

const _findTodoById = (id) => {
  let todo;

  for (let project of state.projects) {
    todo = project.todos.find(td => td.id === id);
    if (todo) {
      return [todo, project];
    }
  };
};

$on(window, 'load', app);