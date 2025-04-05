document.addEventListener('DOMContentLoaded', function() {
    const darkToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        darkToggle.checked = true;
        html.setAttribute('data-theme', 'dark');
    }

    // Toggle Dark Mode
    darkToggle.addEventListener('change', function() {
        if (this.checked) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            html.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'false');
        }
    });
});
