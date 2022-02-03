<?php
    // Get contact info from front-end
    $inData = getRequestInfo();

    $newFirstName = $inData["newFirstName"];
    $newLastName = $inData["newLastName"];
    $newEmail = $inData["newEmail"];
    $newPhone = $inData["newPhone"];
    
    $userId = $inData["userID"];
    $contactId = $inData["contID"];

    // Connect to Contacts database
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
        // Check that entry exists
        $sql = "SELECT * FROM CONTACTS WHERE ID = '$contactId' AND USERID = '$userId'";
        $result = $conn->query($sql);
        if ($result->num_rows != 1)
        {
            returnWithError("Entry not found for $inData");
        }
        else
        {
            // Update SQL entry
            $sql = "UPDATE CONTACTS SET
                    FirstName='$newFirstName',
                    LastName='$newLastName',
                    Email='$newEmail',
                    PhoneNumber='$newPhone'
                    where UserID='$userId' and ContactID='$contactId'";

            if ($result = $conn->query($sql) != true)
            {
                returnWithError($conn->error);
            }
            else
            {
                // Return with empty error, to signal successful edit
                returnWithError("");
            }
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
        die();
	}
