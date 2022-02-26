class Bird{
    constructor(src,canvas){
        this.src=src
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.x = 112
        this.y = 112
        this.width = 112
        this.height = 112
        this.vy = 0
        this.g = 0.20
        this.frame = 0 
        this.img=null

    }
    create(){
        this.img= new Image()
        this.img.src = this.src
     }  
     draw(){
        this.create()
     if(this.img != null){
         this.vy = this.vy + this.g
         this.y = this.y + this.vy
           
         if(this.y + this.height > this.canvas.height  ){
            this.y = this.canvas.height  - this.height
            this.vy = 0
         }else if(this.y < 0 ){
             this.y=0
             this.vy =0

         }
             this.context.drawImage(this.img,this.frame*112,0,112,112,this.x,this.y,this.width,this.height)
             this.frame++
             this.frame%=3
           
     }
    }
    
    }