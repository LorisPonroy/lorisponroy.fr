class Individu{
	fitness;
	x;
	y;
	genome = [];
	step;
	enVie;
	couleur;
	constructor(){
		this.x = 1;
		this.y = 1;
		this.fitness = 0;
		this.step = 0;
		for(var i = 0;i<200	;i++){
			this.genome[i] = getRandomInt(4) + 1;
		}
		this.enVie = true;
		this.couleur = '#'+Math.floor(Math.random()*16777215).toString(16);
	}
	calculerFitness(){
		var distance = Math.sqrt((18.5-this.x)*(18.5-this.x) + (18.5-this.y)*(18.5-this.y));
		var fit = (1/distance) + (1/this.step)*0.001;
		if(fit>this.fitness)
			this.fitness = fit;
	}
}

function reproduire(individu1,individu2){
	var individu = new Individu();
	for(var i =0;i<individu.genome.length;i+=2){
		try{
			individu.genome[i] = individu1.genome[i];
			individu.genome[i+1] = individu2.genome[i+1];
		}catch(e){

		}
	}
	return individu;
}
function muter(individu){
	for (var i = 0; i < individu.genome.length; i++) {
		if(Math.random()<probaMutation){
			individu.genome[i] = getRandomInt(4) + 1;
		}
	}
}
function genererMap(){
	var canvas = document.getElementById("carre"); 
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "white"
	ctx.lineWidth="2";   
	ctx.fillRect(0,0,500,500);
	ctx.stroke();
	for(var i =0;i<20;i++){
		for(var j=0;j<20;j++){
			map[i][j] = (Math.random()>probaApparitionMur ? 1:0);
			if(i==1&&j==1){
				map[i][j] = "D";
				tracerCarre(i*25,j*25);
			}
			if(i==18&&j==18){
				map[i][j] = "A";
				tracerCarre(i*25,j*25);
			}
			if(map[i][j]==1){
				tracerCarre(i*25,j*25);
			}
		}
	}
	console.log(map);
}
function dessinerMap(){
	var canvas = document.getElementById("carre"); 
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "white"
	ctx.lineWidth="2";   
	ctx.fillRect(0,0,500,500);
	ctx.stroke();
	for(var i =0;i<20;i++){
		for(var j=0;j<20;j++){
			if(i==1&&j==1){
				tracerCarre(i*25,j*25);
			}
			if(i==18&&j==18){
				tracerCarre(i*25,j*25);
			}
			if(map[i][j]==1){
				tracerCarre(i*25,j*25);
			}
		}
	}
}
function tracerCarre(x,y){
	var canvas = document.getElementById("carre"); 
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.strokeStyle="black";
	if(x/25==1 && x==y){
		ctx.fillStyle = "red"
	}
	else if(x/25==18 && x==y){
		ctx.fillStyle ="green";	
	}else{
		ctx.fillStyle = "black";
	}
	ctx.lineWidth="2";   
	ctx.fillRect(x,y,20,20);
	ctx.stroke();
}
function start(){
	probaMutation = document.getElementById("probaMutation").value;
	nbIndividus = document.getElementById("nbIndividu").value;
	nbParents = document.getElementById("nbParents").value;
	individus = [];
	map=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	generation = 0;
	bestFitness = 0;
	cheminTrouver = false;
	genererPopDepart();
	if(map[1][1]!="D")
		genererMap();
	dessinerIndividus();
	Itterer();
}
function dessinerIndividus(){
	var canvas = document.getElementById("carre"); 
	var ctx = canvas.getContext("2d");
	for(var i = 0; i<individus.length;i++){
		var individu = individus[i];
		ctx.beginPath();
		ctx.fillStyle = individu.couleur;
		ctx.lineWidth="2";   
		ctx.arc(individu.x*25 + 10, individu.y*25 + 10, 6, 0, 10);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
	}
}
function genererPopDepart(){
	for (var i = 0 ; i<nbIndividus ; i++){
		individus[i] = new Individu();
	}
}
function nouvelleGeneration(){
	for(var i =0;i<individus.length;i++){
		individus[i].calculerFitness();
	}
	individus.sort(function(a, b) {
  		return b.fitness - a.fitness;
		});
	if(individus[0].fitness>bestFitness){
		bestFitness = individus[0].fitness;
	}
	//document.getElementById("meilleurFitness").innerHTML = "Meilleure fitness : "+ individus[0].fitness;
	var oldIndividus = individus;
	for(var i = 0 ; i<Math.round(nbParents*nbIndividus)/2;i++){
		individus[i] = oldIndividus[i];
		individus[i].x = 1;
		individus[i].y = 1;
		individus[i].fitness = 0;
		individus[i].step = 0;
		individus[i].enVie = true;
	}
	for(var i = Math.round(nbParents*nbIndividus)/2 ; i<nbIndividus;i++){
		individus[i] = reproduire(oldIndividus[0],oldIndividus[i-Math.round(0.5*nbIndividus)]);
	}
	for (var i = (nbParents*nbIndividus)/2 ; i<nbIndividus ; i++){
		muter(individus[i]);
	}
	generation++;
	document.getElementById("generation").innerHTML = "Génération : "+ generation;
	Itterer();
}
function dessinerSolution(individu){
	var canvas = document.getElementById("carre"); 
	var ctx = canvas.getContext("2d");
	var longueurSolution = individu.step;
	individu.step = 0;
	individu.x =1;
	individu.y = 1;
	for(var i = 0; i<longueurSolution;i++){
		ctx.beginPath();
		ctx.fillStyle = individu.couleur;
		ctx.lineWidth="2";   
		ctx.arc(individu.x*25 + 10, individu.y*25 + 10, 5, 0, 10);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
		move(individu);
	}
}

