//définition des classes d'items
class Item{
	nom;
}
class Key extends Item{
	constructor(){
		super();
	}
	toString(){
		return "Cle";
	}
}
class Loot extends Item{
	effet;
	constructor(){
		super();
		var effetLoot = ["Pierre à ponser","Coeur artificiel","Monocle de vérité","Cube horadrique"];
		this.effet = effetLoot[getRandomInt(effetLoot.length)];
	}
	toString(){
		return this.effet;
	}
}
class Potion extends Item{
	heal;
	strength;
	effet;
	constructor(){
		super();
		var r = Math.random();
		if(r<0.25){
			this.heal = Math.round(Math.random()*50);
			this.strength = 0;
			this.effet = 'Soin';
		}else if(r<0.5){
			this.heal = Math.round(Math.random()*50)*-1;
			this.strength = 0;
			this.effet = 'Dégat';
		}else if(r<0.75){
			this.strength = Math.round(Math.random()*50);
			this.heal = 0;
			this.effet = 'Force';
		}else{
			this.strength = Math.round(Math.random()*50)*-1;
			this.heal = 0;
			this.effet = 'Faiblesse';
		}
	}
	toString(){
		return this.effet;
	}
}
class Weapon extends Item{
	damage;
	constructor(){
		super();
		var weaponNames = ['Dague','Arme de poing','Arc long','Arc court','Rapière','Épée longue','Épée courte','Shuriken','Glaive'];
		var weaponAdj = ['du barbare','magique','rare','de feu','de foudre','de glace','ensorcelé','du Roi Squelette','horrifique','sublime','de la démence','de nain','du Dragon'];
		this.damage = Math.round(randn_bm()*15+50);
		this.nom = weaponNames[getRandomInt(weaponNames.length)] +" "+weaponAdj[getRandomInt(weaponAdj.length)];
	}
	toString(){
		return this.nom + "["+this.damage+"]";
	} 
}
//définition des classes liées aux entités
class Inventory{
	weapons = [];
	potions = [];
	loots = new Array();
	keys = [];
	constructor(){

	}
	addItem(item){
		if (item instanceof Weapon) {
			this.weapons.push(item);
		}
		if (item instanceof Potion) {
			this.potions.push(item);
		}
		if (item instanceof Loot) {
			this.loots.push(item);
		}
		if (item instanceof Key) {
			this.keys.push(item);
		}
	}
	addItems(items){
		/*items.forEach(function(item, index, array) {
  			addItem(item);
		});*/
		for (var i = 0; i < items.length; i++) {
			this.addItem(items[i]);
		}
		
	}
	takeAllItems(){
		
	}
	takeKey(number){
		return keys.splice(number,1);
	}
	takeLoot(number){
		console.log(this.loots);
		var x = this.loots.splice(number,1);
		console.log("Loot pris : "+number+" - " + x.effet);
		console.log(this.loots);
		return x;
	}
	takePotion(number){
		return this.potions.splice(number,1);
	}
	takeWeapon(number){
		return this.weapons.splice(number,1);
	}
	toString(){
		var s = "Armes :";
		var num = 0;
		for (var i = 0; i < this.weapons.length; i++) {
			num++;
			s+="\n   " + num + "-" + this.weapons[i].toString() +"";
		}
		s+= "\nPotions:";
		num = 0;
		for (var i = 0; i < this.potions.length; i++) {
			num++;
			s+="\n   " + num + "-" + this.potions[i].toString() +" ";
		}
		s+= "\nObjets:";
		num = 0;
		for (var i = 0; i < this.loots.length; i++) {
			num++;
			s+="\n   " + num + "-" + this.loots[i].toString() +" ";
		}
		s+= "\nClés:";
		num = 0;
		for (var i = 0; i < this.keys.length; i++) {
			num++;
			s+="\n   " + num + "-" + this.keys[i].toString() +" ";
		}
		return s;
	}
}
class Entity{
	nom;
	hp;
	maxHp;
	strength;
	inventory;
	weapon;
	constructor(){
		this.inventory = new Inventory();
		this.nom = "unnamed";
		this.hp = 100;
		this.maxHp = 100;
		this.strength = 0;
		this.weapon = new Weapon();
	}
	receivePotionEffect(potion){
		this.hp = this.hp + potion.heal;
		this.strength = this.strength + potion.strength;
	}
}
class Player extends Entity{
	currentRoom;
	inBattle;
	constructor(){
		super();
	}
	attack(enemy){
		ecrireConsoleGame(this.nom + " attaque " + enemy.nom + " avec " + this.weapon.toString());
		enemy.takeDamage(this.weapon.damage + this.strength);
	}
	changeWeapon(number){
		this.inventory.addItem(this.weapon);
		this.weapon = this.inventory.takeWeapon(number-1);
	}
	displayPossibleActions(){
		var s = "";
		var numAction = 1;
		s+= numAction + " - Ne rien faire\n";
		if (this.weapon!=null && this.weapon!=undefined){
			numAction++;
			s+= numAction + " - Attaquer avec " + this.weapon.toString();
		}
		ecrireConsoleGame(s);
	}
	takeDamage(damage){
		this.hp = this.hp - damage;
		if(damage>100){
			ecrireConsoleGame(this.nom + " subit " + damage + " points de dégats ! Ca doit vraiment faire mal...");
		}else{
			ecrireConsoleGame(this.nom + " subit " + damage + " points de dégats !");
		}
	}
	toString(){
		return this.nom + "    " + this.hp + "/" + this.maxHp + "    Force: " + this.strength + "\nArme: " + this.weapon + "\n\nInventaire :\n\n" + this.inventory;
	}
	useLoot(number){
		switch(this.inventory.takeLoot(number-1).effet){
			case "Pierre à ponser":
				this.weapon.damage+=10;
			break;
			case "Coeur artificiel":
				this.maxHp+=10;
				this.hp+=10;
			break;
			case "Monocle de vérité":

			break;
			case "Cube horadrique":
				transmuteWeapon(++levelTransmuteWeapon);
			break;
			default:
				console.log("ERREUR, item non trouvé")
			break;
		}
	}
}
class Enemy extends Entity{
	constructor(){
		super();
		var enemyeffet = ['Zombi2','Zombi','Zombi3'];
		this.nom = enemyeffet[getRandomInt(enemyeffet.length)];
		this.maxHp = Math.round(Math.random()*150+50);
		this.hp = this.maxHp;
		var nbItems = Math.random();
		if(nbItems<0.33){
			this.inventory.addItem(generateItem());
		}else if(nbItems<0.66){
			this.inventory.addItem(generateItem());
			this.inventory.addItem(generateItem());
		}else if(nbItems<0.90){
			this.inventory.addItem(generateItem());
			this.inventory.addItem(generateItem());
			this.inventory.addItem(generateItem());
		}else{
			this.inventory.addItem(generateItem());
			this.inventory.addItem(generateItem());
			this.inventory.addItem(generateItem());
			this.inventory.addItem(generateItem());
		}
	}
	addKey(key){
		this.inventory.addItem(key);
	}
	attack(enemy){
		ecrireConsoleGame(this.nom + " attaque " + enemy.nom + " avec " + this.weapon.toString());
		enemy.takeDamage(this.weapon.damage + this.strength);
		if(Math.random()<0.7777){
			this.usePotion(enemy);
		}
	}
	takeDamage(damage){
		this.hp = this.hp - damage;
		if(damage>100){
			ecrireConsoleGame(this.nom + " subit " + damage + " points de dégats ! Ca doit vraiment faire mal...");
		}else{
			ecrireConsoleGame(this.nom + " subit " + damage + " points de dégats !");
		}
		if(this.hp<=0){
			//Le monstre doit mourrir.
			
		}
	}
	usePotion(enemy){
		if(this.hp<100){
			try{
				var potion = null;
				this.inventory.potions.forEach(function(item, index, array) {
  					if(item.effet=="Soin")
  						potion = item;
				});
				this.receivePotionEffect(potion);
				ecrireConsoleGame(this.nom +" utilise une potion de soin ! Il récupère " + potion.heal + " PV");
			}catch(error){
				console.log(error);
			}
		}
		if(enemy.hp<100){
			try{
				var potion = null;
				this.inventory.potions.forEach(function(item, index, array) {
  					if(item.effet=="Dégat")
  						potion = item;
				});
				ecrireConsoleGame(this.nom +" utilise une potion de dégats !" + enemy.nom + " perd " + potion.heal);
				enemy.receivePotionEffect(potion);
			}catch(error){
				console.log(error);
			}
		}
	}
}
class Boss extends Enemy{

}

