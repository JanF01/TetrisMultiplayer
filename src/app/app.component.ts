import { Component, OnInit } from '@angular/core';
import { GuardService } from './guard.service';
import { User } from './models/User';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'multiTetris';
  constructor(private guard: GuardService, private router: Router){

  }
  ngOnInit(){

    this.isLoggedIn();
  }


  isLoggedIn(){
    if(this.guard.loggedIn()){
 
         this.router.navigateByUrl("/panel");

    }
  }

  logOut(){
    this.guard.logOut();
  }

  getLoginStatus(){
    return this.guard.logged;
  }


}
