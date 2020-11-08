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
  user: User;
  constructor(private guardService: GuardService, private router: Router){

  }
  ngOnInit(){
    this.guardService.verifyUser().subscribe((data: string)=>{
      const res = JSON.parse(data)
       if(res!="No user"){
         this.user = new User(res.login,res.nickname,res.rank,res.level,res.experience,res.money);
         this.router.navigateByUrl("/panel");
       }
    });
  }
}
