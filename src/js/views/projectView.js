export const renderProjectsList = (projects) => {
  const markup = `
    <ul class="list-group">
      ${projects.map(project => renderProjectItem(project)).join('')}
    </ul>
  `;

  .innerHTML = markup;
};

const renderProjectItem = (project) => {
  return `
    <button type="button" class="list-group-item list-group-item-action">
      ${project.title}
    </button>
  `;
};