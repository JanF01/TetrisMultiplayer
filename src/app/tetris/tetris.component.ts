import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  const canvas = document.querySelector('.tetris');
const ctx = canvas.getContext('2d');
const canvas2 = document.querySelector('.gameStatus');
const ctx2 = canvas2.getContext('2d');

const row = 20;
const column = 10;
const sq = 30;
const emptyColor = "transparent";
let gameOver = false;
let gamePaused = false;
let lines = 0;
let tileDistance = 0;
let isHardDrop = false;

gameStatus(){
    const canvas2 = document.querySelector('.gameStatus');
    const ctx2 = canvas2.getContext('2d');
    if(gameOver){
        ctx2.font = "20px 'Press Start 2P'";
        ctx2.globalAlpha = 0.1;
        ctx2.fillRect(0,0,300,600);
        ctx2.globalAlpha = 1;
        ctx2.fillText("GAME OVER", 60, row*sq/2);
        return;
    }
    if(gamePaused){
        ctx2.font = "20px 'Press Start 2P'";
        ctx2.globalAlpha = 0.2;
        ctx2.fillRect(0,0,300,600);
        ctx2.globalAlpha = 1;
        ctx2.fillText("GAME PAUSED", 40, row*sq/2);
    }
    else{
        ctx2.clearRect(0,0,300,600);
    }
}