//définition des classes liées aux salles
class Trap{
	viewed;
	damage;
	triggerSentence;
	constructor(){
		this.viewed = false;
		this.damage = Math.random()*9+1;
		var triggerSentences = ['Un énorme piège à Ours s\'est rabattu sur vous','des minuscules fléchettes volent vers vous','un javelot tombant de nul part manque de vous empaller','Une potion vole sur vous !'];
		this.triggerSentence = triggerSentences[getRandomInt(triggerSentences.length)];
	}
}
class Chest{
	items = [];
	constructor(golded){
		var nbItems = Math.random();
		if(!golded){
			if(nbItems<0.33){
				this.items.push(generateItem());
			}else if(nbItems<0.66){
				this.items.push(generateItem());
				this.items.push(generateItem());
			}else if(nbItems<0.90){
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
			}else{
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
			}
		}else{
			if(nbItems<0.33){
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
			}else if(nbItems<0.66){
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
			}else if(nbItems<0.90){
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
			}else{
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
				this.items.push(generateItem());
			}
		}
	}
	toString(){
		return "Coffre [contenu = "+this.items+"]";
	}
}
class Room{
	explored;
	locked;
	key;
	chest;
	enemy;
	trap;

	constructor(locked){
		this.locked = locked;
		this.explored = false;
		if(locked){
			this.chest = new Chest(true);
			this.enemy = null;
		}else{
			var r = getRandomInt(6);
			switch(r){
				case 0:
					break;
				case 1:
					this.chest = new Chest();
					this.enemy = null;
					this.trap = null;
					break;
				case 2:
					this.chest = null;
					this.enemy = new Enemy();
					this.trap = null;
					break;
				case 3:
					this.chest = null;
					this.enemy = null;
					this.trap = new Trap();
					break;
				case 4:
					this.chest = new Chest();
					this.enemy = new Enemy();
					this.trap = null;
					break;
				case 5:
					this.chest = new Chest();
					this.enemy = null;
					this.Trap = new Trap();

			}
		}
	}
}

