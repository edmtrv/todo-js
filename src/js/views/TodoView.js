import { qs, $on } from '../helpers';
import $ from 'jquery';

export default class TodoView {
  renderTodosList(project) {
    const markup = `
      <div class="accordion" id="todos-accordion">
        ${project.todos.map((todo, i) => this._renderTodoItem(todo, i)).join('')}
      </div>
    `;

    qs('.todos').innerHTML = markup;
  }

  bindAddTodo(handler) {
    $on(qs('.todo-form'), 'submit', e => {
      e.preventDefault();
      const projectId = qs('[data-project]').dataset.project;
      const [title, description, dueDate, priority] = Array.from(e.target.elements).map(el => el.value);

      handler(projectId, title, description, dueDate, priority);

      $('#todo-modal').modal('hide');
      e.target.reset();
    });
  }

  _renderTodoItem(todo, idx) {
    return `
      <div class="card">
        <div class="card-header" id="heading-${idx}">
          <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse-${idx}" aria-expand="true" aria-controls="collapse$-{idx}">
              ${todo.title}
            </button>
          </h2>
          <button type="button" class="btn btn-success btn-complete-todo">Complete</button>
          <button type="button" class="btn btn-warning btn-edit-todo">Edit</button>
          <button type="button" class="btn btn-danger btn-remove-todo">Remove</button>
        </div>

        <div id="collapse-${idx}" class="collapse" aria-labelledby="heading-${idx}" data-parent="#todos-accordion">
          <div class="card-body">
            ${todo.description}
          </div>
        </div>
      </div>
    `;
  }
}