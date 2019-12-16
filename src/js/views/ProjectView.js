import { qs, $on } from '../helpers';

export default ProjectView {
  renderProjectsList(projects) {
    const markup = `
    <ul class="list-group">
      ${projects.map(project => _renderProjectItem(project)).join('')}
    </ul>
  `;

    qs('.projects-list').innerHTML = markup;
  }

  renderProjectDetails(project) {
    const markup = `
      <p>${project.description}</p>
      <button class="btn btn-primary" data-project="${project.id}" data-toggle="modal" data-target="#todo-modal">Add Todo</button>
    `;

    qs('.project-details').innerHTML = markup;
  }

  addProject(handler) {
    $on(qs('project-form'), 'submit', e => {
      e.preventDefault();
      const [title, description] = e.target.elements.map(el => el.value);
      handler(title, description);
      $('#project-modal').modal('hide');
      e.target.reset();
    });
  }

  selectProject(handler) {
    $on(qs('.projects-list'), 'click', e => {
      e.preventDefault();
      if (e.target.matches('[type="button"]')) {
        const id = e.target.dataset.projectID;
        handler(id);
      }
    });
  }

  _renderProjectItem(project) {
    return `
      <button type="button" data-projectID="${project.id}" class="list-group-item list-group-item-action">
        ${project.title}
      </buttoon>
    `;
  }

}

export const renderTodosList = (project) => {
  const markup = `
    <div class="accordion" id="todos-accordion">
      ${project.todos.map((todo, i) => renderTodoItem(todo, i)).join('')}
    </div>
  `;

  qs('.todos').innerHTML = markup;
};

const renderProjectItem = (project) => {

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