//définition des classes liées à la gestion du jeu
class Dungeon{
	nbRoomsMax = 20;
	nbRoomsMin = 5;
	currentRoomOfPlayer;
	boss;
	rooms;
	bossRooms;
	startRoom;
	endRoom;
	constructor(){
		var nbRooms = getRandomInt(this.nbRoomsMax-this.nbRoomsMin) + this.nbRoomsMin;
		var nbLockedRooms = getRandomInt(Math.round(nbRooms/4));
		var nbRoomsCreate = 1;
		var nbLockedRoomsCreate = 0;
		this.rooms = new Array();
		for (var i = 0; i <nbRooms*2; i++) {
			this.rooms[i] = new Array();
		}
		this.rooms[nbRooms][nbRooms] = new Room(false);
		while(nbRoomsCreate<nbRooms){
			var x = getRandomInt(nbRooms*2);
			var y = getRandomInt(nbRooms*2);
			if(!(this.rooms[x][y] instanceof Room)){
				try{
					if ((this.rooms[x + 1][y] instanceof Room) || (this.rooms[x - 1][y] instanceof Room) || (this.rooms[x][y - 1] instanceof Room) || (this.rooms[x][y + 1] instanceof Room)) {
						this.rooms[x][y] = new Room(false);
						nbRoomsCreate++;
					}
				}catch(error){

				}
			}
		}
		//On cherche la salle la plus basse générée pour mettre la salle de départ
		var yCoordMostDownRoom = nbRooms;
		var xCoordMostDownRoom = nbRooms;
		for (var i = 0; i < nbRooms*2; i++) {
			for (var j = 0; j < nbRooms*2; j++) {
				if ((this.rooms[i][j] instanceof Room) && (i > yCoordMostDownRoom)) {
					yCoordMostDownRoom = i;
					xCoordMostDownRoom = j;
				}
			}
		}
		this.startRoom = new Room(false);
		this.startRoom.enemy=null;
		this.startRoom.chest=null;
		this.startRoom.trap=null;
		this.startRoom.explored = true;
		this.rooms[yCoordMostDownRoom][xCoordMostDownRoom] = this.startRoom;
		this.discoverRoom(yCoordMostDownRoom,xCoordMostDownRoom);

		//On cherche la salle la plus haute générée pour mettre la salle d'arrivée
		var yCoordMostUpRoom = nbRooms;
		var xCoordMostUpRoom = nbRooms;
		for (var i = 0; i < nbRooms*2; i++) {
			for (var j = 0; j < nbRooms*2; j++) {
				if ((this.rooms[i][j] instanceof Room) && (i < yCoordMostUpRoom)) {
					yCoordMostUpRoom = i;
					xCoordMostUpRoom = j;
				}
			}
		}
		this.endRoom = new Room(false);
		this.endRoom.enemy=null;
		this.endRoom.chest=null;
		this.endRoom.trap=null;
		this.rooms[yCoordMostUpRoom][xCoordMostUpRoom] = this.endRoom;

		//On génère ensuite les salles vérouillées
		var keys = [];
		while(nbLockedRoomsCreate<nbLockedRooms){
			var x = getRandomInt(nbRooms*2);
			var y = getRandomInt(nbRooms*2);

			if(!(this.rooms[x][y] instanceof Room)){
				try{
					if ((this.rooms[x + 1][y] instanceof Room) || (rooms[x - 1][y] instanceof Room)
							|| (rooms[x][y - 1] instanceof Room) || (rooms[x][y + 1] instanceof Room)) {
						this.rooms[x][y] = new Room(true);
						nbLockedRoomsCreate++;
						var key = new Key();
						this.rooms[x][y].key = key;
						keys.push(key);
					}
				}catch(error){
				}
			}
		}
		//Puis on dispatch les clés parmis les coffres ou les enemies
		var keyKeepers = [];
		for (var i = 0; i < nbRooms * 2; i++) {
			for (var j = 0; j < nbRooms * 2; j++) {
				try {
					if (this.rooms[i][j].enemy instanceof Enemy)
						keyKeepers.push(rooms[i][j].getEnemy());
					if (rooms[i][j].chest instanceof Chest)
						keyKeepers.push(rooms[i][j].getChest());
				} catch (e) {
				}
			}
		}
		for (var i = 0; i < this.nbLockRooms; i++){
			try {
				keyKeepers[getRandomInt(keyKeepers.length)].addKey(keys[i]);
			} catch (e) {
			}	
		}
	}
	setRoomsMax(nbRooms){
		if(nbRooms<nbRoomsMin)
			nbRooms=nbRoomsMin;
		this.nbRoomsMax = nbRooms;
	}
	setRoomsMin(nbRooms){
		if(nbRooms<1)
			nbRooms = 1;
		if(nbRooms>nbRoomsMax)
			nbRooms = nbRoomsMax;
		this.nbRoomsMin = nbRooms;
	}
	discoverRoom(x,y){
		try{
			this.rooms[x-1][y].explored = true;
		}catch(error){
		}
		try{
			this.rooms[x+1][y].explored = true;
		}catch(error){
		}
		try{
			this.rooms[x][y-1].explored = true;
		}catch(error){
		}
		try{
			this.rooms[x][y+1].explored = true;
		}catch(error){
		}
		try{
			this.rooms[x][y].explored = true;
		}catch(error){
		}
	}
	drawMap(centredRoom){
		clearConsoleMap();
		var iCoordOfCentredRoom = null;
		var jCoordOfCentredRoom = null;
		for (var i = 0; i < this.rooms.length; i++) {
			for (var j = 0; j < this.rooms.length; j++) {
				if (centredRoom == this.rooms[i][j]) {
					iCoordOfCentredRoom = i;
					jCoordOfCentredRoom = j;
				}
			}
		}
		if(jCoordOfCentredRoom==null || iCoordOfCentredRoom==null){
			console.log("Erreur, impossible de trouver la salle")
			return;
		}else{
			console.log("Salle centrée : " + iCoordOfCentredRoom+";"+jCoordOfCentredRoom+
				" Salle deépart:"+(this.rooms[iCoordOfCentredRoom][jCoordOfCentredRoom]==this.startRoom));
		}

		// pour afficher la carte
		var line1 = "";
		var line2 = "";
		var line3 = "";
		var roomContent = "";
		for (var i = iCoordOfCentredRoom - 2; i < (iCoordOfCentredRoom + 2); i++) {
			for (var j = jCoordOfCentredRoom - 2; j < (jCoordOfCentredRoom + 2); j++) {
				roomContent = "";
				try {
					if (this.rooms[i][j] == player.currentRoom)
						roomContent += "<";
					if (this.rooms[i][j] == this.endRoom)
						roomContent += ">";
					if (this.rooms[i][j].chest instanceof Chest)
						roomContent += ";";
					if (this.rooms[i][j].enemy instanceof Enemy)
						roomContent += ":";
					if ((this.rooms[i][j].trap instanceof Trap) && this.rooms[i][j].trap.viewed)
						roomContent += "6";
					if (this.rooms[i][j].locked)
						roomContent = "?";
					
				} catch (e) {
				}

				while (roomContent.length < 2){
					roomContent = "4" + roomContent + "4";
				}
				while (roomContent.length < 3){
					roomContent += "4";
				}
				try {
					if ((this.rooms[i][j] instanceof Room) && this.rooms[i][j].explored) {
						try {
							if (this.rooms[i - 1][j] instanceof Room) {
								line1 += "01412";
							} else {
								line1 += "01112";
							}
						} catch (e) {
							line1 += "01112";
						}
						try {
							if (this.rooms[i + 1][j] instanceof Room) {
								line3 += "78489";
							} else {
								line3 += "78889";
							}
						} catch (e) {
							line3 += "78889";
						}
						try {
							if ((this.rooms[i][j - 1] instanceof Room) && (!(this.rooms[i][j + 1] instanceof Room))) {
								line2 += "4" + roomContent + "5";
							}
						} catch (e) {
						}
						try {
							if ((this.rooms[i][j + 1] instanceof Room) && (!(this.rooms[i][j - 1] instanceof Room))) {
								line2 += "3" + roomContent + "4";
							}
						} catch (e) {
						}
						try {
							if (((this.rooms[i][j + 1] instanceof Room)) && ((this.rooms[i][j - 1] instanceof Room))) {
								line2 += "4" + roomContent + "4";
							}
						} catch (e) {
							try {
								var b = this.rooms[i][j + 1] != undefined;
								line2 += "3" + roomContent + "4";
							} catch (e2) {
								line2 += "4" + roomContent + "5";
							}
						}
						try {
							if ((!(this.rooms[i][j + 1] instanceof Room)) && (!(this.rooms[i][j - 1] instanceof Room))) {
								line2 += "3" + roomContent + "5";
							}
						} catch (e) {
						}
					} else {
						line1 += "44444";
						line2 += "44444";
						line3 += "44444";
					}
				} catch (e) {
					line1 += "44444";
					line2 += "44444";
					line3 += "44444";
				}
			}
			ecrireConsoleMap(line1);
			ecrireConsoleMap(line2);
			ecrireConsoleMap(line3);
			line1 = "";
			line2 = "";
			line3 = "";
		}
	}
}

