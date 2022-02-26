class WallFactory{
    constructor(canvas){
        this.canvas= canvas
        this.context = this.canvas.getContext('2d')
        this.gap = 250
        this.maxGap = 350
        this.frequency = 1500
        this.walls= []
    }
    generate(){
        setInterval(() => {
            let gap = getRandomInt(this.gap ,this.maxGap)
            let height =getRandomInt(0,this.gap)
            let wall = new Wall(this.canvas)
            wall.gap = gap
            wall.height=height
            this.walls.push(wall)
            console.log("gap",gap,"height",height);
           
        }, this.frequency);
    }
}