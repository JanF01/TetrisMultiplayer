import { Component, OnInit } from '@angular/core';
import { GuardService } from './guard.service';
import { User } from './models/User';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { AdministrationService } from './administration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'multiTetris';
  constructor(private guard: GuardService, private router: Router, private cookies: CookieService, private user: UserService, private admin: AdministrationService){

  }
  ngOnInit(){

    this.isLoggedIn();
  }


  isLoggedIn(){
    if(this.guard.loggedIn()){
 
         this.router.navigateByUrl("/panel");
         this.guard.updateUserDetails();

         this.user.refreshCookies();
    }
  }

  logOut(){
    this.guard.logOut();
  }

  getLoginStatus(){
    return this.guard.logged;
  }


}
