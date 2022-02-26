class Wall{
    constructor(canvas){
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.x=this.canvas.width
        this.y=0
        this.width = 100
        this.height= 0
        this.gap = 0
        this.color = getRandomRGBColor()

    }
    draw(){

        //upper part
        this.context.fillStyle=this.color
        this.context.fillRect(this.x,this.y,this.width,this.height)
        //lower part
        this.context.fillRect(this.x,this.y + this.gap,this.width,this.canvas.height)
    }

}