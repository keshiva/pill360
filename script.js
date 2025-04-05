document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.getElementById('darkModeToggle');
    const eyeToggle = document.getElementById('eyeComfortToggle');
    const html = document.documentElement;

    // Load saved preferences
    darkToggle.checked = localStorage.getItem('darkMode') === 'true';
    eyeToggle.checked = localStorage.getItem('eyeComfort') === 'true';

    // Apply initial states
    if (darkToggle.checked) html.setAttribute('data-theme', 'dark');
    if (eyeToggle.checked) document.body.classList.add('eye-comfort');

    // Dark Mode Toggle
    darkToggle.addEventListener('change', (e) => {
        html.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
        localStorage.setItem('darkMode', e.target.checked);
    });

    // Eye Comfort Toggle
    eyeToggle.addEventListener('change', (e) => {
        document.body.classList.toggle('eye-comfort', e.target.checked);
        localStorage.setItem('eyeComfort', e.target.checked);
    });

    // Sample history data
    document.getElementById('history').innerHTML = `
        <div class="history-item p-3 border-bottom">
            <div class="d-flex justify-content-between">
                <span><i class="fas fa-pill me-2"></i>Ibuprofen</span>
                <small>Today, 10:30 AM</small>
            </div>
        </div>
    `;
});
