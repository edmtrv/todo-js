export const elements = {
  todoForm: document.querySelector('.todo-form'),
};

export const qs = (selector, scope) => (scope || document).querySelector(selector);

export const $on = (target, eventType, handler, capture) => {
  target.addEventListener(eventType, handler, !!capture);
};