import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class AbilitiesComponent implements OnInit {

  @Input() skip: string
  @Input() save: string
  @Input() destroy: string

  cookie: any ={
    theme: 'White',
    background: 'Base'
  }

  cookieSub: Subscription

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.cookieSub = this.userService.cookieObservable.subscribe((c)=>{
      this.cookie = c;
    })

    this.userService.refreshCookies();

  }

}
