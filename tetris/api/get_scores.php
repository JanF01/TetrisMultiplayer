<?php

    require_once("../connections/connection.php");

    $sql = 'SELECT u.nickname, u.rank, u.level, r.performance, r.placement FROM user u INNER JOIN ranking_position ON u.id=r.user_id ORDER BY r.placement';
    
    try{
        $stmt = $db_connection->prepare($sql);
        if($stmt){
            $result = $stmt->execute(array());

            if($result){
                $rows = $stmt->fetchAll();
                return json_encode($rows);
            }
        }
    }
    catch(PDOExeption $e){
        
    }
?>