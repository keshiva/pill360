document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.getElementById('darkModeToggle');
    const eyeToggle = document.getElementById('eyeComfortToggle');
    const body = document.body;

    // Load saved preferences
    darkToggle.checked = localStorage.getItem('darkMode') === 'true';
    eyeToggle.checked = localStorage.getItem('eyeComfort') === 'true';

    // Apply initial states
    if (darkToggle.checked) body.classList.add('dark-mode');
    if (eyeToggle.checked) body.classList.add('eye-comfort');

    // Dark Mode Toggle
    darkToggle.addEventListener('change', (e) => {
        body.classList.toggle('dark-mode', e.target.checked);
        localStorage.setItem('darkMode', e.target.checked);
    });

    // Eye Comfort Toggle
    eyeToggle.addEventListener('change', (e) => {
        body.classList.toggle('eye-comfort', e.target.checked);
        localStorage.setItem('eyeComfort', e.target.checked);
    });

    // Sample history
    document.getElementById('history').innerHTML = `
        <div class="p-3 border-bottom">
            <div class="d-flex justify-content-between">
                <span><i class="fas fa-pill me-2"></i>Medication Taken</span>
                <small>${new Date().toLocaleTimeString()}</small>
            </div>
        </div>
    `;
});
