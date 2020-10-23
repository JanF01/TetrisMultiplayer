class blockS{
    blockArray: Array<Array<number>>
    rotation: number

    constructor(){
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