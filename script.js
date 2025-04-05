// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const blueLightFilter = document.getElementById('blueLightFilter');
const blueLightContainer = document.getElementById('blueLightContainer');

// Dark Mode Toggle
darkModeToggle.addEventListener('change', () => {
    const isDarkMode = darkModeToggle.checked;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Disable blue light filter in dark mode
    if (isDarkMode) {
        document.documentElement.style.setProperty('--blue-light-opacity', '0');
        blueLightFilter.value = 0;
        blueLightContainer.style.opacity = '0.5';
    } else {
        blueLightContainer.style.opacity = '1';
    }
    
    localStorage.setItem('darkMode', isDarkMode);
});

// Blue Light Filter Slider
blueLightFilter.addEventListener('input', (e) => {
    const opacity = e.target.value / 100;
    document.documentElement.style.setProperty('--blue-light-opacity', opacity);
    localStorage.setItem('blueLightFilter', e.target.value);
});

// Initialize
function loadPreferences() {
    // Dark Mode
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeToggle.checked = true;
        document.body.setAttribute('data-theme', 'dark');
        blueLightContainer.style.opacity = '0.5';
    }
    
    // Blue Light Filter
    const savedFilterValue = localStorage.getItem('blueLightFilter') || '0';
    blueLightFilter.value = savedFilterValue;
    document.documentElement.style.setProperty(
        '--blue-light-opacity', 
        savedFilterValue / 100
    );
}

loadPreferences();

// Pill History Simulation (replace with real data)
function updateHistory() {
    const historyDiv = document.getElementById('history');
    const mockHistory = [
        { time: "10:30 AM", date: new Date().toLocaleDateString() },
        { time: "8:15 AM", date: new Date().toLocaleDateString() },
        { time: "10:30 AM", date: new Date(Date.now() - 86400000).toLocaleDateString() }
    ];

    historyDiv.innerHTML = mockHistory.map(item => `
        <div class="history-item">
            <div class="d-flex justify-content-between">
                <span><i class="fas fa-clock me-2"></i>${item.time}</span>
                <small class="text-muted">${item.date}</small>
            </div>
        </div>
    `).join('');
}

updateHistory();
