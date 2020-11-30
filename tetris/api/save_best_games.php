<?php 

require_once("../connections/connection.php");
require_once("insert_new_game.php");
require_once("update_placement.php");

if($json = file_get_contents("php://input")){

    $data = json_decode($json,true);

    if(isset($data['user_id']) && isset($data['score'])){

           $sql="SELECT * FROM user_has_game WHERE user_id=:user_id";
           
           try{
            $stmt = $db_connection->prepare($sql);

            if($stmt){
                $result = $stmt->execute(array(
                    'user_id' => $data['user_id']
                ));

                if($result){
                    $best_scores = $stmt->fetchAll();

                    if(count($best_scores)<5){
                        insertNewGame($db_connection,$data['user_id'],$data['score']);
                        updatePlacement($db_connection,$data['user_id']);
                    }else if(count($best_scores)==5){

                            $which = -1;
                            $points = $data['score'];

                            for($i=0;$i<5;$i++){
                                if($best_scores[$i]['score']<$points){
                                    $points = $best_scores[$i]['score'];
                                    $which = $best_scores[$i]['game_id'];
                                }
                            }

                            if($which!=-1){
                                $sql = "DELETE FROM game WHERE id=:id";

                                $stmt = $db_connection->prepare($sql);

                                $stmt->execute(array(
                                    'id' => $which
                                ));

                                if($stmt){
                                    insertNewGame($db_connection,$data['user_id'],$data['score']);
                                    updatePlacement($db_connection,$data['user_id']);
                                }
                        }else{
                            echo json_encode("No improvement");
                        }

                    }

                }
            }

           }catch(PDOException $e){
               echo "Błąd";
           }


    }



}


?>
