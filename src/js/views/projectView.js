export const renderProjectsList = (projects) => {
  const markup = `
    <ul class="list-group">
      ${projects.forEach(project => renderProjects(project))};
    </ul>
  `;

  document.getElementById('projects').innerHTML = markup;
};

const renderProjectItem = (project) => {
  return `
    <button type="button" class="list-group-item list-group-item-action">
      ${project.title}
    </button>
  `;
};