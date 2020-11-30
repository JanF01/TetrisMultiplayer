<?php

    function insertNewGame($db_connection, $user_id,$score){

        $sql = "INSERT INTO game_history VALUES (null)";

        $stmt = $db_connection->prepare($sql);

        $stmt->execute();

        $history_id = $db_connection->lastInsertId();

        $sql = "INSERT INTO game VALUES (null,:game_time,:user_id,:opponent_id,:game_history)";


        try{

            $stmt = $db_connection->prepare($sql);

            $result = $stmt->execute(array(
                'game_time' => date("Y-m-d H:i:s"),
                'user_id' => $user_id,
                'opponent_id' => 0,
                'game_history' => $history_id
            ));

            if($result){
                $game_id = $db_connection->lastInsertId();

                $sql = "INSERT INTO user_has_game VALUES (null, :user_id, :game_id, :score, :win)";

                $stmt = $db_connection->prepare($sql);

                
                    $result = $stmt->execute(array(
                        'user_id' => $user_id,
                        'game_id' => $game_id,
                        'score' => $score,
                        'win' => 1
                    ));




            }

        }catch(PDOException $e){
            echo "Błąd";
        }

    }

?>