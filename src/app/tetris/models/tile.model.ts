import {block} from './block.model';
import {TetrisComponent} from '../tetris.component';
import { GameService } from 'src/app/game.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

export class Tile{
    tetromino: Array<Array<number>>
    color: string
    tetrominoN: number
    activeTetromino: any
    y: number
    x: number
    private gameService: GameService
    private userService: UserService
    ctx: CanvasRenderingContext2D
    ctx2: CanvasRenderingContext2D
    router: Router;
    constructor(tetromino, color, ctx,ctx2, gameService, router, userService){
        this.gameService = gameService;
        this.userService = userService
        this.tetromino = tetromino
        this.color = color
        this.ctx = ctx
        this.ctx2 = ctx2
        this.router = router;

        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN]

        this.x = 3;
        if (tetromino.type=="I"){
            this.y = -2;
        }
        else{
            this.y = -1;
        }
    }

    fill(color,dS: Function){
        for(let r=0; r<this.activeTetromino.length; r++){
            for(let c=0; c<this.activeTetromino.length; c++){
                if(this.activeTetromino[r][c]){
                    dS(this.x + c, this.y + r, color, this.gameService, this.ctx);
                }
            }
        }
    }

    draw(dS: Function){
        this.fill(this.color,dS);
    }

    drawShadow(dS: Function){
        let Ycopy = this.y;
        while(!this.collision(0,1,this.activeTetromino)){
            this.y++;
        }
        this.ctx.globalAlpha = 0.4;
        this.fill(this.color,dS);
        this.ctx.globalAlpha = 1;
        this.y = Ycopy;
    }

    unDraw(dS:Function){
        this.fill(this.gameService.emptyColor,dS);
    }

    unDrawShadow(dS: Function){
        let Ycopy = this.y;
        while(!this.collision(0,1,this.activeTetromino)){
            this.y++;
        }
        this.fill(this.gameService.emptyColor,dS);
        this.y = Ycopy;
    }

    moveDown(dS: Function, rT: Function, dB: Function, gS: Function){
        this.gameService.tileDistance++;
        if(!this.collision(0,1,this.activeTetromino)){
            this.unDraw(dS);
            this.unDrawShadow(dS);
            this.y++;
            this.drawShadow(dS);
            this.draw(dS);
        }
        else{
              this.lock(dS,dB,gS);
              this.gameService.tile = this.gameService.nextTile;
              this.gameService.nextTile = rT(this.gameService,this.ctx,this.ctx2, this.router, this.userService);
              this.gameService.newTileCreated();
        }
    }

    moveLeft(dS: Function){
        if(!this.collision(-1,0,this.activeTetromino)){
            this.unDraw(dS);
            this.unDrawShadow(dS);
            this.x--;
            this.drawShadow(dS);
            this.draw(dS);
        }
    }

    moveRight(dS: Function){
        if(!this.collision(1,0,this.activeTetromino)){
            this.unDraw(dS);
            this.unDrawShadow(dS);
            this.x++;
            this.drawShadow(dS);
            this.draw(dS);
        }
    }

    rotate(dS: Function){
        let nextPattern = this.tetromino[(this.tetrominoN+1)%this.tetromino.length];
        let move = 0;
    
        if(this.collision(0, 0, nextPattern)){
            if(this.x > this.gameService.column/2){
                move = -1;
            }
            else{
                move = 1;
            }
        }
    
        
        if(!this.collision(move,0,nextPattern)){
            this.unDraw(dS);
            this.unDrawShadow(dS);
            this.x += move;
            this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.drawShadow(dS);
            this.draw(dS);
        }
    }

    collision(x,y,tile){
        for(let r=0; r<tile.length; r++){
            for(let c=0; c<tile.length; c++){
                if(!tile[r][c]){
                    continue;
                }
    
                let newX = this.x + c + x;
                let newY = this.y + r + y;
    
                if(newX < 0 || newX >= this.gameService.column || newY >= this.gameService.row){
                    return true;
                }
                if(newY < 0){
                    continue;
                }
                if(this.gameService.board[newY][newX] != this.gameService.emptyColor){
                    return true;
                }
            }
        }
        return false;
    }

    lock(dS: Function, dB: Function, gS: Function){
        for(let r=0; r<this.activeTetromino.length; r++){
            for(let c=0; c<this.activeTetromino.length; c++){

                if(!this.activeTetromino[r][c]){
                    continue;
                }
                if(this.y + r < 0){
                    this.gameService.flags.gameOver = true;
             
                    gS(this.gameService,this.userService,this.ctx2,this.router);

                        if(this.gameService.guest){
                            setTimeout(()=>{
                                this.router.navigateByUrl("/login");
                            },1000);
                        }

                    break;
                }
                this.gameService.board[this.y+r][this.x+c] = this.color;
            }
            if(this.gameService.flags.gameOver){
                return;
            }
        }
        let fullRowCount = 0;
        for(let r=0; r<this.gameService.row; r++){
    
            let isRowFull = true;
            for(let c=0; c<this.gameService.column; c++){
                isRowFull = isRowFull && (this.gameService.board[r][c] !== this.gameService.emptyColor);
            }
            if(isRowFull){
                this.gameService.lines++;
                this.gameService.increseLevel();
                fullRowCount++;
                for(let y=r; y>1; y--){
                    for(let c=0; c<this.gameService.column; c++){
                        this.gameService.board[y][c] = this.gameService.board[y-1][c];
                    }
                }
    
                for(let c=0; c<this.gameService.column; c++){
                    this.gameService.board[0][c] = this.gameService.emptyColor;
                }
            }
        }
        if(fullRowCount > 0){
            this.gameService.rowScore(fullRowCount);
        }
        this.gameService.tileDropScore(this.gameService.tileDistance, this.gameService.flags.isHardDrop);
        this.gameService.tileDistance = 0;
        this.gameService.flags.isHardDrop = false;
        dB(this.gameService, dS, this.ctx);
    }
    
}