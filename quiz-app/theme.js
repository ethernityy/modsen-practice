export function initializeTheme(themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.quiz-container').classList.add('dark-mode');
    document.querySelector('header').classList.add('dark-mode');
    themeToggle.checked = true;
  }
}

export function toggleTheme(themeToggle) {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.quiz-container').classList.toggle('dark-mode');
  document.querySelector('header').classList.toggle('dark-mode');
  localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
}
