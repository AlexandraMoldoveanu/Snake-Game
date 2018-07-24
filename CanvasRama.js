var canvas = document.querySelector('canvas');
var gameSize;
var message = document.getElementById("message");
var theInterval;
var joc1;
var isPaused = false;
var gridSize;
canvas.focus();
makeGrid(); 

// event listeners
document.getElementById("mySelect").addEventListener("change", function(){
    makeGrid() ;
})
document.getElementById("new").addEventListener("click",function(e){       
    setGameState(false);
    canvas.focus();        
})

canvas.addEventListener('keydown', function(e){
    switch (e.key){
        case "ArrowRight":
           joc1.currentDirection = "right";
            break;
        case "ArrowLeft":
           joc1.currentDirection = "left";
            break;
        case "ArrowUp":
            joc1.currentDirection = "up";
            break;
        case "ArrowDown":
            joc1.currentDirection = "down";
            break;
        case " ":           
            setGameState(!isPaused);
            break;            
    }
});

// function definitions
function refreshCanvas(joc) {
    var c = canvas.getContext('2d');
    for (var i = 0; i < joc.lines; i++) {
        for (var j = 0; j < joc.columns; j++) {
            switch (joc.harta[i][j]) {
                case 0:
                    c.fillStyle = "yellow";
                    break;
                case '!':
                    c.fillStyle = "red";;
                    break;
                case 'x':
                    c.fillStyle = "blue";
                    break;
            }
            c.fillRect(j * 50, i * 50, 49, 49);
        }
    }
}

function play(){
    joc1.makeAMove();    
    if (joc1.gameOver){
        if(joc1.winGame()){
            message.innerHTML = "You win!"
        }
        clearInterval(theInterval);
        message.innerHTML = "Game Over!"
    }
}

function setGameState(shouldPause){
    isPaused = shouldPause;
    if (theInterval){
    clearInterval(theInterval);
    }
    if (isPaused === false){
        theInterval = setInterval(play,1000);
    }
    message.innerHTML = "";
}
function makeGrid() {
    gameSize =  document.getElementById("mySelect").value;
    switch (gameSize) {
        case "small":
            gridSize = 6;
            break;
        case "medium":
            gridSize = 9;
            break;
        case "large":
            gridSize = 12;
            break;
    }
    canvas.width = 50 * gridSize;
    canvas.height = 50 * gridSize;
    joc1 = new Grid(gridSize,gridSize, refreshCanvas);    
    joc1.initialize();
    setGameState(true);
}