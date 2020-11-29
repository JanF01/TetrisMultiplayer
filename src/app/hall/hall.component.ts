import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {

  scores: Array<any>
  constructor(private admin: AdministrationService) { }

  ngOnInit(): void {
    this.admin.getScores().subscribe((e)=>{this.scores=e});
  }

}
