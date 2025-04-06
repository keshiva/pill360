// Initialize Firebase (if using)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase (comment out if not using)
// firebase.initializeApp(firebaseConfig);

// DOM Elements
const alarmLog = document.getElementById('alarmLog');
const refreshBtn = document.getElementById('refreshLogs');

// Fetch logs from server
async function fetchAlarmLogs() {
    try {
        // For text file logging
        const response = await fetch('alarm_log.txt?cache=' + new Date().getTime());
        const logText = await response.text();
        
        // For Firebase (alternative)
        // const snapshot = await firebase.database().ref('alarms').once('value');
        // const logs = snapshot.val();
        
        displayLogs(parseLogText(logText));
    } catch (error) {
        console.error("Error fetching logs:", error);
        alarmLog.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle"></i> Failed to load logs
            </div>
        `;
    }
}

// Parse log text into structured data
function parseLogText(text) {
    return text.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
            const [datetime, message] = line.split(' - ');
            return { datetime, message };
        })
        .reverse(); // Show newest first
}

// Display logs in the UI
function displayLogs(logs) {
    if (logs.length === 0) {
        alarmLog.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="far fa-clock"></i> No alarm history yet
            </div>
        `;
        return;
    }

    alarmLog.innerHTML = logs.map(log => `
        <div class="log-entry">
            <div class="log-message">${log.message}</div>
            <div class="log-time">
                <i class="far fa-clock"></i> ${log.datetime}
            </div>
        </div>
    `).join('');
}

// Set up refresh button
refreshBtn.addEventListener('click', () => {
    refreshBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Refreshing`;
    fetchAlarmLogs();
    setTimeout(() => {
        refreshBtn.innerHTML = `<i class="fas fa-sync-alt"></i> Refresh`;
    }, 1000);
});

// Initial load and auto-refresh
fetchAlarmLogs();
setInterval(fetchAlarmLogs, 30000); // Refresh every 30 seconds

// Optional: If using Firebase realtime updates
/*
firebase.database().ref('alarms').on('value', (snapshot) => {
    const logs = [];
    snapshot.forEach(childSnapshot => {
        logs.push(childSnapshot.val());
    });
    displayLogs(logs.reverse());
});
*/
