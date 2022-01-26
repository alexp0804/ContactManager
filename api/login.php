<?php

	$inData = getRequestInfo();

	$id = 0;

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
		$sql = "SELECT ID FROM USERS where USERNAME='" . $inData["username"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
            $sql = "SELECT ID FROM USERS where USERNAME='" . $inData["username"] . "' and PASSWORD='" . $inData["password"] . "'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0)
            {
                $row = $result->fetch_assoc();
                $id = $row["ID"];
                
                returnWithInfo($id);
            }
            else
            {
                returnWithError("Incorrect Password");
            }
		}
		else
		{
			returnWithError("Username does not exist");
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
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $id )
	{
		$retValue = '{"id":"' . $id . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>