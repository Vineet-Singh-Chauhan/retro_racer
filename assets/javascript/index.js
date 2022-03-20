const screen = document.querySelector(".screen");
const carGame = document.querySelector(".carGame");
const road = document.querySelector(".road");
const scoreCard = document.querySelector(".scoreCard");
let start=document.querySelector(".screen h2");
const car=document.querySelector(".car");
document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);
start.addEventListener("click",startGame);
const gameAudio = new Audio('../assets/audio/gameaudio.wav');

let gameSpeed=5;
let score=0;
let gametoggler=true;


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
    if(gametoggler){
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
}

function startGame(){
    gametoggler=true;
    score=0;
    gameAudio.loop=true;
    gameAudio.play();
console.log(gameAudio)    
    screen.classList.add("hide");
    screen.classList.remove("flex");
    scoreCard.classList.add("flex");
    scoreCard.classList.remove("hide");
    // console.log(screen.classList);
    lines();
    let car=document.createElement("div");
    car.setAttribute("class","car");
    road.appendChild(car);
    // window.requestAnimationFrame(moveLines);
    for(a=0;a<5;a++){

        let enemyCar=document.createElement("div");
        enemyCar.setAttribute("class","enemyCar");
        enemyCar.y=(-a*100);
        enemyCar.style.top=enemyCar.y+"px";
        enemyCar.style.backgroundColor=randomColor();
        enemyCar.style.left=Math.floor(Math.random()*400)+"px";
        road.appendChild(enemyCar);
        
    }
    
    //Random-color
    function randomColor(){
        function c(){
            let hex= Math.floor(Math.random()*256).toString(16);
            return ("0"+String(hex)).substr(-2);
        }
        return "#"+c()+c()+c();
    }

    moveEnemy(car)
    // console.log(car)

}
function endGame(){
    gametoggler=false;
    gameAudio.pause();
const collideAudio = new Audio('../assets/audio/collideaudio.mp3');
    collideAudio.play();

    screen.innerHTML=`<h1>Game Over</h1>
    <h3>Your Final Score is:${score}</h3><h2>
    Click Here To Restart The Game</h2>`;
    screen.classList.add("flex");
    screen.classList.remove("hide");
   road.innerHTML="";
   let start=document.querySelector(".screen h2");
start.addEventListener("click",startGame);
scoreCard.classList.add("hide");
scoreCard.classList.remove("flex");



}
function isCollide(car , b){
    // console.log(car)
    aRect = document.querySelector(".car").getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    // console.log(aRect)
    // eRect= e.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}
function moveEnemy(){

    if(gametoggler){
    // let gameSpeed=5;
    // console.log(window.innerHeight)
    let enemy=document.querySelectorAll(".enemyCar");
    // console.log(enemy)

    enemy.forEach(function(e){
        // const car=document.querySelector(".car")

        if(isCollide(car,e)){
            // console.log("hello");
            // gametoggler=false;
            // console.log(gametoggler);
            endGame();
        
        }
        
        if(e.y>parseInt(window.innerHeight)){
            e.y= -(00);
    e.style.left=Math.floor(Math.random()*400)+"px";
    

        }

        e.y+=gameSpeed;
       e.style.top=e.y+"px";
       
    // window.requestAnimationFrame(moveLines);
    
    })
    // window.requestAnimationFrame(moveEnemy(car));

    //---------------------score------------------------------//
    // console.log(score++);
    score++;
    scoreCard.innerHTML=`<h2>Score : ${score}</h2>`;
    window.requestAnimationFrame(moveEnemy);

}
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