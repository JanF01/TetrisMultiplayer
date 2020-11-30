<?php

$dbhost = "mysql01.oktikkx.beep.pl";
$dbname = "tetris";
$dbuser = "headadmin";
$dbpassword = "marchew";

try{
$db_connection = new PDO("mysql:host=".$dbhost.";dbname=".$dbname, $dbuser, $dbpassword);
}
catch(PDOException $e){
   echo "Błąd podczas łączenia się z bazą danych".$e;
}

?>