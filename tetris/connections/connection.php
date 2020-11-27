<?php

$dbhost = "localhost";
$dbname = "multitetris";
$dbuser = "root";
$dbpassword = "";

try{
$db_connection = new PDO("mysql:host=".$dbhost.";dbname=".$dbname, $dbuser, $dbpassword);
}
catch(PDOException $e){
   echo "Błąd podczas łączenia się z bazą danych";
}

?>