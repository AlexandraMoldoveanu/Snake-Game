function Grid(lines = 3, columns = 3, refreshCallback) {
    
    this.lines = lines > 3? lines : 3;
    this.columns = columns >3? columns : 3;
    this.refreshCallback = refreshCallback;
}
Grid.prototype.initialize = function () {
    this.gameOver = false;
    this.harta = [];
    this.rama = []; //rama este un array de obiecte, unde un obiect repr o patratica, de ex o rama din 2 patratele[ {linie:2, coloana:2}, {linie:2, coloana:3}
    this.obiectiv = {}; //obiectivul este un obiect, unde un obiect repr o patratica, de ex un obiectiv{linie:2, coloana:3}
    this.initializeazaJoc();
    this.initializeazaObiectiv();
    this.currentDirection = "right";
    //this.showMap();
    this.refreshCallback(this);
}

Grid.prototype.initializeazaJoc = function () {
    for (var i = 0; i < this.lines; i++) {
        var line = [];
        for (var j = 0; j < this.columns; j++) {
            line.push(0);
        }
        this.harta.push(line);
    }
    var mijlocLinie = Math.floor(this.lines / 2);
    var nrColoaneRama = this.columns * 0.3;

    for (var i = 0; i < nrColoaneRama; i++){
        this.harta[mijlocLinie][i] = "x";
        this.rama.push({linie: mijlocLinie, coloana: i});
    }
}
//0-casuta libera; X-casuta ocupata de rama; !-casuta ocupata de obiectiv                                

Grid.prototype.initializeazaObiectiv = function () {
    var x = Math.floor(Math.random() * this.lines);//coordonata de linie a obiectivului

    var y = Math.floor(Math.random() * this.columns);//coordonata de coloana a obiectivului

    var hasFreeSpace = this.harta.some(function(arr){
        return arr.some(function(col){
            return  col === 0 ;
        });
    })
    if(hasFreeSpace){
        for (;
            this.harta[x][y] === "x" || this.harta[x][y] === "!" ;  //verific daca patratica cu coordonatele x, y este ocupata de rama ===conditia de cat timp continua loop
            x = Math.floor(Math.random() * this.lines), y = Math.floor(Math.random() * this.columns)) {
        }
        this.harta[x][y] = "!";
    }    
}

Grid.prototype.makeAMove = function (direction) {
    if(this.gameOver){
        return;
    }
    if (direction){
        this.currentDirection = direction;
    }
    var capDeRama = {};

    switch (this.currentDirection) {
        case 'right':
            capDeRama = this.createCoordonate( this.rama[this.rama.length - 1].coloana + 1,  this.rama[this.rama.length - 1].linie );           
             break;
        case 'left':
            capDeRama = this.createCoordonate( this.rama[this.rama.length - 1].coloana - 1,  this.rama[this.rama.length - 1].linie );  
             break;
        case 'up':
            capDeRama = this.createCoordonate( this.rama[this.rama.length - 1].coloana,    this.rama[this.rama.length - 1].linie - 1 );
            break;
        case 'down':
            capDeRama = this.createCoordonate( this.rama[this.rama.length - 1].coloana,    this.rama[this.rama.length - 1].linie + 1 );
             break;
     }
     if (capDeRama){
        if(this.harta[capDeRama.linie][capDeRama.coloana] !== "!"){
            var coadaRama = this.rama.shift();
            this.harta[coadaRama.linie][coadaRama.coloana] = 0;
        } else {
            this.initializeazaObiectiv(); 
        }

        this.rama.push(capDeRama);
        this.harta[capDeRama.linie][capDeRama.coloana] = "x"; 
       
        if(this.winGame()){
            this.gameOver = true;
        }
     }
     this.refreshCallback(this);
     //this.showMap();
}

Grid.prototype.winGame = function(){
    return this.harta.every(function(arr){
        return arr.every(function(col){
           return  col ==="x";
        });
    });
}

Grid.prototype.createCoordonate = function(coloana,linie){
    var result = {};
    result.linie = linie;
    result.coloana = coloana;
   
    if(result.linie < 0 || result.linie > this.lines - 1  || result.coloana < 0 || result.coloana > this.columns - 1){
        this.gameOver = true;
        return;
    }
    if(this.harta[result.linie][result.coloana] === "x"){
        this.gameOver = true;
        return;
    }

    return result;
}

Grid.prototype.showMap = function(){
    var result = "";
    for(var i=0; i<this.lines; i++){
        result += this.harta[i].join(" ") + "\n";        
    }
    console.log(result);
}




