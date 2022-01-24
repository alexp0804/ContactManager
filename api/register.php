<?php
    # SQL info
    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "Group1Team";
    $dbName = "COP4331";

    // Create connection
    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dbName);

    // Check connection status
    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }

    // Get information from frontend: (first, last, login, password)
    $inData = getRequestInfo();

    $firstName = $inData["first"];
    $lastName  = $inData["last"];
    $username  = $inData["username"];
    $password  = $inData["password"];

    // Do not add users with missing fields.
    if (empty($firstName) || empty($lastName) || empty($username) || empty($password))
    {
        returnWithError("Empty field(s)");
    }

    // Check if username already exists
    $stmt = "SELECT * FROM Users WHERE Login='$username'";
    $result = $conn->query($stmt);

    if ($result->num_rows != 0)
    {
        returnWithError("Username already taken.");
    }

    // Insert user
    $stmt = "INSERT INTO Users (FirstName,LastName,Login,Password) Values ('$firstName', '$lastName', '$username', '$password')";

    // Insertion successful
    if ($conn->query($stmt) === TRUE)
    {
        returnWithError("");
    }
    // Insertion failed
    else
    {
        returnWithError($conn->error);
    }

    $conn->close();

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		die($obj);
	}
		
	function returnWithError($err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
