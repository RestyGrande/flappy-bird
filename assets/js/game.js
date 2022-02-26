const INITIAL= 1
const GAME_PLAYING=2
const GAME_OVER = 3
const KEY_CODE={
r:82
}
class Game{
    constructor(canvas){
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.currentState = INITIAL
        this.bindEvent = this.bindEvents()
        this.background1 =null
        this.background2 =null
        this.createObject=this.createObj()
        this.velocity = 3
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
        this.context.font = "10px Arial"
        this.context.fillText("CLICK TO START",this.canvas.width / 2 - 40, this.canvas.height / 2)
    }
    drawGamePlaying(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)

    this.background1.draw()
    this.background2.draw()
    this.drawBackgroundLoop(this.background1)
    this.drawBackgroundLoop(this.background2)
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
      this.context.font = "13px Arial"
      this.context.fillText("GAME OVER :(",this.canvas.width / 2 - 40, this.canvas.height / 2) 
      this.context.font = "9px Arial"
      this.context.fillText("Press R to Restart",this.canvas.width / 2 - 32, this.canvas.height / 2 +20)   
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
      }
      else if(state === GAME_PLAYING){
      //  this.currentState = GAME_OVER
      }
      else if(state === GAME_OVER){
        this.currentState = GAME_PLAYING
      }
      else{
        console.log("Error: Cant set current state ");
      }
    }
    bindEvents(){
      console.log("game starting");
      this.canvas.addEventListener('click',(e)=>{
        console.log(e);
        this.setCurrentState(this.currentState)
      })

      window.addEventListener('keydown',(e)=>{
             if(e.keyCode === KEY_CODE.r){
              this.setCurrentState(GAME_OVER)
             
             }
             console.log(e.keyCode);
          })
          
    }
    createObj(){
      this.background1 = new Background('./assets/images/back.png',this.canvas)
      this.background2 = new Background('./assets/images/back.png',this.canvas)
      this.background2.x = this.canvas.width
    }

}
