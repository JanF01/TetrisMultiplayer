import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit {

  @Input() title: string
  @Input() key: string
  @Input() image: string
  @Input() price: number
  @Input() unlock: number
  @Input() level: number


  constructor() { }

  ngOnInit(): void {
  }

}