drawSquare(x, y, color){
    ctx.fillStyle = color;
    if(color == emptyColor){
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

let board = [];

for(r=0; r<row; r++){
    board[r] = [];
    for(c=0; c<column; c++){
        board[r][c] = emptyColor;
    }
}

drawBoard(){
    for(r=0; r<row; r++){
        for(c=0; c<column; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
}

drawBoard();

restart(){
    for(r=0; r<row; r++){
        board[r] = [];
        for(c=0; c<column; c++){
            board[r][c] = emptyColor;
        }
    }
    gameOver=false;
    lines=0;
    score=0;
    level=1;
    scr.innerHTML = "Score:&#10;"+score; 
    lin.innerHTML = "Lines:&#10;"+lines;
    lvl.innerHTML = "Level:&#10;"+level;
    time = {start: 0, elapsed: 0, level: 1000};
    tile = randomTile();
    tileDistance = 0;
    drawBoard();
    gameStatus();
    drop();
}

const tiles = [
    [Z, '#575fcf'],
    [S, '#ffcccc'],
    [T,'#ff4d4d'],
    [L,'#ffc048'],
    [J,'#fffa65'],
    [O,'#32ff7e'],
    [I,'#18dcff']
];
const numbers = ['0','1','2','3','4','5','6'];
let copy = [];






Tile.prototype.fill = function(color){
    for(r=0; r<this.activeTetromino.length; r++){
        for(c=0; c<this.activeTetromino.length; c++){
            if(this.activeTetromino[r][c]){
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

Tile.prototype.draw = function(){
    this.fill(this.color);
}

Tile.prototype.drawShadow = function(){
    let Ycopy = this.y;
    while(!this.collision(0,1,this.activeTetromino)){
        this.y++;
    }
    ctx.globalAlpha = 0.4;
    this.fill(this.color);
    ctx.globalAlpha = 1;
    this.y = Ycopy;
}

Tile.prototype.unDraw = function(){
    this.fill(emptyColor);
}

Tile.prototype.unDrawShadow = function(){
    let Ycopy = this.y;
    while(!this.collision(0,1,this.activeTetromino)){
        this.y++;
    }
    this.fill(emptyColor);
    this.y = Ycopy;
}

function randomTile(){
    if (copy.length < 1){
        copy = numbers.slice(0);
    }
    let r = copy[Math.floor(Math.random()*copy.length)];
    copy.splice(copy.indexOf(r),1);
    return new Tile (tiles[r][0], tiles[r][1]);
}

let tile = randomTile();

Tile.prototype.moveDown = function(){
    tileDistance++;
    if(!this.collision(0,1,this.activeTetromino)){
        this.unDraw();
        this.unDrawShadow();
        this.y++;
        this.drawShadow();
        this.draw();
    }
    else{
          this.lock();
          tile = randomTile();
    }
}

Tile.prototype.moveLeft = function(){
    if(!this.collision(-1,0,this.activeTetromino)){
        this.unDraw();
        this.unDrawShadow();
        this.x--;
        this.drawShadow();
        this.draw();
    }
}

Tile.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeTetromino)){
        this.unDraw();
        this.unDrawShadow();
        this.x++;
        this.drawShadow();
        this.draw();
    }
}

Tile.prototype.rotate = function(){
    let nextPattern = this.tetromino[(this.tetrominoN+1)%this.tetromino.length];
    let move = 0;

    if(this.collision(0, 0, nextPattern)){
        if(this.x > column/2){
            move = -1;
        }
        else{
            move = 1;
        }
    }

    
    if(!this.collision(move,0,nextPattern)){
        this.unDraw();
        this.unDrawShadow();
        this.x += move;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.drawShadow();
        this.draw();
    }
}

Tile.prototype.collision = function(x,y,tile){
    for(r=0; r<tile.length; r++){
        for(c=0; c<tile.length; c++){
            if(!tile[r][c]){
                continue;
            }

            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if(newX < 0 || newX >= column || newY >= row){
                return true;
            }
            if(newY < 0){
                continue;
            }
            if(board[newY][newX] != emptyColor){
                return true;
            }
        }
    }
    return false;
}

Tile.prototype.lock = function(){
    for(r=0; r<this.activeTetromino.length; r++){
        for(c=0; c<this.activeTetromino.length; c++){
            if(!this.activeTetromino[r][c]){
                continue;
            }
            if(this.y + r < 0){
                gameOver = true;
                gameStatus();
                break;
            }
            board[this.y+r][this.x+c] = this.color;
        }
        if(gameOver){
            return;
        }
    }
    let fullRowCount = 0;
    for(r=0; r<row; r++){

        let isRowFull = true;
        for(c=0; c<column; c++){
            isRowFull = isRowFull && (board[r][c] !== emptyColor);
        }
        if(isRowFull){
            lines++;
            increseLevel(lines);
            fullRowCount++;
            for(y=r; y>1; y--){
                for(c=0; c<column; c++){
                    board[y][c] = board[y-1][c];
                }
            }

            for(c=0; c<column; c++){
                board[0][c] = emptyColor;
            }
        }
    }
    if(fullRowCount > 0){
        rowScore(fullRowCount);
    }
    tileDropScore(tileDistance, isHardDrop);
    tileDistance = 0;
    isHardDrop = false;
    drawBoard();
}


document.addEventListener('keydown', control);

function control(event){
    if(event.keyCode == 82){
        restart();
    }
    if(gameOver){
        return;
    }
    if(event.keyCode == 27){
        if (gamePaused == false){
            gamePaused = true;
            gameStatus();
        }
        else{
            gamePaused = false;
            gameStatus();
            drop();
        }
    }
    if(gamePaused){
        return;
    }
    if(event.keyCode == 37){
        tile.moveLeft();
    }
    else if(event.keyCode == 38){
        tile.rotate();  
    }
    else if(event.keyCode == 39){
        tile.moveRight();
    }
    else if(event.keyCode == 40){
        tile.moveDown();
    }
    else if(event.keyCode == 32){
        isHardDrop = true;
        while(!tile.collision(0,1,tile.activeTetromino)){
            tile.moveDown();
        }
        tile.moveDown();
        tile.moveDown();   
    }

}

time = {start: 0, elapsed: 0, level: 1000};

function drop(now=0){
    time.elapsed = now - time.start;
    if(time.elapsed > time.level){
        tile.moveDown();
        time.start = now;
    }
    if(!gameOver && !gamePaused){
        requestAnimationFrame(drop);
    }
}
drop();
}
