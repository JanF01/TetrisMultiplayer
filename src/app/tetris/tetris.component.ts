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
import { User } from '../models/User';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';

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
  private canvas4: HTMLCanvasElement
  private ctx4: CanvasRenderingContext2D
  private skipBar: HTMLElement
  private scr: HTMLElement
  private ln: HTMLElement
  private lvl: HTMLElement
  private now: number = 0

  private scoreSub:Subscription
  private newTileSub: Subscription

  userDetails: User;
  userAbilities: any;




  stop: boolean = false;


  detailsSub: Subscription
  absSub: Subscription
  cookieSub: Subscription

  cookie: any

  constructor(private gameService: GameService,private router: Router, private userService: UserService, private cookies: CookieService) {

      this.detailsSub = this.userService.details.subscribe((det)=>{
             this.userDetails = det;
      })

      this.absSub = this.userService.userAbilities.subscribe((abs)=>{
          this.userAbilities = abs;
    })

      this.cookieSub = this.userService.cookieObservable.subscribe((c)=>{
           this.cookie = c;
      })

   }

  startGame(): void{

     

     (document.getElementsByClassName('container')[0] as HTMLElement).style.display="flex";
     (document.getElementsByClassName('stats')[0] as HTMLElement).style.display="inline-block";
     (document.getElementsByClassName('start')[0] as HTMLElement).style.display="none";
     if(this.gameService.guest){
     document.getElementById("tutorial").style.display = "none";

     }else{
         this.userService.getDetails();
         this.userService.getAbilities();
         this.userService.refreshCookies();
         this.canvas4 = document.querySelector('.savedTile')
          this.ctx4 = this.canvas4.getContext('2d')
     }

    this.canvas = document.querySelector('.tetris')
    this.ctx = this.canvas.getContext('2d')
    this.canvas2 = document.querySelector('.gameStatus')
    this.ctx2 = this.canvas2.getContext('2d')
    this.canvas3 = document.querySelector('.nextTile')
    this.ctx3 = this.canvas3.getContext('2d');
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


  isGuest(): boolean{
      return this.gameService.guest;
  }

  gameStatus(gameService = this.gameService, userService = this.userService, ctx2 = this.ctx2, router = this.router): void{

    if(gameService.flags.gameOver){
        ctx2.fillStyle = "#000000";
        ctx2.font = "32px 'Manrope'";
        ctx2.globalAlpha = 0.72;
        ctx2.fillRect(0,0,300,600);
        ctx2.globalAlpha = 1;
        ctx2.fillStyle = "#FFFFFF";
        ctx2.textAlign= "center";
        ctx2.fillText("GAME OVER", gameService.column*gameService.sq/2, gameService.row*gameService.sq/2-180);

        if(!gameService.guest){

            userService.backToPanel=true;


            let expNow = userService.getUserExp();
            let expForNext = userService.getNextLevelExp();
            let exp = Math.round(gameService.score/41);

            let money = Math.round(gameService.score/28);

            userService.moneyChange(money);

            let level = userService.getUserLevel(expNow,expForNext,exp);
     
            ctx2.fillText("SCORE: "+gameService.score, gameService.column*gameService.sq/2, gameService.row*gameService.sq/2-120);
            ctx2.fillText("MONEY: "+money, gameService.column*gameService.sq/2, gameService.row*gameService.sq/2-60);
            ctx2.fillText("LEVEL: "+level, gameService.column*gameService.sq/2, gameService.row*gameService.sq/2);
            ctx2.fillText("+"+exp+"EXP", gameService.column*gameService.sq/2, gameService.row*gameService.sq/2+60);

            userService.saveGameIfBetter(gameService.score).subscribe((res)=>{

                if(res=="NO PERFORMANCE IMPROVEMENT"){
                ctx2.font = "17px 'Manrope'";
                ctx2.fillText(res, gameService.column*gameService.sq/2, gameService.row*gameService.sq/2+120);
                }else{
                    ctx2.font = "17px 'Manrope'";
                    ctx2.fillText("PERFORMANCE IMPROVED", gameService.column*gameService.sq/2, gameService.row*gameService.sq/2+120);
                    ctx2.font = "24x 'Manrope'";
                    if(res.old_pp){
                    ctx2.fillText(res.old_pp+"PP"+" -> "+res.new_pp+"PP", gameService.column*gameService.sq/2, gameService.row*gameService.sq/2+170);
                    }else{
                    ctx2.fillText(res.new_pp, gameService.column*gameService.sq/2, gameService.row*gameService.sq/2+170); 
                    }
                }

                gameService.score=0;
            });



        }


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

canGoToPanel(){
    return this.userService.backToPanel;
}

goToPanel(){
    this.userService.backToPanel=false;
    this.router.navigateByUrl("panel");
}



destroy(){
    let startRow = 0;
    for(let r=0; r<this.gameService.row; r++){
        for(let c=0; c<this.gameService.column; c++){
            if(this.gameService.board[r][c] != this.gameService.emptyColor){
                startRow=r;
                break;
            }
        }
        if(startRow!=0){
            break;
        }
    }
    for(let r=startRow; r<startRow+2; r++){
        for(let c=0; c<this.gameService.column; c++){
            this.gameService.board[r][c] = this.gameService.emptyColor;
        }
    }

}


skipBarRise(status: number){
    if(status<100){
   this.skipBar.style.width=(status*3+3)+"px";
   this.skipBar.style.background="rgba(21, 93, 201, 0.475)";
   this.skipBar.style.boxShadow="none";
    }else if(status==100){
        this.skipBar.style.width=(status*3+3)+"px";
        this.skipBar.style.background="rgba(21, 103, 216, 1)";
        this.skipBar.style.boxShadow="0 0 0.15em 0.1em rgb(37, 133, 241)";
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

drawSavedTile(tile:Tile){
    this.gameService.skipBarStatus+=10; 
    this.skipBarRise(this.gameService.skipBarStatus);
    for(let r=0; r<6; r++){
        for(let c=0; c<8; c++){
            this.drawSquare(c,r,this.gameService.emptyColor,this.gameService,this.ctx4);
        }
    }
    for(let r=0; r<tile.activeTetromino.length; r++){
        for(let c=0; c<tile.activeTetromino.length; c++){
            if(tile.activeTetromino[r][c]){
                this.drawSquare(c, r, tile.color, this.gameService, this.ctx4);
            }
        }
    }
}

switchBlocks(){
    this.gameService.tile = this.gameService.nextTile;
    this.gameService.nextTile = this.randomTile();
    this.drawNextTile(this.gameService.nextTile);
}

saveBlock(){
    if(this.gameService.savedTile==null){
        this.gameService.savedTile = this.gameService.tile;
        this.gameService.tile = this.gameService.nextTile;
        this.gameService.nextTile = this.randomTile();
        this.drawNextTile(this.gameService.nextTile);
        this.drawSavedTile(this.gameService.savedTile);
    }else{
        let tile =  this.gameService.savedTile;
        this.gameService.savedTile = this.gameService.tile;
        this.gameService.tile = tile;
        this.drawSavedTile(this.gameService.savedTile);
    }
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



    randomTile(gameService = this.gameService, ctx = this.ctx, ctx2 = this.ctx2, router = this.router, userService = this.userService): Tile{
        if (gameService.copy.length < 1){
            gameService.copy = gameService.numbers.slice(0);
        }
        let r = gameService.copy[Math.floor(Math.random()*gameService.copy.length)];
        gameService.copy.splice(gameService.copy.indexOf(r),1);
        return new Tile (gameService.tiles[r][0].blockArray, gameService.tiles[r][1], ctx, ctx2, gameService, router, userService);
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
    else if(event.keyCode == 78 && this.gameService.guest){
        if(this.gameService.skipBarStatus>=100){
        this.gameService.skipBarStatus = 0;
        this.switchBlocks();
        this.drawBoard();
        }
    }
    else if(!this.gameService.guest && this.gameService.skipBarStatus>=100){
        if(event.keyCode == this.cookie.keyOne.charCodeAt(0)){
            if(this.userAbilities.skip>0){
                this.userService.useAbility("skip").subscribe();
                this.gameService.skipBarStatus = 0;
                this.switchBlocks();
                this.drawBoard();
            }
        }
        else if(event.keyCode == this.cookie.keyTwo.charCodeAt(0)){
         if(this.userAbilities.save>0){
            this.userService.useAbility("save").subscribe();;
            this.gameService.skipBarStatus = 0;
            this.saveBlock();
            this.drawBoard();
         }
      }
      else if(event.keyCode == this.cookie.keyThree.charCodeAt(0)){
          if(this.userAbilities.destroy>0){
            this.userService.useAbility("destroy").subscribe();;
        this.gameService.skipBarStatus = 0;
        this.destroy();
        this.drawBoard();
          }
     }
    }

}

fps: number = 1000/60;

drop(gameService = this.gameService, now=0): void{
    gameService.time.elapsed = now - gameService.time.start;
    gameService.totalTime+=1000/60;
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
