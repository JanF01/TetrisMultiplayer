import { block } from './block.model'

export class blockS  extends block{

    constructor(){
        super([
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1]
            ],
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]
        ],0,"S")
    }

}