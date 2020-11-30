import { Injectable } from '@angular/core';
import { Subject, TimeoutError } from 'rxjs';
import { Tile } from './tetris/models/tile.model';

@Injectable()
export class GameService {


  newTile: Subject<Tile> = new Subject<Tile>();

  first: boolean = false;
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
  nextTile: any;

  savedTile: any = null;
  

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

  totalTime: number = 0;

  scores: Array<number> = [
    30,
    120,
    400,
    800
];

time: any = {start: 0, elapsed: 0, level: 1000}

skipBarStatus = 0;


guest: boolean = true;

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
    this.change.next("scr");
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

newTileCreated(){
  this.newTile.next(this.nextTile);
}

}
