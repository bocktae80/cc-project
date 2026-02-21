/**
 * Footer component for the todo app
 */

// TODO: add social media links
function Footer({ year }) {
  return `
    <footer class="footer">
      <p class="footer-text">Todo App &copy; ${year}</p>
      <nav class="footer-nav">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </footer>
  `;
}

module.exports = { Footer };
