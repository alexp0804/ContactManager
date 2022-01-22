<?php

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "Group1Team";
$dbName = "COP4331";

// Create connection
$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dbName);

// Check connection status
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

// Get information from frontend: (first, last, login, password)
$inData = json_decode(file_get_contents('php://input'), true);

$firstName = $inData["first"];
$lastName  = $inData["last"];
$username  = $inData["username"];
$password  = $inData["password"];

// Check username isn't already taken
$stmt = $conn->prepare("SELECT * FROM Users WHERE Login=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if (mysqli_num_rows($result) != 0)
{
    die("Username already taken.")
}

// Insert user
 $sql_command = "INSERT INTO Users (FirstName,LastName,Login,Password) Values ('$firstName', '$lastName', '$username', '$password')";

// Insertion successful
if ($conn->query($sql_command) === TRUE)
{
    echo "New record created successfully";
}
// Insertion failed
else
{
    echo "Error: " . $sql_command . "<br>" . $conn->erorr;
}

$conn->close();
