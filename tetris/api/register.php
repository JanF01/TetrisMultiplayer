<?php

   require_once("../connection.php");
   require_once("../models/user.php");
   require_once("../helpers/createJWT.php");

  if($json = file_get_contents("php://input")){

     $data = json_decode($json,true);

     
     if(isset($data['nickname']) && isset($data['email']) && isset($data['username']) && isset($data['pass'])){
            
            $sql = "SELECT username FROM user WHERE BINARY username = BINARY :user_name";

            try{
               $stmt = $db_connection->prepare($sql);
               if($stmt){
                 $result =  $stmt->execute(array(
                     "user_name" => $data['username']
                  ));
                  if($result){
                     
                    $user_for_check = $stmt->fetch();

                     if($user_for_check){
                        echo json_encode("The username has been taken");
                        exit;
                     }

                     createUser($db_connection, $data['username'],$data['pass'], $data['nickname'], $data['email']);

                  }else{
                     $error = $stmt->errorInfo();
                     echo json_encode("There was a problem while registering");
                  }
               }
            }catch(PDOException $e){
                 echo json_encode("There was a problem while registering");
            }

          }else{
            echo json_encode("There was a problem while registering");
         }

  }else{
     echo json_encode("There was a problem while registering");
  }



   function createUser($db_connection, $username,$password, $nickname, $email){

    $sql = "INSERT INTO user (id, username, password, email, nickname, rank, level, experience, money, last_login)
     VALUES (null,:user_name,:user_password,:email,:nickname,:rank,:level,:experience,:money,:last_login)";

    try{
       $stmt = $db_connection->prepare($sql);

       $password = password_hash($password,PASSWORD_DEFAULT);
       $last_login = date("Y-m-d H:i:s");

       if($stmt){
         $result =  $stmt->execute(array(
             "user_name" => $username,
             "user_password" => $password,
             "email" => $email,
             "nickname" => $nickname,
             "rank" => "em1",
             "level" => 12,
             "experience" => 34000,
             "money" => 3000,
             "last_login" => $last_login
          ));

          if($result){

         $id = $db_connection->lastInsertId();
         
          $user = new User(
            $id,
            $username,
           $nickname,
           "em1",
            12,
            34000,
            3000,
            $last_login);

          $jwt = createJWT($user->id, $user->username, $user->nickname,$user->rank, $user->level, $user->experience, $user->money, $user->last_login);
 
          $response = array('token' => $jwt);
          echo json_encode($response);
          }
          
       }
    }catch(PDOException $e){
         echo "There was a problem while registering";
    }


   }


  ?>