import Weapon from "./classes/Items/Weapon.js";
import Potion from "./classes/Items/Potion.js";
import Loot from "./classes/Items/Loot.js";
import Key from "./classes/Items/Key.js";

import Player from "./classes/Entities/Player/Player.js";


import Dungeon from "./classes/Dungeon.js";

import Console from "./Console.js";

/*Elements du document :*/
let textInput = document.getElementById("TextInput");
let flecheHaut = document.getElementById("Up");
let flecheGauche = document.getElementById("Left");
let flecheBas = document.getElementById("Down");
let flecheDroite = document.getElementById("Right");

//Variables pour le fonctionnement du jeu
export let dungeon = null;
export let player = null;
export let nbRoomsMax = 20;
export let nbRoomsMin = 5;

export function setNbRoomMaw(nb){
	nbRoomsMax = nb;
}

export function setNbRoomMin(nb){
	nbRoomsMin = nb;
}

export function startGame(isLordMode){
	Console.clearConsoleMenu();
	player = new Player();
	Dungeon.nbRoomsMax = nbRoomsMax;
	Dungeon.nbRoomsMin = nbRoomsMin;
	dungeon = new Dungeon();
	Console.ecrireConsoleMenu("Entrez votre pseudo dans la zone de texte");
	textInput.style.display = "unset";
	textInput.addEventListener("keyup",function () {
		Console.clearConsoleMenu();
		Console.ecrireConsoleMenu("votre nom : " + textInput.value);
		Console.ecrireConsoleMenu("<button id='ButtonValidPseudo'>Oui !</button>");
		document.getElementById('ButtonValidPseudo').addEventListener("click",function () {
			player.hp = 200;
			player.maxHp = 200;
			player.nom = textInput.value;
			player.currentRoom = dungeon.startRoom;
			dungeon.drawMap(player.currentRoom);
			player.currentRoom=dungeon.startRoom;
			dungeon.drawMap(player.currentRoom);
			Console.clearConsoleMenu();
			textInput.value = "";
			textInput.style.display = "none";
			flecheBas.style.display = "unset";
			flecheHaut.style.display = "unset";
			flecheGauche.style.display = "unset";
			flecheDroite.style.display = "unset";
			displayOptionsInGame();
			Console.ecrireConsoleInventory(player);
		})
	});
}
function displayOptionsInGame(){
	Console.clearConsoleMenu();
	Console.ecrireConsoleMenu("<button class='menuButton'>Sauvegarder la progression (SOON)</button>");
	Console.ecrireConsoleMenu("<button class='menuButton'>Charger une sauvegarde (SOON)</button>");
	Console.ecrireConsoleMenu("<button class='menuButton'>Quitter la partie</button>");
}
function gameOverLoose(){
	Console.clearConsoleGame();
	Console.clearConsoleInventory();
	Console.clearConsoleMap();
	Console.ecrireConsoleGame("<h1 style='color: red'>GAME OVER</h1>");
	Console.ecrireConsoleGame("Malheuresement vous ne serez pas ce héros qui <br/>débarassera le donjon du Mal...");
	player = null;
	dungeon = null;
	Console.displayStartMenu();
}
function gameOverWin(){
	if (dungeon.boss instanceof Boss) {
		Console.clearConsoleGame();
		Console.ecrireConsoleGame("Vous avez vaincus le Mal qui pullulais dans ce donjon...");
		Console.ecrireConsoleGame("Le donjon ne sera plus qu'un vieux tas de ruines pour l'éternité");
	} else {
		Console.clearConsoleGame();
		Console.ecrireConsoleGame("Le corps encore chaud du \"Seigneur\" repose à vos pieds...");
		Console.ecrireConsoleGame("Son arrogance l'a conduit à sa perte mais ce n'est pas la fin des Seigneurs...");
		Console.ecrireConsoleGame("Le temps de la tyrannie est arrivée ... Le temps de le seigneurerie de " + player.nom + "!");
	}
	player = null;
	dungeon = null;
}
export function checkPlayerIsAlive(){
	if(player.hp<=0) {
		player = null;
		gameOverLoose();
	}
}
export function actualiserInventaire(){
	Console.clearConsoleInventory();
	Console.ecrireConsoleInventory(player);
    /*Listeners*/
    for(let k = 0;k<player.inventory.weapons.length;k++){
        document.getElementById("Weapon"+k).addEventListener("click",function () {
            player.changeWeapon(k);
            actualiserInventaire();
        });
    }
    for(let k = 0;k<player.inventory.potions.length;k++){
        document.getElementById("Potion"+k).addEventListener("click",function () {
        	player.usePotion(k);
            console.log("Use Potion n° "+k);
        });
    }
    for(let k = 0;k<player.inventory.loots.length;k++){
        document.getElementById("Loot"+k).addEventListener("click",function () {
            player.useLoot(k);
        });
    }
    for(let k = 0;k<player.inventory.keys.length;k++){
        document.getElementById("Key"+k).addEventListener("click",function () {
            console.log("Use Key n° "+k);
        });
    }
}

//Début du jeu
flecheBas.style.display = "none";
flecheHaut.style.display = "none";
flecheGauche.style.display = "none";
flecheDroite.style.display = "none";
textInput.style.display = "none";

flecheDroite.addEventListener("click",function () {
	if(dungeon!=null)
		dungeon.goRight();
});
flecheGauche.addEventListener("click",function () {
	if(dungeon!=null)
		dungeon.goLeft();
});
flecheHaut.addEventListener("click",function () {
	if(dungeon!=null)
		dungeon.goUp();
});
flecheBas.addEventListener("click",function () {
	if(dungeon!=null)
		dungeon.goDown();
});

Console.displayStartMenu();


