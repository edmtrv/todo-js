import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { $on } from './helpers';
import Project from './models/Project';
import Todo from './models/Todo';
import ProjectView from './views/ProjectView';
import TodoView from './views/TodoView';

const state = {};

const projectView = new ProjectView();
const todoView = new TodoView();

const app = () => {
  state.projects = [];
  const defaultProject = new Project('Default Project', 'Random todos go here');
  state.projects.push(defaultProject);

  projectView.bindAddProject(handleAddProject);
  projectView.bindSelectProject(handleSelectProject);
  todoView.bindAddTodo(handleAddTodo);
  todoView.bindToggleTodo(handleToggleTodo);
  todoView.bindRemoveTodo(handleRemoveTodo);
  todoView.bindClickEdit(handleClickEdit);
  todoView.bindEditTodo(handleEditTodo);

  projectView.renderProjectsList(state.projects);
  projectView.renderProjectDetails(defaultProject);
  todoView.renderTodosList(defaultProject);
};

const handleAddProject = (title, description) => {
  const project = new Project(title, description);
  state.projects.push(project);
  projectView.renderProjectsList(state.projects);
};

const handleSelectProject = (id) => {
  const activeProject = state.projects.find(project => project.id === id);
  projectView.renderProjectDetails(activeProject);
  todoView.renderTodosList(activeProject);
};

const handleAddTodo = (projectId, todoParams) => {
  const todo = new Todo(...todoParams);
  const project = state.projects.find(project => project.id === projectId);
  project.addTodo(todo);
  todoView.renderTodosList(project);
};

const handleToggleTodo = (id) => {
  const [todo, _] = _findTodoById(id);
  todo.toggleTodo();
  return todo.completed;
};

const handleClickEdit = (id) => {
  const [todo, _] = _findTodoById(id);
  return todo;
};

const handleEditTodo = (id, todoParams) => {
  const [todo, project] = _findTodoById(id);
  todo.editTodo(...todoParams);
  todoView.renderTodosList(project);
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