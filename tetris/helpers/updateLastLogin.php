<?php


  function updateLastLogin($username, $datetime){

  require("../connections/connection.php");
          
  $sql = "UPDATE user SET last_login = :date_time WHERE username=:user_name";
  
  try{
      $stmt = $db_connection->prepare($sql);
       $stmt->execute(array(
          "date_time" => $datetime,
          "user_name" => $username
       ));   
  }catch(PDOException $e){
      echo json_encode("Wystąpił błąd: ".$e);
  }



  }

?>