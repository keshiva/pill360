<?php
header('Content-Type: application/json');

// Simple security check
$allowed_events = ['triggered', 'stopped', 'scheduled', 'dismissed'];
$event = isset($_GET['event']) ? $_GET['event'] : '';
$time = isset($_GET['time']) ? $_GET['time'] : date('H:i:s');
$details = isset($_GET['details']) ? $_GET['details'] : '';
$medication = isset($_GET['med']) ? $_GET['med'] : '';

if (!in_array($event, $allowed_events)) {
    die(json_encode(['status' => 'error', 'message' => 'Invalid event type']));
}

// Create log entry
$log_entry = date('Y-m-d H:i:s') . " - ";
switch ($event) {
    case 'triggered':
        $log_entry .= "Alarm triggered at $time";
        break;
    case 'stopped':
        $log_entry .= "Alarm stopped at $time ($details)";
        break;
    case 'scheduled':
        $log_entry .= "Alarm set for $medication at $time";
        break;
    default:
        $log_entry .= "Alarm event: $event at $time";
}

$log_entry .= "\n";

// Save to file
file_put_contents('alarm_log.txt', $log_entry, FILE_APPEND);

// Return response
echo json_encode([
    'status' => 'success',
    'logged' => trim($log_entry),
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
