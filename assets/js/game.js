const INITIAL= 1
const GAME_PLAYING=2
const GAME_OVER = 3
const KEY_CODE={
r:82,
space:32
}
class Game{
    constructor(canvas){
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.currentState = INITIAL
        this.bindEvent = this.bindEvents()
        this.background1 =null
        this.background2 =null
        this.velocity = 3
        this.score= null
        this.wallFactory=null
        this.canvas.width=900
        this.canvas.height=600
        this.canvas.style.width=900;
        this.canvas.style.height=600;

        this.createObject =  this.createObj()
    }
    start(){
      window.requestAnimationFrame(()=>{
          this.run()
      })
    }
    run(){
      this.getCurrentState(this.currentState)
      this.start()
    }
    drawInitialScreen(){

        this.context.fillStyle="BLACK"
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.context.fillStyle="#fff"
        this.context.font = "20px Arial"
        this.context.fillText("CLICK TO START",this.canvas.width / 2 - 90, this.canvas.height / 2)
    }
    drawGamePlaying(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.background1.draw()
    this.background2.draw()
    this.drawBackgroundLoop(this.background1)
    this.drawBackgroundLoop(this.background2)
    this.drawWall()
    this.score.draw()
    this.bird.draw()
    this.checkCollision()
   

    }
    checkCollision(){
      let wallList = this.wallFactory.walls
      wallList.map(wall=>{
        console.log(wall);
        if(this.isCollided(this.bird,wall)){
          this.currentState = GAME_OVER
        }
      })
    }
    isCollided(bird,wall){
      let isCollided = true
      //bird coordinate
      let birdTop = bird.y
      let birdBottom= bird.y + bird.height
      let birdRight = bird.x + bird.width
      let birdLeft= bird.x
      //wall coordinate
      let wallTop = wall.y + wall.height+ wall.gap
      let wallBottom= wall.y + wall.height
      let wallRight = wall.x + wall.width
      let wallLeft= wall.x

      if((birdBottom < wallTop && birdTop > wallBottom)
       || (birdLeft > wallRight)
       || (birdRight < wallLeft)){
        isCollided = false
      }

      return isCollided
    }
    drawWall(){
      let wall = this.wallFactory.walls
      wall.map(w=>{
        w.draw()
        w.x = w.x - this.velocity
       
      })
      this.removeExtraWall()
    }
    removeExtraWall(){
      let wall = this.wallFactory.walls
      wall.map(w=>{
      if(w.x + w.w <0){
        w.shift()
      }
       
      })
    }
    drawBackgroundLoop(background){
      if(Math.abs(background.x) > this.canvas.width){
        background.x = this.canvas.width - this.velocity
      }
      background.x = background.x - this.velocity
    }
    drawGameOver(){
      this.context.fillStyle="BLACK"
      this.context.fillRect(0,0,this.canvas.width,this.canvas.height)
      this.context.fillStyle="#fff"
      this.context.font = "40px Arial"
      this.context.fillText("GAME OVER :(  ",this.canvas.width / 2 - 150, this.canvas.height / 2 - 50) 
      this.context.font = "20px Arial"
      this.context.fillText(`Your Score:  ${this.score.score}`,this.canvas.width / 2 - 90, this.canvas.height / 2) 
      this.context.font = "9px Arial"
      this.context.fillText("Press R to Restart",this.canvas.width / 2 - 60, this.canvas.height / 2 +20)   
    }
    getCurrentState(state){
      if(state === INITIAL){
        this.drawInitialScreen()
      }
      else if(state === GAME_PLAYING){
        this.drawGamePlaying()
      }
      else if(state === GAME_OVER){
        this.drawGameOver()
      }
      else{
        console.log("Error: Current State not found");
      }


    }
    setCurrentState(state){
      if(state === INITIAL){
        this.currentState = GAME_PLAYING 
        this.wallFactory.generate()
      }
      else if(state === GAME_PLAYING){
        this.bird.vy = -1 * this.velocity
      }
      else if(state === GAME_OVER){
        this.currentState = GAME_PLAYING
      }
      else{
        console.log("Error: Cant set current state ");
      }
    }
    reset(){
      this.score.start = new Date()
      this.score.score = 0
      this.wallFactory.walls = []
      this.bird.x = 115
      this.bird.y = 115

    }
    bindEvents(){
      console.log("game starting");
      this.canvas.addEventListener('click',(e)=>{
        console.log(e);
        this.setCurrentState(this.currentState)
      })

      window.addEventListener('keydown',(e)=>{
             if(e.keyCode === KEY_CODE.r){
               this.reset()
              this.setCurrentState(GAME_OVER)
             }
             if(e.keyCode === KEY_CODE.space){
              this.bird.vy = -1 * this.velocity
             }
          })
          
    }
    createObj(){
      this.background1 = new Background('./assets/images/back.png',this.canvas)
      this.background2 = new Background('./assets/images/back.png',this.canvas)
      this.background2.x = this.canvas.width

      this.score = new Score(this.canvas)
      this.score.x = this.canvas.width - 100
      this.score.y = 50 

      this.wallFactory = new WallFactory(this.canvas)
   

      this.bird = new Bird('./assets/images/bird2.png',this.canvas)
      
    }

}
