<?php
// Save to plain text (simple version)
$event = $_GET['event'] ?? 'unknown_event';
$time = $_GET['time'] ?? date('H:i:s');

$log_entry = date('Y-m-d H:i:s') . " - Alarm $event at $time\n";
file_put_contents('alarm_log.txt', $log_entry, FILE_APPEND);

// For database version (uncomment if using MySQL):
/*
$conn = new mysqli("localhost","user","password","database");
$stmt = $conn->prepare("INSERT INTO alarms (event, event_time) VALUES (?,?)");
$stmt->bind_param("ss", $event, $time);
$stmt->execute();
$conn->close();
*/

header('Content-Type: application/json');
echo json_encode(['status' => 'success']);
?>
