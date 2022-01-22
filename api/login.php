<?php

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "Group1Team";
$dbName = "COP4331";

// Create connection
$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dbName);

// Check connection status
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql_command = "INSERT INTO Users (FirstName,LastName,Login,Password) Values ('Alexander', 'Peterson', 'ap0804', 'Group1Team')";

if ($conn->query($sql_command) === TRUE) {
    echo "New record created successfully";
}
else {
        echo "Error: " . $sql_command . "<br>" . $conn->erorr;
}

$conn->close();

?>

