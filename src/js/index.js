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
  const defaultProject = new Project('Default Project', 'My project for testing purposes');
  state.projects.push(defaultProject);
  pView.renderProjectsList(state.projects);

  pView.bindAddProject(handleAddProject);
  pView.bindSelectProject(handleSelectProject);
  tView.bindAddTodo(handleAddTodo);
  tView.bindToggleTodo(handleToggleTodo);
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
  let todo;
  console.log(state.projects);
  for (let project of state.projects) {
    todo = project.todos.find(td => td.id === id);
    if (todo) break;
  };

  todo.toggleTodo();
  return todo.completed;
};

const handleEditTodo = (id) => {

};

const handleRemoveTodo = (id) => {

};

$on(window, 'load', app);

// Code for refactoring below



// elements.todosList.addEventListener('click', e => {
//   if (e.target.matches('.btn-complete-todo')) {
//     controlCompleteTodo(e);
//   } else if (e.target.matches('.btn-edit-todo')) {
//     console.log('edit');
//   } else if (e.target.matches('.btn-remove-todo')) {
//     console.log('remove');
//   }
// });

// const controlCompleteTodo = (e) => {
//   console.log(e);
// };