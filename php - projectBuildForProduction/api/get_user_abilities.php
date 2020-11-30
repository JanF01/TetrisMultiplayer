<?php

require_once("../connection.php");


    if(isset($_GET['user_id'])){

    $sql = 'SELECT a.name as ability, u.amount as amount FROM user_has_abilities as u INNER JOIN abilities as a ON u.abilities_id=a.id WHERE user_id=:user_id';
    
    try{
        $stmt = $db_connection->prepare($sql);
        if($stmt){
            $result = $stmt->execute(array(
                'user_id' => $_GET['user_id']
            ));

            if($result){
                $rows = $stmt->fetchAll();
                echo json_encode($rows);
            }
        }
    }
    catch(PDOExeption $e){
        echo json_encode("Błąd"); 
    }

}
?>