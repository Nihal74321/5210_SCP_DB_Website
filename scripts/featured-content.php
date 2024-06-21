<?php
require_once 'creds.php'; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM scp_table ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql );

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo "No results found";
}

$conn->close();
header('Content-Type: application/json');
echo json_encode($data);
?>