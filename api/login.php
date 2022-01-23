<?php

	$inData = getRequestInfo();
	
	$id = 0;

	$conn = new mysqli("localhost", "root", "Group1Team", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT ID FROM Users where Login='" . $inData["username"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
            $sql = "SELECT ID FROM Users where Login='" . $inData["username"] . "' and Password='" . $inData["password"] . "'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0)
            {
                $row = $result->fetch_assoc();
                $id = $row["ID"];
                
                returnWithInfo($id);
            }
            else
            {
                returnWithError("Password incorrect");
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