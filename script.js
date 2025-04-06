// DOM Elements
const alarmLog = document.getElementById('alarmLog');
const refreshBtn = document.getElementById('refreshLogs');
const nextAlarmTime = document.getElementById('nextAlarmTime');
const nextMedication = document.getElementById('nextMedication');

// Fetch logs from server
async function fetchAlarmLogs() {
    try {
        const response = await fetch('alarm_log.txt?cache=' + new Date().getTime());
        const logText = await response.text();
        displayLogs(parseLogText(logText));
        updateNextAlarm(logText);
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
            return { 
                datetime: datetime.trim(),
                message: message.trim(),
                eventType: message.includes('stopped') ? 'stopped' : 
                          message.includes('triggered') ? 'triggered' : 'unknown'
            };
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
        <div class="log-entry ${log.eventType}">
            <div class="log-message">
                <i class="${getIconForEvent(log.eventType)}"></i> 
                ${log.message}
            </div>
            <div class="log-time">
                <i class="far fa-clock"></i> ${log.datetime}
            </div>
        </div>
    `).join('');
}

// Get appropriate icon for event type
function getIconForEvent(eventType) {
    switch(eventType) {
        case 'stopped': return 'fas fa-fingerprint';
        case 'triggered': return 'fas fa-bell';
        default: return 'fas fa-info-circle';
    }
}

// Update next alarm display
function updateNextAlarm(logText) {
    const logs = parseLogText(logText);
    const futureAlarms = logs.filter(log => 
        log.message.includes('scheduled') || log.message.includes('Alarm set')
    );
    
    if (futureAlarms.length > 0) {
        const nextAlarm = futureAlarms[0];
        nextAlarmTime.textContent = extractTimeFromMessage(nextAlarm.message);
        nextMedication.textContent = extractMedFromMessage(nextAlarm.message);
    } else {
        nextAlarmTime.textContent = '--:-- --';
        nextMedication.textContent = 'No alarms scheduled';
    }
}

function extractTimeFromMessage(message) {
    const timeMatch = message.match(/(\d{1,2}:\d{2} [AP]M)/);
    return timeMatch ? timeMatch[0] : '--:-- --';
}

function extractMedFromMessage(message) {
    const medMatch = message.match(/for (.+?) at/);
    return medMatch ? medMatch[1] : 'Medication';
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
