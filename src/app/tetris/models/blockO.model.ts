class blockO{
    blockArray: Array<Array<number>>
    rotation: number

    constructor(){
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