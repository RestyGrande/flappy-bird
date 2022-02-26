class Score{
    constructor(canvas){
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.start = new Date()
        this.score = 0
        this.x=0
        this.y=0
    }

}
