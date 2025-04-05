document.addEventListener('DOMContentLoaded', function() {
    const darkToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        darkToggle.checked = true;
        body.classList.add('dark-mode');
    }

    // Toggle Dark Mode
    darkToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
});
