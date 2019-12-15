export const elements = {
  projectsList: document.querySelector(),
  projectForm: document.querySelector('.project-form'),
  projectDetails: document.querySelector(),
  todosList: document.querySelector(),
  todoForm: document.querySelector('.todo-form'),
};

export const qs = (selector, scope) => (document || scope).querySelector(selector);