import { block } from './block.model'

export class blockS  extends block{

    constructor(){
        super([[]],0,"S")
        this.top()
    }
    top(){
        this.blockArray = [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ]
    }

    right(){
        this.blockArray = [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ]
    }

    bottom(){
        this.blockArray = [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ]
    }

    left(){
        this.blockArray = [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    }
}