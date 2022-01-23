<?php
    $inData = getRequestInfo();

    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "Group1Team";
    $dbName = "COP4331";

    $firstName = $inData["first"];
    $lastName  = $inData["last"];
    $username  = $inData["username"];
    $password  = $inData["password"];

    // Create connection
    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dbName);
    
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        // Check if username already exists
        $sql = "SELECT * FROM Users WHERE Login='$username'";
        $result = $conn->query($sql);
        if($result->num_rows > 0)
        {
            returnWithError("Username already taken");
        }
        else
        {
            $sql = "insert into Users(FirstName, LastName, Login, Password) values ('$firstName','$lastName','$username','$password')";
            if ($result = $conn->query($sql) != TRUE) {
                returnWithError($conn->error);
            }
            else
            {
                returnWithError(""); // Return with empty error, to signal account creation successful
            }
        }
        $conn->close();
    }

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
