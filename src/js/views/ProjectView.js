import { elements } from '../helpers';

export const renderProjectsList = (projects) => {
  const markup = `
    <ul class="list-group">
      ${projects.map(project => renderProjectItem(project)).join('')}
    </ul>
  `;

  elements.projectsList.innerHTML = markup;
};

export const showProjectDetails = (project) => {
  const markup = `
    <p>${project.description}</p>
    <button class="btn btn-primary" data-project="${project.id}" data-toggle="modal" data-target="#todo-modal">Add Todo</button>
  `;

  elements.projectDetails.innerHTML = markup;
};

export const renderTodosList = (project) => {
  const markup = `
    <div class="accordion" id="todos-accordion">
      ${project.todos.map((todo, i) => renderTodoItem(todo, i)).join('')}
    </div>
  `;

  elements.todosList.innerHTML = markup;
};

const renderProjectItem = (project) => {
  return `
    <a href=#${project.id} class="list-group-item list-group-item-action">
      ${project.title}
    </a>
  `;
};

const renderTodoItem = (todo, idx) => {
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
};