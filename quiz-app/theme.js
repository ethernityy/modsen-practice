const themeToggle = document.getElementById('theme-toggle');

export function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.quiz-container').classList.add('dark-mode');
    document.querySelector('header').classList.add('dark-mode');
    themeToggle.checked = true;
  }
}

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.quiz-container').classList.toggle('dark-mode');
  document.querySelector('header').classList.toggle('dark-mode');
  localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});
