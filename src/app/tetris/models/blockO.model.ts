import { block } from './block.model'

export class blockO  extends block{

    constructor(){
        super([[]],0,"O")
        this.top()
    }
    top(){
        this.blockArray = [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ]
    }
}