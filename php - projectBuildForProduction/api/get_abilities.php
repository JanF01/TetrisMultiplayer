<?php

require_once("../connection.php");


$sql = "SELECT * FROM abilities";

try{
    $stmt = $db_connection->prepare($sql);

    $result = $stmt->execute();

    if($result){

        $return_array = $stmt->fetchAll();

        echo json_encode($return_array);


    }else{
        echo json_encode("Błąd");
    }
}catch(PDOException $e){
    echo json_encode("Błąd");
}


?>