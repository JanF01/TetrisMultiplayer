import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel-upper',
  templateUrl: './panel-upper.component.html',
  styleUrls: ['./panel-upper.component.scss']
})
export class PanelUpperComponent implements OnInit {

  public editing: boolean = false
  public imgPath: string = 'assets/edit'
  public newNickname: string = ''

  @Input() nickname: string
  @Input() rank: string
  @Input() theme: string

  @Output() sendNickname: EventEmitter<string> = new EventEmitter<string>();

  @Output() openSettings: EventEmitter<any> = new EventEmitter<any>();

  @Output() startGame: EventEmitter<any> = new EventEmitter<any>();


  constructor() {}

  ngOnInit(): void {
    this.imgPath+=this.theme+'.png'
  }

  changeNickname(){
    if(this.editing){
      this.sendNickname.emit(this.newNickname);
    }
    this.editing = !this.editing;
    this.imgPath = this.editing ? 'assets/done.png' : 'assets/edit'+this.theme+'.png';
  }

  openPopup(){
    this.openSettings.emit(null);
  }

  startAGame(){
    this.startGame.emit(null);
  }

}
