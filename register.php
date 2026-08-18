<?php
// Prevent PHP warnings/notices from corrupting the JSON output
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Connecting using port 3377 based on your XAMPP configuration
$servername = "localhost:3377";
$username   = "root";     
$password   = "";         
$dbname     = "webinar";

// Establish connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Read raw JSON POST input
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['name']) && !empty($data['email']) && !empty($data['phone']) && !empty($data['role'])) {
    
    $name  = mysqli_real_escape_string($conn, trim($data['name']));
    $email = mysqli_real_escape_string($conn, trim($data['email']));
    $phone = mysqli_real_escape_string($conn, trim($data['phone']));
    $role  = mysqli_real_escape_string($conn, trim($data['role']));

    // Prepared statement for safer execution
    $stmt = $conn->prepare("INSERT INTO registrations (name, email, phone, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $role);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Registration saved successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database Error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Please complete all required fields"]);
}

$conn->close();
?>