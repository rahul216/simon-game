let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;  // for keep tracking of computers turn . 
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector(".top-left");
const topRight = document.querySelector(".top-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click',(event)=>{
    if(strictButton.checked == true){
        strict = true;
    }
    else{
        strict = false;
    }
});
onButton.addEventListener('click',(event)=>{
    if(onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "-";
    }
    else{
        on = false;
        turnCounter.innerHTML ="";
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', (event)=>{
    if(on || win){
        play();
    }
});

function play(){
    win =false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn =1;
    turnCounter.innerHTML = 1;
    good = true;
    // filling the order of colors in random way
    for(let i =0; i<20; i++){
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    intervalId =  setInterval(gameTurn , 800);
}

function gameTurn(){
    on = false;

    if(flash == turn){
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if(compTurn){
        clearColor();
        setTimeout( ()=>{
            if (order[flash] == 1) {
                one();
            }
            if (order[flash] == 2) {
                two();
            }
            if (order[flash] == 3) {
                three();
            }
            if (order[flash] == 4) {
                four();
            }
            flash++;
        } , 200);
    }
}

function one(){
    if(noise){
        let audio = document.getElementById("sound1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundImage = "linear-gradient(to bottom right, #b4f7b4, #74d874)";
    
    
}
function two(){
    if(noise){
        let audio = document.getElementById("sound2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundImage = "linear-gradient(to bottom right, #FF6347, #FF4500)";
    
}
function three(){
    if(noise){
        let audio = document.getElementById("sound3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundImage = "linear-gradient(to bottom right, #FFFF00, #FFD700)";
    
}
function four(){
    if(noise){
        let audio = document.getElementById("sound4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundImage = "linear-gradient(to bottom right, #87CEEB, #5F9EA0)";
    
}

function clearColor() {
    topLeft.style.backgroundImage = "linear-gradient(rgb(83,170,82),rgb(48, 135, 48))";
    
    topRight.style.backgroundImage = "linear-gradient( rgb(130,69,69),rgb(150,67,66))";
    
    bottomLeft.style.backgroundImage = "linear-gradient( rgb(206,206,85),rgb(167,166,85))";
    
    bottomRight.style.backgroundImage = "linear-gradient(rgb(26,56,148),rgb(52,73,134))";
    

}
function flashColor() {
    topLeft.style.backgroundImage = "linear-gradient(to bottom right, #b4f7b4, #74d874)";
topRight.style.backgroundImage = "linear-gradient(to bottom right, #FF6347, #FF4500)";
bottomLeft.style.backgroundImage = "linear-gradient(to bottom right, #FFFF00, #FFD700)";
bottomRight.style.backgroundImage = "linear-gradient(to bottom right, #87CEEB, #5F9EA0)";
}

topLeft.addEventListener('click', (event)=>{
    if(on){
        playerOrder.push(1);
        check();
        one();
        if(!win){
            setTimeout( () =>{
                clearColor();
            }, 300);
        }
    }
})
topRight.addEventListener('click', (event)=>{
    if(on){
        playerOrder.push(2);
        check();
        two();
        if(!win){
            setTimeout( () =>{
                clearColor();
            }, 300);
        }
    }
})
bottomLeft.addEventListener('click', (event)=>{
    if(on){
        playerOrder.push(3);
        check();
        three();
        if(!win){
            setTimeout( () =>{
                clearColor();
            }, 300);
        }
    }
})
bottomRight.addEventListener('click', (event)=>{
    if(on){
        playerOrder.push(4);
        check();
        four();
        if(!win){
            setTimeout( () =>{
                clearColor();
            }, 300);
        }
    }
})

function check(){
    if(playerOrder[playerOrder.length -1] !== order[playerOrder.length -1]){
        good = false;
    }
    if(playerOrder.length ==20 && good){
        winGame();
    }
    if(good ==false){
        flashColor();
        turnCounter.innerHTML = "NO! you lost";
        setTimeout( () =>{
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict){
                play();
            }
            else{
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn , 800)
            }
        }, 1200);

        noise = false;
    }
    if(turn == playerOrder.length && good && !win){
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn , 800)
    }
}

function winGame(){
    flashColor();
    turnCounter.innerHTML =  "WOAH! YOU WIN!";
    on = false;
    winner = true;
}