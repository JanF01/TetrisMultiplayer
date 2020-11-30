<?php

require_once("../connection.php");

if($json = file_get_contents("php://input")){

    $data = json_decode($json,true);

    if(isset($data['user_id']) && isset($data['level']) && isset($data['exp']) && isset($data['rank']) && isset($data['nickname']) && isset($data['money'])){


        $sql = "UPDATE user SET level=:new_level, experience=:new_exp, rank=:new_rank, nickname=:new_nickname, money=:new_money WHERE id=:user_id";

        try{
            $stmt = $db_connection->prepare($sql);

            $stmt->execute(array(
                'new_level' => $data['level'],
                'new_exp' => $data['exp'],
                'new_rank' => $data['rank'],
                'new_nickname' => $data['nickname'],
                'new_money' => $data['money'],
                'user_id' => $data['user_id']

            ));

        }catch(PDOException $e){
            echo json_encode("błąd");
        }

    }


}



?>