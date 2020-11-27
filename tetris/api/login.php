<?php

   require_once("../connections/connection.php");
   require_once("../models/user.php");
   require_once("../helpers/createJWT.php");
   require_once("../helpers/updateLastLogin.php");

  if($json = file_get_contents("php://input")){

     $data = json_decode($json,true);
     

     if(isset($data['pass']) && isset($data['username'])){
            
            $sql = "SELECT id, username, password, email, nickname, rank, level, experience, money FROM user WHERE BINARY username = BINARY :user_name";

            try{
               $stmt = $db_connection->prepare($sql);
               if($stmt){
                 $result =  $stmt->execute(array(
                     "user_name" => $data['username']
                  ));
                  if($result){
                     $user_for_check = $stmt->fetch();

                     if(!$user_for_check){
                        echo json_encode("The user doesn't exist");
                        exit;
                     }

                     $last_login = date("Y-m-d H:i:s");
                     $hashed_password = $user_for_check['password'];

                     if(password_verify($data['pass'],$hashed_password)){

                         $user = new User($user_for_check['id'],
                         $user_for_check['username'],
                         $user_for_check['nickname'],
                         $user_for_check['rank'],
                         $user_for_check['level'],
                         $user_for_check['experience'],
                         $user_for_check['money'],
                         $last_login);

                         updateLastLogin($user->username,$user->last_login);

                         $jwt = createJWT($user->id, $user->username, $user->nickname,$user->rank, $user->level, $user->experience, $user->money, $user->last_login);
 
                         $response = array('token' => $jwt);
                         echo json_encode($response);

                     }else{
                        echo json_encode("Wrong password"); 
                     }

                  }else{
                     $error = $stmt->errorInfo();
                     echo json_encode("There was a problem while logging in");
                  }
               }
            }catch(PDOException $e){
                 echo json_encode("There was a problem while logging in");
            }
     }

  }else{
     echo json_encode("There was a problem while logging in");
  }

  ?>