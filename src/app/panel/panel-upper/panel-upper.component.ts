import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel-upper',
  templateUrl: './panel-upper.component.html',
  styleUrls: ['./panel-upper.component.scss']
})
export class PanelUpperComponent implements OnInit {

  @Input() nickname: string
  @Input() rank: string

  @Output() openSettings: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }


  openPopup(){
    this.openSettings.emit(null);
  }

}
