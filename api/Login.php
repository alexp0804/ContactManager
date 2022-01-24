
<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");    

    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }

    $login = $inData['login'];
    $password = $inData['password'];

    $stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login = '$login' AND Password = '$password'");
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc())
    {
        returnWithInfo($row['firstName'], $row['lastName'], $row['ID']);
    }
    else
    {
        returnWithError("No Records Found");
    }

    $stmt->close();
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
    
    function returnWithInfo($firstName, $lastName, $id)
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson($retValue);
    }
