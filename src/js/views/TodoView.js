import { qs, $on } from '../helpers';
import $ from 'jquery';
import { formatDistanceStrict, format } from 'date-fns';

export default class TodoView {
  constructor() {
    $('#todo-modal').on('hidden.bs.modal', e => {
      const todoForm = qs('.todo-form');
      $('#todo-modal').off('shown.bs.modal');
      todoForm.classList.remove('edit');
      todoForm.reset();
      if (todoForm.contains(qs('input[type="hidden"]'))) {
        todoForm.removeChild(qs('input[type="hidden"]'));
      }
    });
  }

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
      if (!qs('.todo-form.edit')) {
        e.preventDefault();

        const projectId = qs('[data-project]').dataset.project;
        const todo = Array.from(e.target.elements).map(el => el.value);
        handler(projectId, todo);

        $('#todo-modal').modal('hide');
      }
    });

  }

  bindToggleTodo(handler) {
    $on(qs('.todos'), 'click', e => {
      if (e.target.matches('.btn-toggle')) {
        handler(e.target.dataset.id);
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

  bindClickEdit(handler) {
    const todoForm = qs('.todo-form');
    $on(qs('.todos'), 'click', e => {
      if (e.target.matches('.btn-edit')) {
        todoForm.classList.add('edit');
        $('#todo-modal').on('shown.bs.modal', evt => {
          if (todoForm.classList.contains('edit')) {
            const { title, description, dueDate, priority } = handler(e.target.dataset.id);

            const hiddenInput = document.createElement('input');
            hiddenInput.id = e.target.dataset.id;
            hiddenInput.type = 'hidden';
            todoForm.appendChild(hiddenInput);

            qs('#todo-title').value = title;
            qs('#todo-description').value = description;
            qs('#due-date').valueAsDate = new Date(dueDate);
            qs('#priority').value = priority;
          }
        });
      }
    });
  }

  bindEditTodo(handler) {
    $on(qs('.todo-form'), 'submit', e => {
      e.preventDefault();

      if (qs('.todo-form.edit')) {
        const todoId = qs('.todo-form input[type="hidden"]').id;
        const params = Array.from(e.target.elements).map(el => el.value);

        handler(todoId, params);
      }

      $('#todo-modal').modal('hide');
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
                  <button class="btn btn-link collapsed ${todo.completed ? 'disabled' : ''}" type="button" data-todoid="${todo.id}" data-toggle="collapse" data-target="#collapse-${idx}" aria-expand="true" aria-controls="collapse$-{idx}">
                    ${todo.title} ${this._renderBadge(todo.priority)}
                  </button>
                </h2>
              </div>
              <div class="col-4">
                <button type="button" data-id="${todo.id}" class="btn btn-success btn-toggle">${todo.completed ? 'Undo' : 'Done'}</button>
                <button type="button" data-id="${todo.id}" data-toggle="modal" data-target="#todo-modal" class="btn btn-secondary btn-edit">Edit</button>
                <button type="button" data-id="${todo.id}" class="btn btn-danger btn-remove">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <div id="collapse-${idx}" class="collapse" aria-labelledby="heading-${idx}" data-parent="#todos-accordion">
            <div class="card-body">
              <p>${todo.description}</p>
              <p><span class="font-weight-bold">Due Date:</span> ${format(new Date(todo.dueDate), 'dd-MM-yyyy - p')}</p>
              <p><span class="font-weight-bold">Time left:</span> ${formatDistanceStrict(new Date(todo.dueDate), new Date())}</p>
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

    return `<span class="badge badge-pill ${className}">${text}</span>`;
  }
}