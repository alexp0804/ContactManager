<?php
    // Get contact info from front-end
    $inData = getRequestInfo();
    
    $userID = $inData["ID"];

	$serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "Group1Team";
    $dbName = "COP4331";

	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dbName);

	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
    else
    {
        $sql = "SELECT * FROM CONTACTS WHERE USERID='$userId'";

        if ($result = $conn->query($sql); != TRUE)
        {
           returnWithError($conn->error);
        }
        else
        {
            // Get all matching contacts
            $contacts = fetch_all(MYSQLI_ASSOC); 
            $result->free_result();

            sendResultInfoAsJson($contacts);
        }
    }

    $conn->close();

	function returnWithError($err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
?>
