export const renderProjects = (projects) => {
  const markup = `
    <ul class="list-group">
      ${projects.forEach(project => renderProjects(project))};
    </ul>
  `;

  document.getElementById('projects').innerHTML = markup;
};