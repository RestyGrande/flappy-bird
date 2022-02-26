class Score{
    constructor(canvas){
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.start = new Date()
        this.score = 0
        this.x=0
        this.y=0
    }
    draw(){
        let now = new Date()
        this.score = parseFloat((now - this.start) / 1000).toFixed(1)
        this.context.fillStyle = "#fff"
        this.context.font = 'bold 30px Verdana'
        this.context.fillText(this.score,this.x,this.y)
    }

}
