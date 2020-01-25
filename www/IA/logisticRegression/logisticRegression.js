//constantes : 
var nbInputs = 2;
var nbDataParClasses = 100;
var nbEpochs = 100;
var learningRate = 0.1;

//variables
var timeAnimation = 0;
var numDataset = 0;
var features;
var targets;
var weigths;
var bais;
weigths,bais = initVariable();
features,targets = getDataset();


function activation(z){
	 return (1/ (1 + Math.exp(-z)));
}
function preActivation(feature){
	var z = 0;
	for(var j = 0; j<weigths.length;j++){
		z += feature[j] * weigths[j];
	}
	return (z + bais);
}
function derivateActivation(){
	return activation(z) * (1- activation(z));
}
function initVariable(){
	weigths = [];
	for (var i = 0; i < nbInputs; i++) {
		weigths[i] = Math.random();
	}
    bais = 0;
    return weigths,bais;
}
function getDataset(){
	switch(Math.abs(numDataset%3)){
		case 0:
			var trueFeatures = new Array();
			for (var i = 0; i < nbDataParClasses; i++) {
				trueFeatures[i] = new Array();
				for (var j = 0; j < nbInputs; j++) {
					trueFeatures[i][j] = getRandom()-2;
				}
			}
			var falseFeatures = new Array();
			for (var i = 0; i < nbDataParClasses; i++) {
				falseFeatures[i] = new Array();
				for (var j = 0; j < nbInputs; j++) {
					falseFeatures[i][j] = getRandom()+2;
				}
			}
			break;
		case 1:
			var trueFeatures = new Array();
			for (var i = 0; i < nbDataParClasses; i++) {
				trueFeatures[i] = new Array();
				trueFeatures[i][0] = Math.pow(getRandom(),2)+0.2;
				trueFeatures[i][1] = getRandom()*5;
			}
			var falseFeatures = new Array();
			for (var i = 0; i < nbDataParClasses; i++) {
				falseFeatures[i] = new Array();
				falseFeatures[i][0] = -Math.pow(getRandom(),2)-0.2;
				falseFeatures[i][1] = getRandom()*5;
			}
			break;
		case 2:
			var trueFeatures = new Array();
			for (var i = 0; i < nbDataParClasses; i++) {
				trueFeatures[i] = new Array();
				trueFeatures[i][0] = getRandom()*5;
				trueFeatures[i][1] = getRandom()-1.5;
			}
			var falseFeatures = new Array();
			for (var i = 0; i < nbDataParClasses; i++) {
				falseFeatures[i] = new Array();
				falseFeatures[i][0] = getRandom();
				falseFeatures[i][1] = getRandom();
			}
			break;
		default:
			console.log("Dateset incoonue : " + Math.abs(numDataset%3));
			break;
	}
	
    features = new Array();
    for (var i = 0; i < nbDataParClasses; i++) {
    	features[i] = new Array();
		for (var j = 0; j < nbInputs; j++) {
			features[i][j] = trueFeatures[i][j];
		}
	}
	for (var i = 0; i < nbDataParClasses; i++) {
		features[i+nbDataParClasses] = new Array();
		for (var j = 0; j < nbInputs; j++) {
			features[i+nbDataParClasses][j] = falseFeatures[i][j];
		}
	}
    targets = new Array();
    for (var i = 0; i < nbDataParClasses*2; i++) {
    	if(i<nbDataParClasses)
    		targets[i] = 1;
    	else
    		targets[i] = 0;
    }
    dessinerFeatures(true);
    //calcul Accuracy
    predictions = [];
	for (var i = 0; i < features.length; i++) {
		predictions[i] = predict(features[i]);
	}
    var mean = 0;
    for (var i = 0; i < predictions.length; i++) {
    	mean += (predictions[i]==targets[i] ? 1:0);
    }
    document.getElementById("Accuracy").innerHTML = "Précision : " + mean/targets.length;
    return features,targets
}
function cost(predictions,targets){
	var mean = 0;
	for (var i = 0; i < predictions.length; i++) {
		mean += (predictions[i] - targets[i]) * (predictions[i] - targets[i]) ;
	}
	return mean/predictions.length;
}
function predict(feature){
	var a = activation(preActivation(feature));
	return Math.round(a);
}
function train(features,targets){
	//Calculer l'accuracy :
	predictions = [];
	for (var i = 0; i < features.length; i++) {
		predictions[i] = predict(features[i]);
	}
    var mean = 0;
    for (var i = 0; i < predictions.length; i++) {
    	mean += (predictions[i]==targets[i] ? 1:0);
    }
    document.getElementById("Accuracy").innerHTML = "Précision : " + mean/targets.length;
    for (var epoch = 0; epoch < nbEpochs; epoch++) {
        if (epoch%10==0) {
        	var predictions = [];
        	for (var i = 0; i < features.length; i++) {
        		predictions[i] = activation(preActivation(features[i]));
        	}
        	timeAnimation+=100;
        }
        weights_gradients = [];
        for (var i = 0; i < weigths.length; i++) {
        	weights_gradients[i] = 0;
        }
        bias_gradient = 0;
        for (var j = 0;j<features.length;j++){
        	feature = features[j];
        	target = targets[j];
            z = preActivation(feature, weigths, bais);
            y = activation(z);
            for (var i = 0; i < weights_gradients.length; i++) {
            	weights_gradients[i] += (y-target) * derivateActivation(z) * feature[i];
            }
            bias_gradient += (y - target) * derivateActivation(z);
            for (var i = 0; i < weigths.length; i++) {
            	weigths[i] = weigths[i] - learningRate*weights_gradients[i];
            }
            bais = bais - learningRate*bias_gradient;
        }
    }
    predictions = [];
	for (var i = 0; i < features.length; i++) {
		predictions[i] = predict(features[i]);
	}
    var mean = 0;
    for (var i = 0; i < predictions.length; i++) {
    	mean += (predictions[i]==targets[i] ? 1:0);
    }
    document.getElementById("Accuracy").innerHTML = "Précision : " + mean/targets.length;
    dessinerPredictions();
}
function dessinerFeatures(cleanMap){
	if(cleanMap){
		var canvas = document.getElementById("carre"); 
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "white"
		ctx.lineWidth="2";   
		ctx.fillRect(0,0,500,500);
		ctx.stroke();
	}
	for(var i =0;i<features.length;i++){
		if(i<features.length/2){
			dessinerFeature(features[i],'green');
		}else{
			dessinerFeature(features[i],'red');
		}
	}
	if(cleanMap){
		dessinerPredictions();
	}
}
function dessinerFeature(feature,couleur){
	var canvas = document.getElementById("carre"); 
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle = couleur;
	ctx.lineWidth="2";   
	ctx.arc((feature[0]+4)*62.5, (feature[1]+4)*62.5, 6, 0, 10);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
}
function dessinerGrille(){
	var canvas = document.getElementById("carre"); 
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(250,0);
	ctx.lineTo(250,500);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0,255);
	ctx.lineTo(500,255);
	ctx.closePath();
	ctx.stroke();
}
function dessinerPredictions(){
	for(var x = 0; x<500;x++){
		for(var y = 0; y<500;y++){
			var canvas = document.getElementById("carre"); 
			var ctx = canvas.getContext("2d");
			ctx.beginPath();
			ctx.fillStyle = (predict(new Array(x/62.5 - 4,y/62.5 - 4))==1 ? '#e6ffe6' : '#ffd6cc');
			ctx.lineWidth="2"; 
			ctx.fillRect (x, y, 1, 1);
			ctx.closePath();
			ctx.stroke();
		}
	}
	dessinerGrille();
	dessinerFeatures(false);
}

function getRandom(){
	return (Math.random() * Math.floor(2))-1;
}