<?php

    function updatePlacement($db_connection, $user_id){

        $sql="SELECT * FROM user_has_game WHERE user_id=:user_id";


        try{

            $stmt = $db_connection->prepare($sql);

            $result = $stmt->execute(array(
                'user_id' => $user_id,
            ));

            if($result){

                $best_scores = $stmt->fetchAll();

                $sumPoints = 0;
                for($i=0;$i<5;$i++){
                    $sumPoints+=$best_scores[$i]['score'];
                }

                $pp = floatval(round(floatval($sumPoints)/30,2));

                $sql="SELECT * FROM ranking_position WHERE user_id=:user_id";

                try{

                    $stmt = $db_connection->prepare($sql);
        
                    $stmt->execute(array(
                        'user_id' => $user_id,
                    ));
        
                    
                    $ranking_position = $stmt->fetch();


                    $sql = "SELECT * FROM ranking_position ORDER BY placement";

                    $stmt = $db_connection->prepare($sql);
        
                    $stmt->execute();

                    $all_ranking_positions = $stmt->fetchAll();

                    $placement=count($all_ranking_positions)+1;

                    if($ranking_position){
                        $placement = $ranking_position['placement'];
                    }

                    for($i=0;$i<count($all_ranking_positions);$i++){
                        if($pp>$all_ranking_positions[$i]['performance'] && $all_ranking_positions[$i]['user_id']!=$user_id){
                            $placement=$all_ranking_positions[$i]['placement'];
                            break;
                        }else if($all_ranking_positions[$i]['user_id']==$user_id){
                        break;
                        }
                    }

                    if(!$ranking_position){
                        $sql = "UPDATE ranking_position SET placement=placement+1 WHERE placement>=:new_placement";

                        $stmt = $db_connection->prepare($sql);
            
                        $stmt->execute(array(
                            'new_placement' => $placement
                        ));
                       
                    }else{
                        if($placement!=$ranking_position['placement']){
                            $sql = "UPDATE ranking_position SET placement=placement+1 WHERE placement<:old_placement AND placement>=:new_placement";

                            $stmt = $db_connection->prepare($sql);
                
                            $stmt->execute(array(
                                'old_placement' => $ranking_position['placement'],
                                'new_placement' => $placement
                            ));
                        }
                    }

                    if(!$ranking_position){
                        $sql="INSERT INTO ranking_position VALUES (null,:user_id,:pp,:placement)";

                        $stmt = $db_connection->prepare($sql);
        
                        $stmt->execute(array(
                            'user_id' => $user_id,
                            'pp' => $pp,
                            'placement' => $placement
                        ));

                        echo json_encode(['new_pp' => $pp]);
                    }else{
                        $sql="UPDATE ranking_position SET placement=:new_placement, performance=:pp WHERE user_id=:user_id";

                        $stmt = $db_connection->prepare($sql);
        
                        $stmt->execute(array(
                            'new_placement' => $placement,
                            'pp' => $pp,
                            'user_id' => $user_id
                        ));

                        echo json_encode(['new_pp' => $pp,'old_pp' => $ranking_position['performance']]);
                    }


                    


                }catch(PDOException $e){
                    echo "Błąd";
                }


            }

        }catch(PDOException $e){
            echo "Błąd";
        }

    }

?>