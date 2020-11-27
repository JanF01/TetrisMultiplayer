import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';

import { Tile } from './models/tile.model'


import { blockI } from './models/blockI.model'
import { blockJ } from './models/blockJ.model'
import { blockL } from './models/blockL.model'
import { blockO } from './models/blockO.model'
import { blockS } from './models/blockS.model'
import { blockT } from './models/blockT.model'
import { blockZ } from './models/blockZ.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})

export class TetrisComponent{

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private canvas2: HTMLCanvasElement
  private ctx2: CanvasRenderingContext2D
  private canvas3: HTMLCanvasElement
  private ctx3: CanvasRenderingContext2D
  private skipBar: HTMLElement
  private scr: HTMLElement
  private ln: HTMLElement
  private lvl: HTMLElement
  private now: number = 0

  private scoreSub:Subscription
  private newTileSub: Subscription

  stop: boolean = false;


  constructor(private gameService: GameService,private router: Router) {
   }

  startGame(): void{

     (document.getElementsByClassName('container')[0] as HTMLElement).style.display="flex";
     (document.getElementsByClassName('stats')[0] as HTMLElement).style.display="inline-block";
     (document.getElementsByClassName('start')[0] as HTMLElement).style.display="none";
     document.getElementById("tutorial").style.display = "none";

    this.canvas = document.querySelector('.tetris')
    this.ctx = this.canvas.getContext('2d')
    this.canvas2 = document.querySelector('.gameStatus')
    this.ctx2 = this.canvas2.getContext('2d')
    this.canvas3 = document.querySelector('.nextTile')
    this.ctx3 = this.canvas3.getContext('2d')
    this.skipBar = document.getElementsByClassName('skipBar')[0] as HTMLElement;

    this.prepareBoard();

    if(!this.gameService.first){
    this.drawBoard();
    
    this.gameService.tiles[0].unshift(new blockI());
    this.gameService.tiles[1].unshift(new blockJ());
    this.gameService.tiles[2].unshift(new blockL());
    this.gameService.tiles[3].unshift(new blockO());
    this.gameService.tiles[4].unshift(new blockS());
    this.gameService.tiles[5].unshift(new blockT());
    this.gameService.tiles[6].unshift(new blockZ());
    this.gameService.first=true;
    }

    this.gameService.newTile.subscribe(tile=>{
        this.drawNextTile(tile);
    });

    this.gameService.skipBarStatus=0; 

    this.scr = document.querySelector('.score')
    this.ln = document.querySelector('.lines')
    this.lvl = document.querySelector('.level')
    this.gameService.flags.gameOver=false;
    this.gameService.flags.gamePaused=false;
    this.gameService.flags.isHardDrop=false;

    this.gameService.nextTile = this.randomTile();
    this.gameService.tile = this.randomTile();

    this.gameService.newTileCreated();

    this.scoreSub = this.gameService.change.subscribe((value) => {
        switch(value){
            case 'scr':
                this.scr.innerHTML = "Score:&#10;"+this.gameService.score
             break;
             case 'ln':
                this.ln.innerHTML = "Lines:&#10;"+this.gameService.lines
             break;
             case 'lvl':
                this.lvl.innerHTML = "Level:&#10;"+this.gameService.level
             break;
             default:
                 console.log("ERROR")
        }
      });


      setTimeout(()=>{
        this.drop();
      },1000);


  }


