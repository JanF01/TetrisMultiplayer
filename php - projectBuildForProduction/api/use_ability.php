<?php

require_once("../connection.php");

if($json = file_get_contents("php://input")){

    $data = json_decode($json,true);

    if(isset($data['ability']) && isset($data['user_id'])){

        $sql = 'SELECT * FROM user_has_abilities WHERE user_id=:user_id AND abilities_id=:ability_id';

        try{
            $stmt = $db_connection->prepare($sql);

            if($stmt){

                $result = $stmt->execute(array(
                    'user_id' => $data['user_id'],
                    'ability_id' => $data['ability']
                ));

                if($result){
                    $ability = $stmt->fetch();
                    if($ability['amount']>1){

                        $sql = 'UPDATE user_has_abilities SET amount=amount-1 WHERE user_id=:user_id AND abilities_id=:ability_id';

                        $stmt = $db_connection->prepare($sql);

                        $stmt->execute(array(
                            'user_id' => $data['user_id'],
                            'ability_id' => $data['ability']
                        ));

                    }else{

                        $sql = 'DELETE FROM user_has_abilities WHERE user_id=:user_id AND abilities_id=:ability_id';

                        $stmt = $db_connection->prepare($sql);

                        $stmt->execute(array(
                            'user_id' => $data['user_id'],
                            'ability_id' => $data['ability']
                        ));

                    }
                }


            }
        }catch(PDOException $e){
            echo "Error";
        }

    }


}

?>
