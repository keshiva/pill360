document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Load saved preference
    darkToggle.checked = localStorage.getItem('darkMode') === 'true';
    if (darkToggle.checked) body.classList.add('dark-mode');

    // Toggle Dark Mode
    darkToggle.addEventListener('change', (e) => {
        body.classList.toggle('dark-mode', e.target.checked);
        localStorage.setItem('darkMode', e.target.checked);
    });
});
