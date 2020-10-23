export class block{
    blockArray: Array<Array<number>>
    rotation: number
    type: string

    constructor(blockArray,rotation,type){
        this.blockArray = blockArray
        this.rotation = rotation
        this.type = type;
    }

}