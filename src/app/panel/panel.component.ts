import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from '../guard.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {


  constructor(private guard: GuardService, private router: Router) { }

  ngOnInit(): void {
    if(!this.guard.logged){
          this.router.navigateByUrl("/");
    }
  }
  


}
