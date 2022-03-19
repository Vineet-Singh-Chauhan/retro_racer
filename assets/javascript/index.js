const screen = document.querySelector(".screen");
const carGame = document.querySelector(".carGame");
const road = document.querySelector(".road");
const scoreCard = document.querySelector(".scoreCard");
const start=document.querySelector(".start h2");
const car=document.querySelector(".car");
document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);
start.addEventListener("click",startGame);
let gameSpeed=5;



//-------------------------controls--------------------//
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
}
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    gamePlay();
    // console.log(keys)
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    gamePlay();

}

//------------------game start----------------------//
function lines(){
for(a=0;a<5;a++){

    let line=document.createElement("div");
    line.setAttribute("class","lines");
    line.y=(a*100);
    line.style.top=line.y+"px";
    road.appendChild(line);
}
    // console.log(document.querySelector(".lines").y)
    
    // window.requestAnimationFrame(moveLines);
    moveLines()

}


function moveLines(){
    // let gameSpeed=5;
    // console.log(window.innerHeight)
    document.querySelectorAll(".lines").forEach(function(e){
        if(e.y>parseInt(window.innerHeight)){
            e.y= -(500);
        }

        e.y+=gameSpeed;
       e.style.top=e.y+"px";
       
    // window.requestAnimationFrame(moveLines);

    })
    window.requestAnimationFrame(moveLines);
    
}

function startGame(){
    
    screen.classList.add("hide");
    screen.classList.remove("flex");
    // console.log(screen.classList);
    lines();
    let car=document.createElement("div");
    car.setAttribute("class","car");
    road.appendChild(car);
    // window.requestAnimationFrame(moveLines);
    for(a=0;a<5;a++){

        let enemyCar=document.createElement("div");
        enemyCar.setAttribute("class","enemyCar");
        enemyCar.y=(a*100);
        enemyCar.style.top=enemyCar.y+"px";
        enemyCar.style.left=Math.floor(Math.random()*400)+"px";
        road.appendChild(enemyCar);
        
    }
    
    //aVDHVH

    moveEnemy(car)
    // console.log(car)

}
function isCollide(car , b){
    // console.log(car)
    bRect = b.getBoundingClientRect();
    aRect = car.getBoundingClientRect();
    // console.log(aRect)
    // eRect= e.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}
function moveEnemy(car){


    // let gameSpeed=5;
    // console.log(window.innerHeight)
    let enemy=document.querySelectorAll(".enemyCar");
    // console.log(enemy)
    enemy.forEach(function(e){
        
        if(isCollide(car,e)){
            console.log("hello");
        }
        
        if(e.y>parseInt(window.innerHeight)){
            e.y= -(0);
    e.style.left=Math.floor(Math.random()*400)+"px";
    

        }

        e.y+=gameSpeed;
       e.style.top=e.y+"px";
       
    // window.requestAnimationFrame(moveLines);
    
    })
    window.requestAnimationFrame(moveEnemy);
    
}

//-----------------game play---------------------//
function gamePlay(){
const car=document.querySelector(".car");
const road = document.querySelector(".road");

   
    //------road boundaries------//
    roadLeft=road.offsetLeft;
    roadWidth=parseFloat(getComputedStyle(road).getPropertyValue('width'));
    roadRight=roadLeft + roadWidth ;
    roadTop=parseFloat(getComputedStyle(road).getPropertyValue('top'));
    roadHeight=parseFloat(getComputedStyle(road).getPropertyValue('height'));
    roadBottom=roadTop + roadHeight;
    // console.log(roadLeft);
    // console.log(roadRight);
    // console.log(roadTop);
    // console.log(roadBottom);
    

    //------------car Dimensions----------//
    carWidth=parseFloat(getComputedStyle(car).getPropertyValue('width'));
    carHeight=parseFloat(getComputedStyle(car).getPropertyValue('height'));


    // console.log(roadRight)
    y=car.offsetTop;
    x=car.offsetLeft;
    // console.log(car)
    // console.log(gameSpeed + "px")
    // console.log(road.width)
    // console.log(road.getBoundingClientRect());

    if(keys.ArrowUp  && y>roadTop+carHeight){
        y -= gameSpeed ;
        
        // console.log(y)
    }
    if(keys.ArrowDown && y<(roadBottom-2*carHeight)){
        y += gameSpeed ;
        // console.log(y)

    }
    if(keys.ArrowLeft && x>0){
        x -= gameSpeed;
    }
    if(keys.ArrowRight && (x<roadWidth-carWidth-10)){
        x += gameSpeed;
    }
    car.style.top=y+"px";
    car.style.left=x+"px";
    
    // window.requestAnimationFrame(gamePlay);

    
}



