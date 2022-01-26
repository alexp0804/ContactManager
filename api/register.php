<?php
    $inData = getRequestInfo();

    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "Group1Team";
    $dbName = "COP4331";

    // Create account fields
    $regFirstname = $inData["regFirstname"];
    $regLastname = $inData["regLastname"];
    $regUsername = $inData["regUsername"];
    $regPassword = $inData["regPassword"];
    $regPasswordConf = $inData["regPasswordConf"];
    
    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dbName);
    
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        // Check if username already exists
        $sql = "SELECT * FROM USERS WHERE USERNAME='$regUsername'";
        $result = $conn->query($sql);
        if($result->num_rows > 0)
        {
            returnWithError("Username already taken");
        }
        else
        {
            $sql = "insert into USERS(FIRSTNAME, LASTNAME, USERNAME, PASSWORD) values ('$regFirstname','$regLastname','$regUsername','$regPassword')";
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
