<?php

class User {
    public $id;
    public $username;
    public $nickname;
    public $email;
    public $rank;
    public $level;
    public $experience;
    public $money;
    public $last_login;

    public function __construct($id, $username, $nickname, $rank, $level, $experience,$money, $last_login){
        $this->id = $id;
        $this->username = $username;
        $this->nickname = $nickname;
        $this->rank = $rank;
        $this->level = $level;
        $this->experience = $experience;
        $this->money = $money;
        $this->last_login = $last_login;
    }
}

?>