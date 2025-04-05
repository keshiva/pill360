// Firebase configuration - USE YOUR ACTUAL CONFIG FROM FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyA7380_3e1rglsdzdWbnOztsHdNv77N8aM",
    authDomain: "pill360.firebaseapp.com",
    databaseURL: "https://pill360.firebaseio.com",
    projectId: "pill360",
    storageBucket: "pill360.appspot.com",
    messagingSenderId: "592976629232",
    appId: "1:592976629232:web:df1089647663f5cd162135"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM Elements
const pillCountEl = document.getElementById('pillCount');
const dispenseBtn = document.getElementById('dispenseBtn');
const pillHistoryEl = document.getElementById('pillHistory');

// Real-time listener for pill count
database.ref('pills/count').on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    pillCountEl.textContent = count;
});

// Listener for pill history
database.ref('pills/history').limitToLast(10).on('value', (snapshot) => {
    pillHistoryEl.innerHTML = ''; // Clear current history
    
    const history = snapshot.val() || {};
    Object.entries(history).forEach(([timestamp, pillData]) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item';
        
        const time = new Date(parseInt(timestamp)).toLocaleString();
        listItem.innerHTML = `
            <span>${pillData.pillName || 'Medication'}</span>
            <small class="text-muted">${time}</small>
        `;
        
        pillHistoryEl.prepend(listItem);
    });
});

// Dispense button handler
dispenseBtn.addEventListener('click', () => {
    // Send command to Arduino (replace with your ESP32's IP)
    fetch('http://YOUR_ESP32_IP/dispense', { method: 'POST' })
        .then(response => {
            if (!response.ok) throw new Error('Failed to dispense');
            console.log('Dispense command sent');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to connect to dispenser');
        });
});