//Fonctions de gestion des outputs des consoles
function ecrireConsoleMap(texte){
	if(document.getElementById("MapConsoleOutput").innerHTML!="" && document.getElementById("MapConsoleOutput").innerHTML!="\n"){
		document.getElementById("MapConsoleOutput").innerHTML = document.getElementById("MapConsoleOutput").innerHTML + '\n' + texte;
	}else{
		document.getElementById("MapConsoleOutput").innerHTML = texte;

	}
}
function clearConsoleMap(){
	document.getElementById("MapConsoleOutput").innerHTML = "";
}

function ecrireConsoleMenu(texte){
	if(document.getElementById("MenuConsoleOutput").innerHTML!="" && document.getElementById("MenuConsoleOutput").innerHTML!="\n"){
		document.getElementById("MenuConsoleOutput").innerHTML = document.getElementById("MenuConsoleOutput").innerHTML + '\n' + texte;
	}else{
		document.getElementById("MenuConsoleOutput").innerHTML = texte;
	}
}
function clearConsoleMenu(){
	document.getElementById("MenuConsoleOutput").innerHTML = "";
}

function ecrireConsoleInventory(texte){
	if(document.getElementById("InventoryConsoleOutput").innerHTML!="" && document.getElementById("InventoryConsoleOutput").innerHTML!="\n"){
		document.getElementById("InventoryConsoleOutput").innerHTML = document.getElementById("InventoryConsoleOutput").innerHTML + '\n' + texte;
	}else{
		document.getElementById("InventoryConsoleOutput").innerHTML = texte;
	}
}
function clearConsoleInventory(){
	document.getElementById("InventoryConsoleOutput").innerHTML = "";
}

