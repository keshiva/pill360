// Firebase Configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM Elements
const pillCountEl = document.getElementById('pillCount');
const dispenseBtn = document.getElementById('dispenseBtn');
const pillHistoryEl = document.getElementById('pillHistory');

// Real-time Database Listeners
database.ref('pills/count').on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    pillCountEl.textContent = count;
});

database.ref('pills/history').limitToLast(10).on('value', (snapshot) => {
    pillHistoryEl.innerHTML = '';
    const history = snapshot.val() || {};

    Object.entries(history).forEach(([timestamp, data]) => {
        const time = new Date(parseInt(timestamp)).toLocaleTimeString();
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <div>
                <strong>${data.pillName || 'Medication'}</strong>
                <div class="text-muted small">${data.dose || ''}</div>
            </div>
            <div class="text-end">
                <small class="text-muted">${time}</small>
                <div class="badge bg-primary">Dispensed</div>
            </div>
        `;
        pillHistoryEl.appendChild(listItem);
    });
});

// Dispense Button Handler
dispenseBtn.addEventListener('click', () => {
    // Send command to Arduino
    fetch('http://YOUR_ESP32_IP/dispense', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time: Date.now() })
    })
    .catch(error => console.error('Dispense error:', error));
});
