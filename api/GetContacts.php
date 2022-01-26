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
        $result = $conn->query($sql);

        if ($result->num_rows > 0)
        {
            $contacts = [];

            while($row = $result->fetch_assoc() == true)
            {
                $contacts[] = $row;
            }
            sendResultInfoAsJson($contacts);
        }
        else
        {
            returnWithError("No records found");
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
