import { block } from './block.model'

export class blockZ extends block{


    constructor(){
        super([[]],0,"Z")
        this.top()
    }
    top(){
        this.blockArray = [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    }

    right(){
        this.blockArray = [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ]
    }

    bottom(){
        this.blockArray = [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ]
    }

    left(){
        this.blockArray = [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ]
    }
}