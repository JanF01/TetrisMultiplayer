import {block} from './block.model';

class Tile{
    tetromino: block
    color: string
    tetrominoN: number
    activeTetrmino: 
    constructor(tetromino, color){
        this.tetromino = tetromino;
        this.color = color;

        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];

        this.x = 3;
        if (this.tetromino.type=="I"){
            this.y = -2;
        }
        else{
            this.y = -1;
        }
    }

    
}