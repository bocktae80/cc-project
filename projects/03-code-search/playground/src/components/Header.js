/**
 * Header component for the todo app
 */

function Header({ title, todoCount }) {
  return `
    <header class="header">
      <h1 class="header-title">${title}</h1>
      <span class="header-count">${todoCount} items</span>
    </header>
  `;
}

module.exports = { Header };
