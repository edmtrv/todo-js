import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { elements } from './tools';
import Project from './models/Project';
import Todo from './models/Todo';
import * as projectView from './views/projectView';

const state = {};

// const t1 = new Todo('My first todo', 'Doing something cool', '20191112');
// const t2 = new Todo('My second todo', 'A lot of work', '20191209');
// const t3 = new Todo('My third todo', 'Doing something even better', '20191125');

// p1.addTodo(t1);
// p1.addTodo(t2);
// p1.addTodo(t3);

// state.projects.push(p1);

// console.dir(state);

window.addEventListener('load', () => {
  state.projects = [];
  const defaultProject = new Project('Default Project', 'My project for testing purposes');
  state.projects.push(defaultProject);
  projectView.renderProjectsList(state.projects);
});


