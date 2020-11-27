import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from '../guard.service';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {


  public user: User
  public experiencePerc: number
  public settingsOpen: boolean = false
  public color: string = "base";
  public theme: string = "white";
  public changingShortcut: Array<boolean> = [false,false,false];
  faTimes = faTimes;

  cookie: Object


  constructor(private guard: GuardService, private router: Router, private userService: UserService, private cookies: CookieService) { }


  @HostListener('window:keyup',['$event'])
  onKeyup(event:any){
    if(this.changingShortcut[0]){
      this.cookies.set("skip",String.fromCharCode(event.keyCode));
      this.changingShortcut[0] = false;
      this.userService.refreshCookies();
      this.getCookie();
    }
    if(this.changingShortcut[1]){
      this.cookies.set("save",String.fromCharCode(event.keyCode));
      this.changingShortcut[1] = false;
      this.userService.refreshCookies();
      this.getCookie();
    }
    if(this.changingShortcut[2]){
      this.cookies.set("destroy",String.fromCharCode(event.keyCode));
      this.changingShortcut[2] = false;
      this.userService.refreshCookies();
      this.getCookie();
    }
  }


  ngOnInit(): void {
    if(!this.guard.logged){
          this.router.navigateByUrl("/");
    }else{
      this.user = this.userService.getDetails();
      this.experiencePerc = this.userService.getExpPercentage();
    }
    this.getCookie();
  }


  switchSettings(){
      this.settingsOpen = !this.settingsOpen;
  }

  getCookie(){
    this.cookie = this.userService.cookie;
  }

  
  setKeyOne($event){
    this.changingShortcut[0] = true;
  }

  setKeyTwo(){
    this.changingShortcut[1] = true;
  }

  setKeyThree(){
    this.changingShortcut[2] = true;
  }
  


}
