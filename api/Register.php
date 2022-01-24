<?php
    // SQL info
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
    $login     = $inData["login"];
    $password  = $inData["password"];

    // Do not add users with missing fields.
    if (empty($firstName) || empty($lastName) || empty($login) || empty($password))
    {
        returnWithError("Empty field(s)");
    }

    // Check if login already exists
    $stmt = "SELECT * FROM Users WHERE Login='$login'";
    $result = $conn->query($stmt);

    if ($result->num_rows != 0)
    {
        returnWithError("Login already taken.");
    }

    // Insert user
    $stmt = "INSERT INTO Users (FirstName,LastName,Login,Password) Values ('$firstName', '$lastName', '$login', '$password')";

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