  gameStatus(gameService = this.gameService, ctx2 = this.ctx2, router = this.router): void{

    if(gameService.flags.gameOver){
        ctx2.font = "35px 'Manrope'";
        ctx2.globalAlpha = 0.3;
        ctx2.fillRect(0,0,300,600);
        ctx2.globalAlpha = 1;
        ctx2.fillStyle = "#FFFFFF";
        ctx2.fillText("GAME OVER", 60, gameService.row*gameService.sq/2);
        setTimeout(()=>{
        router.navigateByUrl("/login")
        },1500);
        return;
    }
    if(gameService.flags.gamePaused){
        ctx2.font = "35px 'Manrope'";
        ctx2.fillStyle = "#FFFFFF";
        ctx2.globalAlpha = 0.2;
        ctx2.fillRect(0,0,300,600);
        ctx2.globalAlpha = 1;
        ctx2.fillText("GAME PAUSED", 40, gameService.row*gameService.sq/2);
    }
    else{
        ctx2.clearRect(0,0,300,600);
    }
}


skipBarRise(status: number){
    if(status<=100){
   this.skipBar.style.width=(status*3+3)+"px";
    }else{
        this.skipBar.style.background="rgba(21, 103, 216, 1)";
        this.skipBar.style.boxShadow="0 0 0.15em 0.1em rgb(37, 133, 241)";
    }
}


drawNextTile(tile: Tile){
    this.gameService.skipBarStatus+=10; 
    this.skipBarRise(this.gameService.skipBarStatus);
    for(let r=0; r<6; r++){
        for(let c=0; c<8; c++){
            this.drawSquare(c,r,this.gameService.emptyColor,this.gameService,this.ctx3);
        }
    }
    for(let r=0; r<tile.activeTetromino.length; r++){
        for(let c=0; c<tile.activeTetromino.length; c++){
            if(tile.activeTetromino[r][c]){
                this.drawSquare(tile.x + c - 3, tile.y + r + 3, tile.color, this.gameService, this.ctx3);
            }
        }
    }
}

switchBlocks(){
    this.gameService.tile = this.gameService.nextTile;
    this.gameService.nextTile = this.randomTile();
    this.drawNextTile(this.gameService.nextTile);
}

drawSquare(x, y, color, gameService = this.gameService, ctx = this.ctx): void{
    let sq = gameService.sq;
    ctx.fillStyle = color;
    if(color == gameService.emptyColor){
        ctx.clearRect(x*sq,y*sq,sq,sq);
        // ctx.strokeStyle = "black";
        // ctx.strokeRect(x*sq,y*sq,sq,sq);
    }
    else{
        ctx.fillStyle = color;
        ctx.fillRect(x*sq,y*sq,sq,sq);
        // ctx.strokeStyle = "black";
        // ctx.strokeRect(x*sq,y*sq,sq,sq);
    }
}


prepareBoard(): void{
    for(let r=0; r<this.gameService.row; r++){
        this.gameService.board[r] = [];
        for(let c=0; c<this.gameService.column; c++){
            this.gameService.board[r][c] = this.gameService.emptyColor;
        }
    }
}


drawBoard(gameService = this.gameService, drawSquare = this.drawSquare, ctx = this.ctx): void{
    for(let r=0; r<gameService.row; r++){
        for(let c=0; c<gameService.column; c++){
            drawSquare(c,r,gameService.board[r][c],gameService,ctx);
        }
    }
}

restart(): void{
    this.gameService.flags.gameOver=false;
    this.gameService.lines=0;
    this.gameService.score=0;
    this.gameService.level=1;
    this.scr.innerHTML = "Score:&#10;"+this.gameService.score; 
    this.ln.innerHTML = "Lines:&#10;"+this.gameService.lines;
    this.lvl.innerHTML = "Level:&#10;"+this.gameService.level;
    this.gameService.time = {start: 0, elapsed: 0, level: 1000};
    this.gameService.tile = this.randomTile();
    this.gameService.tileDistance = 0;
    this.drawBoard();
    this.gameStatus();
    this.drop();
}



    randomTile(gameService = this.gameService, ctx = this.ctx, ctx2 = this.ctx2, router = this.router): Tile{
        if (gameService.copy.length < 1){
            gameService.copy = gameService.numbers.slice(0);
        }
        let r = gameService.copy[Math.floor(Math.random()*gameService.copy.length)];
        gameService.copy.splice(gameService.copy.indexOf(r),1);
        return new Tile (gameService.tiles[r][0].blockArray, gameService.tiles[r][1], ctx, ctx2, gameService, router);
    }



control(event): void{
    if(event.keyCode == 82){
        this.restart();
    }
    if(this.gameService.flags.gameOver){
        return;
    }
    if(event.keyCode == 27){
        if (this.gameService.flags.gamePaused == false){
            this.gameService.flags.gamePaused = true;
            this.gameStatus();
        }
        else{
            this.gameService.flags.gamePaused = false;
            this.gameStatus();
            this.drop();
        }
    }
    if(this.gameService.flags.gamePaused){
        return;
    }
    if(event.keyCode == 37){
        this.gameService.tile.moveLeft(this.drawSquare);
    }
    else if(event.keyCode == 38){
        this.gameService.tile.rotate(this.drawSquare);  
    }
    else if(event.keyCode == 39){
        this.gameService.tile.moveRight(this.drawSquare);
    }
    else if(event.keyCode == 40){
        this.gameService.tile.moveDown(this.drawSquare, this.randomTile, this.drawBoard, this.gameStatus);
    }
    else if(event.keyCode == 32){
        this.gameService.flags.isHardDrop = true;
        while(!this.gameService.tile.collision(0,1,this.gameService.tile.activeTetromino)){
            this.gameService.tile.moveDown(this.drawSquare, this.randomTile, this.drawBoard, this.gameStatus);
        }
        this.gameService.tile.moveDown(this.drawSquare, this.randomTile, this.drawBoard, this.gameStatus);
        this.gameService.tile.moveDown(this.drawSquare, this.randomTile, this.drawBoard, this.gameStatus);
    }
    else if(event.keyCode == 78){
        if(this.gameService.skipBarStatus>=100){
        this.gameService.skipBarStatus = 0;
        this.switchBlocks();
        this.drawBoard();
        }
    }

}

fps: number = 1000/60;

drop(gameService = this.gameService, now=0): void{
    gameService.time.elapsed = now - gameService.time.start;
    if(gameService.time.elapsed > gameService.time.level){
        gameService.tile.moveDown(this.drawSquare, this.randomTile, this.drawBoard, this.gameStatus);
        gameService.time.start = now;
    }
    if(!gameService.flags.gameOver && !gameService.flags.gamePaused){
        requestAnimationFrame(()=>{this.drop(this.gameService,now+this.fps*this.map(gameService.time.level,0,1000,5,1));});
    }
}

  map(value, in_min, in_max, out_min, out_max):number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

}
