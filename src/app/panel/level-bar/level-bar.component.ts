import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-level-bar',
  templateUrl: './level-bar.component.html',
  styleUrls: ['./level-bar.component.scss']
})
export class LevelBarComponent implements OnInit {

  @Input() level: number;
  @Input() experience: number;
  @Input() theme: string;

  constructor() { }

  ngOnInit(): void {
  }

  getExperience(){
    return (Number)(this.experience);
  }

}
