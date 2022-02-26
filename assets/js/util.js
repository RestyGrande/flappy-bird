window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.msRequestAnimationFrame     ||
            function(callback){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  window.getRandomInt = function(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min)) + min
  }

  window.getRandomRGBColor = function(){
    let red = getRandomInt(0,257)
    let green = getRandomInt(0,257)
    let blue = getRandomInt(0,257)
  
    return `rgb(${red},${green},${blue})`
  }