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

  bindToggleTodo(handler) {
    $on(qs('.todos'), 'click', e => {
      if (e.target.matches('.btn-toggle')) {
        const completed = handler(e.target.dataset.id);
        const todo = qs(`[data-todoid="${e.target.dataset.id}"]`);
        if (completed) {
          e.target.textContent = 'Undo';
          todo.classList.toggle('disabled');
        } else {
          e.target.textContent = 'Done';
          todo.classList.toggle('disabled');
        }
      }
    });
  }

  bindRemoveTodo(handler) {
    $on(qs('.todos'), 'click', e => {
      if (e.target.matches('.btn-remove')) {
        handler(e.target.dataset.id);
        const item = e.target.closest('.todo-item');
        item.parentNode.removeChild(item);
      }
    });
  }

  _renderTodoItem(todo, idx) {
    return `
      <div class="todo-item">
        <div class="card">
          <div class="card-header" id="heading-${idx}">
            <div class="row">
              <div class="col-8">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-todoid="${todo.id}" data-toggle="collapse" data-target="#collapse-${idx}" aria-expand="true" aria-controls="collapse$-{idx}">
                    ${todo.title} ${this._renderBadge(todo.priority)}
                  </button>
                </h2>
              </div>
              <div class="col-4">
                <button type="button" data-id="${todo.id}" class="btn btn-success btn-toggle">Done</button>
                <button type="button" data-id="${todo.id}" class="btn btn-secondary btn-edit">Edit</button>
                <button type="button" data-id="${todo.id}" class="btn btn-danger btn-remove">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <div id="collapse-${idx}" class="collapse" aria-labelledby="heading-${idx}" data-parent="#todos-accordion">
            <div class="card-body">
              ${todo.description}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _renderBadge(priority) {
    let text, className;

    if (priority === 'high') {
      text = 'High priority';
      className = 'badge-danger';
    } else if (priority === 'medium') {
      text = 'Medium priority';
      className = 'badge-warning';
    } else if (priority === 'low') {
      text = 'Low priority';
      className = 'badge-success';
    }

    return `<span class="badge ${className}">${text}</span>`;
  }
}