<?php
// Include necessary files
require_once './creds.php'; // Include your database credentials

// Check if the form data is received via POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize inputs (for security, not shown in this basic example)
    $id = $_POST['id'];

    // Connect to your database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement to delete the record
    $sql = "DELETE FROM scp_table WHERE id=?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }

    // Bind the parameters to the SQL query
    $stmt->bind_param("i", $id); // Assuming id is an integer (change 'i' if id is another type)

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["message" => "Successfully deleted SCP"]);
    } else {
        echo json_encode(["error" => "Error deleting record: " . $stmt->error]);
    }

    // Close the statement and the connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
