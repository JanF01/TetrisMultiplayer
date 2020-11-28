import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from '../guard.service';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {



  public user: User
  public experiencePerc: number
  public settingsOpen: boolean = false
  public color: string = "Base";
  public theme: string = "White";
  public changingShortcut: Array<boolean> = [false,false,false];
  public userAbilities: any = {
       skip: 0,
       save: 0,
       destroy: 0
  }
  faTimes = faTimes;

  cookie: any

  abilitiesSub: Subscription;
  detailsSub: Subscription;
  cookieSub: Subscription;


  constructor(private guard: GuardService, private router: Router, private userService: UserService, private cookies: CookieService) { }


  @HostListener('window:keyup',['$event'])
  onKeyup(event:any){
    if(this.changingShortcut[0]){
      this.cookies.set("skip",String.fromCharCode(event.keyCode),365);
      this.changingShortcut[0] = false;
      this.userService.refreshCookies();
    }
    if(this.changingShortcut[1]){
      this.cookies.set("save",String.fromCharCode(event.keyCode),365);
      this.changingShortcut[1] = false;
      this.userService.refreshCookies();
 
    }
    if(this.changingShortcut[2]){
      this.cookies.set("destroy",String.fromCharCode(event.keyCode),365);
      this.changingShortcut[2] = false;
      this.userService.refreshCookies();
    }
  }


  ngOnInit(): void {
    if(!this.guard.logged){
          this.router.navigateByUrl("/");
    }else{
      this.detailsSub = this.userService.details.subscribe((det)=>{
        this.user = det;
      });
      this.cookieSub = this.userService.cookieObservable.subscribe((c)=>{
        this.cookie = c;
        this.color = this.cookie.background;
        this.theme = this.cookie.theme;
      })
      this.userService.getDetails();
      this.experiencePerc = this.userService.getExpPercentage();
      this.userService.userAbilities.subscribe((abs)=>{
            this.userAbilities=abs;
      })
      this.userService.getUserAbilities().subscribe();
      
      
      this.userService.refreshCookies();
    }

  }

  switchSettings(){
      this.settingsOpen = !this.settingsOpen;
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
  setTheme(){
    this.cookies.set("theme",this.theme);
    this.userService.refreshCookies();
  }
  setBackground(){
    this.cookies.set("background",this.color);
    this.userService.refreshCookies();
  }
  


}
