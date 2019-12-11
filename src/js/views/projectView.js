import { elements } from './../tools';

export const renderProjectsList = (projects) => {
  const markup = `
    <ul class="list-group">
      ${projects.map(project => renderProjectItem(project)).join('')}
    </ul>
  `;

  elements.projectsList.innerHTML = markup;
};

const renderProjectItem = (project) => {
  return `
    <a href=#${project.id} class="list-group-item list-group-item-action">
      ${project.title}
    </a>
  `;
};