//Constantes :
var probaMutation = document.getElementById("probaMutation").value;
var nbIndividus = document.getElementById("nbIndividu").value;
var nbParents = document.getElementById("nbParents").value;
var probaApparitionMur = 0.88;

//variables
var individus = [];
var map=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var generation = 0;
var bestFitness = 0;
var cheminTrouver = false;
var individuFinal;
var vitesseAnimation = document.getElementById("vitesse").value;

function changerVitesse(){
	vitesseAnimation = document.getElementById("vitesse").value;
}

function move(individu){
	switch(individu.genome[individu.step]){
		case 1:
			individu.x++;
			break;
		case 2:
			individu.x--;
			break;
		case 3:
			individu.y++;
			break;
		case 4:
			individu.y--;
			break;
		default :
			console.log("TON CODE A LA CANCER (gène non reconnu : "+ individu.genome[individu.step] +")");
			individu.enVie = false;
			break;
	}
	individu.step++;
	
}
function Itterer(){
	dessinerMap();
	for(var i = 0;i<individus.length;i++){
		var individu = individus[i];
		if(individu.enVie)
			move(individu);
			individu.calculerFitness();
		try{
			if(individu.x==18 && individu.y==18){
				cheminTrouver = true;
				individuFinal = individu;
			}
			if(map[individu.x][individu.y]==1 || individu.x < 0 || individu.y < 0){
			individu.enVie = false;
		}
		}catch(e){
			individu.enVie = false;
		}
		
	}
	dessinerIndividus();
	var nbIndividuEnVie = 0;
	for (var i = 0; i < individus.length; i++) {
		if(individus[i].enVie){
			nbIndividuEnVie++;
		}
	}
	document.getElementById("encoreEnVie").innerHTML = "Encore en vie : "+ nbIndividuEnVie;
	if(nbIndividuEnVie!=0 && !cheminTrouver){
		setTimeout(Itterer,vitesseAnimation);
	}else if(!cheminTrouver){
		nouvelleGeneration();
	}else{
		dessinerSolution(individuFinal);
	}
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}