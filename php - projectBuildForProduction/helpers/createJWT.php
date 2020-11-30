<?php

 
   function createSignature($header,$payload){
      $signature = hash_hmac('sha256',$header.".".$payload,'onenicesecretCODE',true);
      $base64UrlSignature = str_replace(['+','/','='],['-','_',''],base64_encode($signature));
      return $base64UrlSignature;
    }

   function createJWT($id, $username,$nickname,$rank,$level,$experience,$money,$last_login){
   
      $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
      $issuedAt = time();
      $expirationTime = $issuedAt + 3600;
      $payload = json_encode([
       'id' => $id,
       'username' => $username,
       'nickname' => $nickname,
       'rank' => $rank,
       'level' => $level,
       'experience' => $experience,
       'money' => $money,
       'last_login' => $last_login,
       'exp' => $expirationTime,
        ]);

        $base64UrlHeader = str_replace(['+','/','='],['-','_',''], base64_encode($header));
        $base64UrlPayload = str_replace(['+','/','='],['-','_',''], base64_encode($payload));
        
        $base64UrlSignature = createSignature($base64UrlHeader,$base64UrlPayload);
        
        return $base64UrlHeader.".".$base64UrlPayload.".".$base64UrlSignature;
   }



?>