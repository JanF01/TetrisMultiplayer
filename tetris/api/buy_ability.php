<?php

require_once("../connections/connection.php");

if($json = file_get_contents("php://input")){

    $data = json_decode($json,true);

    if( isset($data['ability']) && isset($data['user_id']) ){

   
        $sql = "SELECT * FROM abilities WHERE name=:ability_name";

        try{
            $stmt = $db_connection->prepare($sql);

            $result = $stmt->execute(array(
                'ability_name' => $data['ability'] 
            ));

            if($result){

                $ability = $stmt->fetch();

                $sql = "UPDATE user SET money=money-:price WHERE id=:id";
                  
                $stmt = $db_connection->prepare($sql);

                $stmt->execute(array(
                    'price' => $ability['price'],
                    'id' => $data['user_id']
                ));

                $sql = "SELECT * FROM user_has_abilities WHERE user_id=:user_id AND abilities_id=:abilities_id";

                 
                    try{

                        $stmt = $db_connection->prepare($sql);

                        $stmt->execute(array(
                                'user_id' => $data['user_id'],
                                'abilities_id' => $ability['id'],

                            ));


                            $user_has_ability = $stmt->fetch();
                            
                            if(!$user_has_ability){

                                    $sql = 'INSERT INTO user_has_abilities (id, user_id, abilities_id, amount) VALUES (null, :user_id,:abilities_id,:amount)';
                                    
                                    
                                        $stmt = $db_connection->prepare($sql);
                    
                                        $result = $stmt->execute(array(
                                            'user_id' => $data['user_id'],
                                            'abilities_id' => $ability['id'],
                                            'amount' => 1
                                        ));
                    
                                        if($result){
                                            
                                            echo json_encode('Dodano');

                                        }

                                    exit;
                                 }else{

                                    $sql = 'UPDATE user_has_abilities SET amount=amount+:amount WHERE user_id=:user_id AND abilities_id=:abilities_id';
                    
                        
                                    $stmt = $db_connection->prepare($sql);

                                    $result = $stmt->execute(array(
                                        'user_id' => $data['user_id'],
                                        'abilities_id' => $ability['id'],
                                        'amount' => 1
                                    ));

                                    if($result){
                                        echo json_encode('Dodano');
                                    }
                                }

                        
                        }catch(PDOException $e){
                            echo json_encode("Błąd");
                        }
                  
                }

                }catch(PDOException $e){
                    echo json_encode("Błąd");
                }

            }else{
                echo json_encode("Błąd");
            }
        }






?>