import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from '../guard.service';
import { User } from '../models/User';
import { UserService } from '../user.service';

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

  constructor(private guard: GuardService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if(!this.guard.logged){
          this.router.navigateByUrl("/");
    }else{
      this.user = this.userService.getDetails();
      this.experiencePerc = this.userService.getExpPercentage();
    }
  }


  openSettings(){
      this.settingsOpen = true;
  }
  


}
