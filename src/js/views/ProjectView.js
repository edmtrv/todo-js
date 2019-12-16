import { qs, $on } from '../helpers';

export default class ProjectView {
  renderProjectsList(projects) {
    const markup = `
      <ul class="list-group">
        ${projects.map(project => this._renderProjectItem(project)).join('')}
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

  bindAddProject(handler) {
    $on(qs('project-form'), 'submit', e => {
      e.preventDefault();
      const [title, description] = e.target.elements.map(el => el.value);
      handler(title, description);
      $('#project-modal').modal('hide');
      e.target.reset();
    });
  }

  bindSelectProject(handler) {
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