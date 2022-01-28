<?php
    // Get contact info from front-end
    $inData = getRequestInfo();

    $contFirstName = $inData["contFirstName"];
    $contLastName = $inData["contLastName"];
    $contEmail = $inData["contEmail"];
    $contPhone = $inData["contPhone"];
    $contUserID = $inData["contUserID"];

    // Connect to Contact database
    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "Group1Team";
    $dbName = "COP4331";

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dbName);

    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        // Delete from database
        $sql = "DELETE FROM CONTACTS WHERE (FIRSTNAME=?, LASTNAME=?, EMAIL=?, PHONENUMBER=?, USERID=?)";
        $sql->bind_param("sssss", $contFirstName, $contLastName, $contEmail, $contPhone, $contuserID);
       if ($result = $conn->query($sql) != TRUE)
       {
           returnWithError($conn->error);
       }
       else
       {
           // Return with empty error, to signal account creation successful
           returnWithError("");
       }
    }

    $conn->close();
    
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
