import { block } from './block.model'

export class blockT extends block{


    constructor(){
        super([[]],1,"T");
        this.top()
    }
    top(){
        this.blockArray = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    }

    right(){
        this.blockArray = [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ]
    }

    bottom(){
        this.blockArray = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    }

    left(){
        this.blockArray = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    }
}