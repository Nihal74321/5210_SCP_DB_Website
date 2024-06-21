<?php
require_once 'creds.php'; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

ini_set('display_errors', 1);

// Query 1: Fetch items where type is 'safe' or 'Safe'
$sql1 = "SELECT * FROM scp_table WHERE LOWER(class) = 'safe'";
$result1 = $conn->query($sql1);

$data1 = array();

if ($result1->num_rows > 0) {
    while($row = $result1->fetch_assoc()) {
        $data1[] = $row;
    }
} else {
    // No results message for safe items
    $data1 = []; // Ensure data1 is initialized as an empty array if no results
}

// Query 2: Fetch items where item_type includes 'euclid' (case insensitive)
$sql2 = "SELECT * FROM scp_table WHERE LOWER(class) LIKE '%euclid%'";
$result2 = $conn->query($sql2);

$data2 = array();

if ($result2->num_rows > 0) {
    while($row = $result2->fetch_assoc()) {
        $data2[] = $row;
    }
} else {
    // No results message for euclid items
    $data2 = []; // Ensure data2 is initialized as an empty array if no results
}

// Query 3: Fetch the 5 most recent entries
$sql3 = "SELECT * FROM scp_table ORDER BY id DESC LIMIT 5";
$result3 = $conn->query($sql3);

$data3 = array();

if ($result3->num_rows > 0) {
    while($row = $result3->fetch_assoc()) {
        $data3[] = $row;
    }
} else {
    // No results message for recent entries
    $data3 = []; // Ensure data3 is initialized as an empty array if no results
}

$conn->close();

// Prepare the response as JSON
$response = array(
    'safe_items' => $data1,
    'euclid_items' => $data2,
    'recent_items' => $data3
);

// Set header only if no output has been sent
if (!headers_sent()) {
    header('Content-Type: application/json');
}

echo json_encode($response);
?>
