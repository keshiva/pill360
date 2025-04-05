// Toggle Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('change', () => {
  document.body.setAttribute('data-theme', 
    darkModeToggle.checked ? 'dark' : 'light');
  localStorage.setItem('darkMode', darkModeToggle.checked);
});

// Toggle Blue Light Filter
const blueLightBtn = document.getElementById('blueLightBtn');
blueLightBtn.addEventListener('click', () => {
  document.body.classList.toggle('blue-light-active');
  const isActive = document.body.classList.contains('blue-light-active');
  localStorage.setItem('blueLightFilter', isActive);
  blueLightBtn.classList.toggle('btn-primary', isActive);
  blueLightBtn.classList.toggle('btn-outline-primary', !isActive);
});

// Load Saved Preferences
function loadPreferences() {
  // Dark Mode
  if (localStorage.getItem('darkMode') === 'true') {
    darkModeToggle.checked = true;
    document.body.setAttribute('data-theme', 'dark');
  }

  // Blue Light Filter
  if (localStorage.getItem('blueLightFilter') === 'true') {
    document.body.classList.add('blue-light-active');
    blueLightBtn.classList.add('btn-primary');
    blueLightBtn.classList.remove('btn-outline-primary');
  }
}

loadPreferences();
