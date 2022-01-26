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

    $sql = "SELECT * FROM CONTACTS WHERE USERID='$userId'";
    $result = $conn->query($sql);
    
    // Get all matching contacts
    $contacts = mysqli_fetch_all($result, MYSQLI_ASSOC); 

    echo json_encode($contacts);

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
?>
