document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        toggle.checked = true;
        body.classList.add('dark');
    }
    
    // Toggle dark mode
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    });
});
