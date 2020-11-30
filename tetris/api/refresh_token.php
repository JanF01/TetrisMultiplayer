<?php

   require_once("../connections/connection.php");
   require_once("../models/user.php");
   require_once("../helpers/createJWT.php");

   if($json = file_get_contents("php://input")){

        $data = json_decode($json,true);

        if(isset($data['user_id'])){

            
            $sql = "SELECT id, username, email, nickname, rank, level, experience, money, last_login FROM user WHERE id=:user_id";

            try{
               $stmt = $db_connection->prepare($sql);

               if($stmt){
                 $result =  $stmt->execute(array(
                     "user_id" => $data['user_id']
                  ));


                  if($result){

                         $user = $stmt->fetch();

                         $jwt = createJWT($user['id'], $user['username'], $user['nickname'],$user['rank'], $user['level'], $user['experience'], $user['money'], $user['last_login']);
 
                         $response = array('token' => $jwt);
                         echo json_encode($response);

                     }

                  }else{
                     $error = $stmt->errorInfo();
                     echo json_encode("There was a problem while refreshing");
                  }
               }catch(PDOException $e){
                 echo json_encode("There was a problem while refreshing");
            }
        }
    }

  ?>