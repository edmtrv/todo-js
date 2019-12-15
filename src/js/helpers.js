export const elements = {
  projectsList: document.querySelector(),
  projectForm: document.querySelector(),
  projectDetails: document.querySelector(),
  todosList: document.querySelector(),
  todoForm: document.querySelector('.todo-form'),
};

export const qs = (selector, scope) => (document || scope).querySelector(selector);

export const $on = (target, eventType, handler, capture) => {
  target.addEventListener(eventType, handler, !!capture);
};