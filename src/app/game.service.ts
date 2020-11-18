import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GameService {

  row: number = 20
  column: number = 10
  sq: number = 30
  lines: number = 0
  score: number = 0
  level: number = 1
  change = new Subject<string>()
  tileDistance: number = 0
  emptyColor: string = "transparent"
  flags = {
    gameOver: false,
    gamePaused: false,
    isHardDrop: false,
}
  board: Array<Array<string>> = [];
  copy: any = []
  tile: any

  tiles: Array<Array<any>> = [
    ['#575fcf'],
    ['#ffcccc'],
    ['#ff4d4d'],
    ['#ffc048'],
    ['#fffa65'],
    ['#32ff7e'],
    ['#18dcff']
]

  numbers: Array<string> = ['0','1','2','3','4','5','6']

  scores: Array<number> = [
    100,
    300,
    500,
    800
];

time: any = {start: 0, elapsed: 0, level: 1000}

constructor() {


}


rowScore(ln){
    this.score += this.scores[ln-1]*this.level;
    this.change.next("scr");
}

tileDropScore(tileDistance, isHardDrop){
    if(isHardDrop){
        this.score += tileDistance * 2;
    }
    else{
        this.score += tileDistance;
    }

}
increseLevel(){
  this.change.next("ln");
    if(this.level > 25){
        return;
    }
    if(this.lines%10 == 0){
        this.level++;
        this.time.level -= 40;
        this.change.next("lvl");
    }
}

}
