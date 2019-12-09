import { elements } from './../tools';

export const renderProjectsList = (projects) => {
  const markup = `
    <ul class="list-group">
      ${projects.map(project => renderProjectItem(project)).join('')}
    </ul>
  `;

  elements.projectsList.innerHTML = markup;
};

export const createProjectModal = () => {
  const markup = `
    <div class="modal fade" id="project-modal" tabindex="-1" role="dialog" aria-labelledby="project-modal-label"
    aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="project-modal-label">Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" name="title" id="title" aria-describedby="project-title">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" name="description" id="description" aria-describedby="project-description">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary btn-add-project">Add Project</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(markup);
};

const renderProjectItem = (project) => {
  return `
    <button type="button" class="list-group-item list-group-item-action">
      ${project.title}
    </button>
  `;
};