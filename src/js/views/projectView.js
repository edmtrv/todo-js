import { elements } from './../tools';

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
    <button class="btn btn-primary" data-project="${project.id}">Add Todo</button>
  `;

  elements.projectDetails.innerHTML = markup;
};

const renderProjectItem = (project) => {
  return `
    <a href=#${project.id} class="list-group-item list-group-item-action">
      ${project.title}
    </a>
  `;
};