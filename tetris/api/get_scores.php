<?php

    require_once("../connections/connection.php");

    $sql = 'SELECT u.id, u.nickname, u.rank, u.level, ug.score FROM user u INNER JOIN user_has_game ON u.id=ug.user_id GROUP BY u.id'
    
    try{
        $stmt = $db_connection->prepare($sql);
        if($stmt){
            $result = $stmt->execute(array())
        }
    }
?>