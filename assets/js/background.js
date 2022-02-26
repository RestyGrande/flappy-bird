class Background{
constructor(src,canvas){
    this.src = src
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = 0
    this.y = 0
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.img=null
}
create(){
    this.img= new Image()
    this.img.src = this.src
 }  
 draw(){
    this.create()
 if(this.img != null){
    //console.log("draw background");
         this.context.drawImage(this.img,this.x,this.y,this.width,this.height)
 }

}
}