function ecrireConsoleGame(texte){
	if(document.getElementById("GameConsoleOutput").innerHTML!="" && document.getElementById("GameConsoleOutput").innerHTML!="\n"){
	document.getElementById("GameConsoleOutput").innerHTML = document.getElementById("GameConsoleOutput").innerHTML + '\n' + texte;
	}else{
		document.getElementById("GameConsoleOutput").innerHTML = texte;
	}
}
function clearConsoleGame(){
	document.getElementById("GameConsoleOutput").innerHTML = "";
}

//Fonctions pour les Inputs
function up(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
}
function down(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
}
function left(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
}
function right(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
}
function attak(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
	if(levelFight!=0){
		valueAttak = true;
		fight(++levelFight);
	}
}
function flee(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
	if(levelFight!=0){
		valueAttak = true;
		fight(++levelFight);
	}
}
function changeWeapon(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
	//player.changeWeapon();
}
function usePotion(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
}
function help(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
	levelDisplayHelp = 1;
	saveTexteConsoleGame = document.getElementById("GameConsoleOutput").innerHTML;
	saveTexteConsoleInventory = document.getElementById("InventoryConsoleOutput").innerHTML;
	saveTexteConsoleMenu = document.getElementById("MenuConsoleOutput").innerHTML;
	saveTexteConsoleMap = document.getElementById("MapConsoleOutput").innerHTML;
	displayHelp(1);
}
function valid(){
	if(levelDisplayHelp!=0){
			displayHelp(++levelDisplayHelp);
			return;
		}
	if(levelOpenChest!=0){
		valueValid = true;
		openChest(++levelOpenChest);
		return;
	}
}
function unvalid(){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
	if(levelOpenChest!=0){
		valueValid = true;
		openChest(++levelOpenChest);
		return;
	}
}
function textInput(){
	var texte = document.getElementById("TextInput").value;
	if(texte.substring(texte.length-1,texte.length)=="\n"){
		document.getElementById("TextInput").value = "";
		valueTextInput = texte.substring(0,texte.length-1);
		if(levelStartGame!=0){
			startGame(++levelStartGame);
			return;
		}
		if(levelTransmuteWeapon!=0){
			transmuteWeapon(++levelTransmuteWeapon);
		return;
		}
		if(levelUseLoot!=0){
			useLoot(++levelUseLoot);
			return;
		}
		if(menuEnCours!=null){
			switch(menuEnCours){
				case "StartMenu":
					switch(valueTextInput){
						case "1":
							startGame(++levelStartGame);
						break;
						case "2":
						break;
						case "3":
						break;
					}
				break;
			}
			valueTextInput = null;
		}
	}
}
function startGame(level,isLordMode){
	clearConsoleMenu();
	switch(level){
		case 1:
			player = new Player();
			dungeon = new Dungeon();
			ecrireConsoleGame("Entrez votre pseudo dans la zone de texte");
		break;
		case 2:
			if(valueTextInput==null){
				startGame(--levelStartGame,isLordMode);
				return;
			}else{
				blockAllInputs();
				unblockMovmentInputs();
				unblockInventoryInputs();
				player.hp = 200;
				player.maxHp = 200;
				player.nom = valueTextInput;
				valueTextInput = null;
				player.currentRoom = dungeon.startRoom;
				dungeon.drawMap(player.currentRoom);
				player.currentRoom=dungeon.startRoom;
				dungeon.drawMap(player.currentRoom);
				clearConsoleGame();
				displayOptionsInGame();
				levelStartGame = 0;
			}
	}
}
function openChest(level){
	switch(level){
		case 1:
			ecrireConsoleGame("Voulez vous ouvrir le coffre ? ✔️ ou ❌");
			blockAllInputs();
			unblockValidationInputs();
			break;
		case 2:
			if(valueValid){
				ecrireConsoleGame("Vous ouvrez le coffre !");
				player.inventory.addItems(player.currentRoom.chest.items);
				actualiserInventaire();
			}else{
				ecrireConsoleGame("Vous n'ouvrez pas le coffre");
			}
			valueValid = null;
			valueUnvalid = null;
			levelOpenChest = 0;
			blockAllInputs();
			unblockMovmentInputs();
			unblockInventoryInputs();
			break;
	}
}
function fight(level){
	player.currentRoom.enemy.attak(player);
	switch(level){
		case 1:
			ecrireConsoleGame("Que voulez-vous faire ? ⚔ ou 💨");
			blockAllInputs();
			unblockAttakInputs();
		break;
		case 2:
			if(valueAttak){
				player.attak(player.currentRoom.enemy);
			}else{
				player.flee();
			}
			blockAllInputs();
			unblockMovmentInputs();
			unblockInventoryInputs();
			valueAttak = null;
			valueFlee = null;
			levelFight = 0;
		break;
	}
}
function useLoot(level){
	if(levelDisplayHelp!=0){
		displayHelp(++levelDisplayHelp);
		return;
	}
	switch(level){
		case 1:
			ecrireConsoleGame("Quel Objet utiliser ?");
			levelUseLoot = 1;
		break;
		case 2:
			player.useLoot(valueTextInput);
			valueTextInput = null;
			levelUseLoot = 0;
		break;
	}
}
function displayHelp(level){
	clearConsoleGame();
	clearConsoleInventory();
	clearConsoleMenu();
	clearConsoleMap();
	
	switch(level){
		case 1:
			ecrireConsoleInventory("Ici s'affiche l'inventaire de votre héros");
			ecrireConsoleInventory("\nVous retrouverez vos points de vie\nainsi que les objets que vous avez ramasser");
			ecrireConsoleInventory("\n\nAppuyer sur n'importe quel bouton pour\ncontinuer...");
			break;
		case 2:
			ecrireConsoleInventory("Les boutons disponibles sont :");
			ecrireConsoleInventory(" - Changer d'arme : Pour équiper l'arme\nportant le numéro demandé");
			ecrireConsoleInventory(" - Potion: Utilise la potion\nportant le numéro demandé");
			ecrireConsoleInventory(" - Objet: Utilise l'objet\nportant le numéro demandé");
			ecrireConsoleInventory("\n\nAppuyer sur n'importe quel bouton pour\ncontinuer...");
			break;
		case 3:
			ecrireConsoleMenu("Ici vous pouvez visualiser les options du jeu");
			ecrireConsoleMenu("Appuyer sur Options pour interagir avec");
			ecrireConsoleMenu(" |\n |\n |\n |\n |\n |\n\\_/");
			ecrireConsoleMenu("Appuyer sur n'importe quel bouton pour\ncontinuer...");
			break;
		case 4:
			ecrireConsoleMap("Ici s'affiche la carte du donjon");
			break;
		case 5:
			ecrireConsoleGame("Ici s'affiche l'histoire, les actions et les evènements...");
			ecrireConsoleGame("Les boutons disponibles sont :");
			ecrireConsoleGame(" - \"▲\" : se déplacer vers le Nord ");
			ecrireConsoleGame(" - \"▼\" : se déplacer vers le Sud ");
			ecrireConsoleGame(" - \"◄\" : se déplacer vers l'Ouest ");
			ecrireConsoleGame(" - \"►\" : se déplacer vers l'Est ");
			ecrireConsoleGame("\n\nAppuyer sur n'importe quel bouton pour continuer...");
			break;
		case 6:
			ecrireConsoleMenu("Retrouvez cette aide en cliquant sur le bouton HELP");
			ecrireConsoleMenu("\n\nAppuyer sur n'importe quel bouton pour\ncontinuer...");
		break;
		default:
			levelDisplayHelp = 0;
			ecrireConsoleGame(saveTexteConsoleGame);
			ecrireConsoleInventory(saveTexteConsoleInventory);
			ecrireConsoleMenu(saveTexteConsoleMenu);
			ecrireConsoleMap(saveTexteConsoleMap);
		break;
	}
}
function displayOptionsInGame(){
	clearConsoleMenu();
	ecrireConsoleMenu("1 - Sauvegarder la progression");
	ecrireConsoleMenu("2 - Charger une sauvegarde");
	ecrireConsoleMenu("3 - Quitter le jeu\n");
	ecrireConsoleMenu("4 - Ré-effectuer la calibration");
}
function displayGameCreationOptions(){
	ecrireConsoleGame("1 - Nombre de salles maximum : " + dungeon.nbRoomsMax);
	ecrireConsoleGame("2 - Nombre de salles minimum : " + dungeon.nbRoomsMin);
	ecrireConsoleGame("3 - Retour au menu principal\n");
}
function displayStartMenu(){
	menuEnCours = "StartMenu";
	clearConsoleMenu();
	ecrireConsoleMenu("Entrez votre choix dans la zone de texte");
	ecrireConsoleMenu("1 - Lancer une nouvelle partie");
	ecrireConsoleMenu("2 - Charger une partie sauvegardée");
	ecrireConsoleMenu("3 - Options de création de partie");
	ecrireConsoleMenu("4 - Battre le Seigneur du donjon");
	ecrireConsoleMenu("5 - Quitter le jeu");
}
function gameOverLoose(){
	clearConsoleGame();
	ecrireConsoleGame("Malheuresement vous ne serez pas ce héros qui débarassera le donjon du Mal...");
	gameRunning = false;
	player = null;
	dungeon = null;
}
function gameOverWin(){
	if (dungeon.boss instanceof Boss) {
		clearConsoleGame();
		ecrireConsoleGame("Vous avez vaincus le Mal qui pullulais dans ce donjon...");
		ecrireConsoleGame("Le donjon ne sera plus qu'un vieux tas de ruines pour l'éternité");
	} else {
		clearConsoleGame();
		ecrireConsoleGame("Le corps encore chaud du \"Seigneur\" repose à vos pieds...");
		ecrireConsoleGame("Son arrogance l'a conduit à sa perte mais ce n'est pas la fin des Seigneurs...");
		ecrireConsoleGame("Le temps de la tyrannie est arrivée ... Le temps de le seigneurerie de " + player.nom + "!");
	}
	gameRunning = false;
	player = null;
	dungeon = null;
}
function transmuteWeapon(level){
	switch(level){
		case 1:
			ecrireConsoleGame("Numéro de l'arme à transmutter ?");
		break;
		case 2:
			player.inventory.takeWeapon();
			player.inventory.addItem(new Weapon());
			levelTransmuteWeapon = 0;
		break;
	}
}
function checkPlayerIsAlive(player){
	if(p.hp<=0)
		player==null;
}
function actualiserInventaire(){
	clearConsoleInventory();
	ecrireConsoleInventory(player);
}

