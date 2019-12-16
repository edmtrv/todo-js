import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { $on } from './helpers';
import Project from './models/Project';
import Todo from './models/Todo';
import ProjectView from './views/ProjectView';
import TodoView from './views/TodoView';

const state = {};

const app = () => {
  state.projects = [];
  const defaultProject = new Project('Default Project', 'My project for testing purposes');
  state.projects.push(defaultProject);
  projectView.renderProjectsList(state.projects);

  ProjectView.addProject(handleAddProject);
  ProjectView.selectProject(handleSelectProject);
};

const handleAddProject = (title, description) => {
  const project = new Project(title, description);
  state.projects.push(project);
  onProjectListChange();
};

const handleSelectProject = (id) => {
  const activeProject = state.projects.find(project => project.id === id);
  ProjectView.renderProjectDetails(activeProject);
  TodoView.renderTodosList(activeProject);
};

const onProjectListChange = () => {
  ProjectView.renderProjectsList(state.projects);
};

$on(window, 'load', app);

// Code for refactoring below

elements.todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = window.location.hash.replace('#', '');

  const [title, description, dueDate, priority] = [...e.target.elements].map(el => el.value);
  const todo = new Todo(title, description, dueDate, priority);

  const project = state.projects.find(project => project.id === id);
  project.addTodo(todo);
  projectView.renderTodosList(project);

  $('#todo-modal').modal('hide');
  e.target.reset();
});


elements.todosList.addEventListener('click', e => {
  if (e.target.matches('.btn-complete-todo')) {
    controlCompleteTodo(e);
  } else if (e.target.matches('.btn-edit-todo')) {
    console.log('edit');
  } else if (e.target.matches('.btn-remove-todo')) {
    console.log('remove');
  }
});

const controlCompleteTodo = (e) => {
  console.log(e);
};