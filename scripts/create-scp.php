<?php
// Include necessary files
require_once './creds.php'; // Include your database credentials

// Check if the form data is received via POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize inputs (for security, not shown in this basic example)

    // Connect to your database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Calculate the value to be inserted as the first parameter (id + 2013)
    $sql_for_id = "SELECT id FROM scp_table ORDER BY id DESC LIMIT 1";
    $result_for_id = $conn->query($sql_for_id);
    if ($result_for_id->num_rows > 0) {
        $last_id_row = $result_for_id->fetch_assoc();
        $item_formatted = intval($last_id_row['id']) + 2015;
    } else {
        // If no rows found (probably when the table is empty), set a default value
        $item_formatted = 2025;
    }
        $item_formatted_string = "SCP-". $item_formatted;

    // Prepare SQL statement to insert data into your table
    $stmt = $conn->prepare("INSERT INTO scp_table (name, item, class, containment, description, image) VALUES (?, ?, ?, ?, ?, ?)");

    // Bind parameters (s indicates the data type is string, i indicates integer)
    $stmt->bind_param("ssssss", $name, $item_formatted_string, $class, $description, $containment, $image_source);

    // Set parameters and execute the statement
    $name = $_POST['name'];
    $class = $_POST['class'];
    $description = $_POST['description'];
    $containment = $_POST['containment'];
    $image_source = $_POST['image_source'];

    if ($stmt->execute()) {
        // Return success JSON response
        $response = array("status" => "success", "message" => "SCP inserted successfully");
        echo json_encode($response);
    } else {
        // Return error JSON response
        $response = array("status" => "error", "message" => "Error inserting SCP: " . $stmt->error);
        echo json_encode($response);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Return error if not receiving POST request
    $response = array("status" => "error", "message" => "Method not allowed");
    echo json_encode($response);
}
?>