//Fonctions de (dé)activation des inputs
function blockAllInputs(){
	blockMovmentInputs();
	blockAttakInputs();
	blockTextInput();
	blockValidationInputs();
	blockInventoryInputs();
}
function unblockAllInputs(){
	unblockMovmentInputs();
	unblockAttakInputs();
	unblocTextInput();
	unblockValidationInputs();
	unblockInventoryInputs();
}
function blockValidationInputs(){
	document.getElementById("Valid").style.display = "none";
	document.getElementById("Unvalid").style.display = "none";
	document.getElementById("textActionInput").style.display = "none";
}
function unblockValidationInputs(){
	document.getElementById("Valid").style.display = "unset";
	document.getElementById("Unvalid").style.display = "unset";
	document.getElementById("textActionInput").style.display = "unset";
}
function blockMovmentInputs(){
	document.getElementById("Up").style.display = "none";
	document.getElementById("Left").style.display = "none";
	document.getElementById("Right").style.display = "none";
	document.getElementById("Down").style.display = "none";
	document.getElementById("textMovmentInput").style.display = "none";
}
function unblockMovmentInputs(){
	document.getElementById("Up").style.display = "unset";
	document.getElementById("Left").style.display = "unset";
	document.getElementById("Right").style.display = "unset";
	document.getElementById("Down").style.display = "unset";
	document.getElementById("textMovmentInput").style.display = "unset";
}
function blockAttakInputs(){
	document.getElementById("Attak").style.display = "none";
	document.getElementById("Flee").style.display = "none";
	document.getElementById("textCombatInput").style.display = "none";
}
function unblockAttakInputs(){
	document.getElementById("Attak").style.display = "unset";
	document.getElementById("Flee").style.display = "unset";
	document.getElementById("textCombatInput").style.display = "unset";
}
function blockTextInput(){
	document.getElementById("TextInput").style.display = "none";
	document.getElementById("textTextInput").style.display = "none";
}
function unblocTextInput(){
	document.getElementById("TextInput").style.display = "unset";
	document.getElementById("textTextInput").style.display = "unset";
}
function blockInventoryInputs(){
	document.getElementById("ChangeWeapon").style.display = "none";
	document.getElementById("UsePotion").style.display = "none";
	document.getElementById("UseLoot").style.display = "none";
	document.getElementById("textInventoryInput").style.display = "none";
}
function unblockInventoryInputs(){
	document.getElementById("ChangeWeapon").style.display = "unset";
	document.getElementById("UsePotion").style.display = "unset";
	document.getElementById("UseLoot").style.display = "unset";
	document.getElementById("textInventoryInput").style.display = "unset";
}
//Fonctions utiles :
function randn_bm() { //Fonction qui renvoie une valeur aléatoire suivant une loi normale(0,1)
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function generateItem(){ //Fonction qui génère un item aléatoire
	var r = Math.random();
	if(r<0.3333){
		return new Weapon();
	}else if(r<0.6666){
		return new Potion();
	}else{
		return new Loot();
	}
}

//Variables pour stocker les inputs
var valueTextInput = null;
var valueUp = null;
var valueDown = null;
var valueLeft = null;
var valueRigth = null;
var valueAttak = null;
var valueFlee = null;
var valueChangeWeapon = null;
var valueUsePotion = null;
var valueValid = null;
var valueUnvalid = null;

//Variables pour afficher correctement l'aide
var saveTexteConsoleGame = "";
var saveTexteConsoleInventory = "";
var saveTexteConsoleMenu = "";
var saveTexteConsoleMap = "";
var levelDisplayHelp = 0;

//Variables pour le fonctionnements des fonctions necessitants une entrée utilisateur
var levelStartGame = 0;
var levelOpenChest = 0;
var levelFight = 0;
var levelTransmuteWeapon = 0;
var levelUseLoot = 0;
var menuEnCours = null;

//Variables pour le fonctionnement du jeu
let dungeon = null;
let player = null;

//Début du jeu
blockAllInputs();
unblocTextInput();
displayStartMenu();
