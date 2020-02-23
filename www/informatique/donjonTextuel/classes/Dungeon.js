import Room from "./Room/Room.js";
import Key from "./Items/Item.js";
import Enemy from "./Entities/Enemy.js";
import Chest from "./Events/Chest.js";
import Trap from "./Events/Trap.js";

import Entity from "./Entities/Entity.js";
import Player from "./Entities/Player/Player.js";

import Utils from "./Utils.js";
import Console from "../Console.js";
import * as Jeu from "../Jeu.js";

export default class Dungeon{
    static nbRoomsMax = 20;
    static nbRoomsMin = 5;
    currentRoomOfPlayer;
    boss;
    rooms;
    bossRooms;
    startRoom;
    endRoom;
    constructor(){
        let nbRooms = Utils.getRandomInt(Dungeon.nbRoomsMax-Dungeon.nbRoomsMin) + Dungeon.nbRoomsMin;
        let nbLockedRooms = Utils.getRandomInt(Math.round(nbRooms/4));
        let nbRoomsCreate = 1;
        let nbLockedRoomsCreate = 0;
        this.rooms = [];
        for (let i = 0; i <nbRooms*2; i++) {
            this.rooms[i] = [];
        }
        console.log("MAX : " + Dungeon.nbRoomsMax);
        console.log("MIN : " + Dungeon.nbRoomsMin);
        console.log("NB : " + (nbRooms*2)/2);
        nbRooms = (nbRooms*2)/2;
        this.rooms[nbRooms][nbRooms] = new Room(false);
        while(nbRoomsCreate<nbRooms){
            let x = Utils.getRandomInt(nbRooms*2);
            let y = Utils.getRandomInt(nbRooms*2);
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
        let yCoordMostDownRoom = nbRooms;
        let xCoordMostDownRoom = nbRooms;
        for (let i = 0; i < nbRooms*2; i++) {
            for (let j = 0; j < nbRooms*2; j++) {
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
        let yCoordMostUpRoom = nbRooms;
        let xCoordMostUpRoom = nbRooms;
        for (let i = 0; i < nbRooms*2; i++) {
            for (let j = 0; j < nbRooms*2; j++) {
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
        let keys = [];
        while(nbLockedRoomsCreate<nbLockedRooms){
            let x = Utils.getRandomInt(nbRooms*2);
            let y = Utils.getRandomInt(nbRooms*2);

            if(!(this.rooms[x][y] instanceof Room)){
                try{
                    if ((this.rooms[x + 1][y] instanceof Room) || (this.rooms[x - 1][y] instanceof Room)
                        || (this.rooms[x][y - 1] instanceof Room) || (this.rooms[x][y + 1] instanceof Room)) {
                        this.rooms[x][y] = new Room(true);
                        nbLockedRoomsCreate++;
                        let key = new Key();
                        this.rooms[x][y].key = key;
                        keys.push(key);
                    }
                }catch(error){
                }
            }
        }
        //Puis on dispatch les clés parmis les coffres ou les enemies
        let keyKeepers = [];
        for (let i = 0; i < nbRooms * 2; i++) {
            for (let j = 0; j < nbRooms * 2; j++) {
                try {
                    if (this.rooms[i][j].enemy instanceof Enemy)
                        keyKeepers.push(this.rooms[i][j].getEnemy());
                    if (this.rooms[i][j].chest instanceof Chest)
                        keyKeepers.push(this.rooms[i][j].getChest());
                } catch (e) {
                }
            }
        }
        for (let i = 0; i < this.nbLockRooms; i++){
            try {
                keyKeepers[Utils.getRandomInt(keyKeepers.length)].addKey(keys[i]);
            } catch (e) {
            }
        }
    }
    setRoomsMax(nbRooms){
        if(nbRooms<this.nbRoomsMin)
            nbRooms=this.nbRoomsMin;
        this.nbRoomsMax = nbRooms;
    }
    setRoomsMin(nbRooms){
        if(nbRooms<1)
            nbRooms = 1;
        if(nbRooms>this.nbRoomsMax)
            nbRooms = this.nbRoomsMax;
        this.nbRoomsMin = nbRooms;
    }
    goUp(){
        let playerCurrentRoom = Jeu.player.currentRoom;
        let iCoordPlayerCurrentRoom = 0;
        let jCoordPlayerCurrentRoom = 0;
        for (let i = 0; i < this.rooms.length; i++) {
            for (let j = 0; j < this.rooms.length; j++) {
                if (playerCurrentRoom === this.rooms[i][j]) {
                    iCoordPlayerCurrentRoom = i;
                    jCoordPlayerCurrentRoom = j;
                }
            }
        }
        if ((this.rooms[iCoordPlayerCurrentRoom - 1][jCoordPlayerCurrentRoom] != null)
            && !this.rooms[iCoordPlayerCurrentRoom - 1][jCoordPlayerCurrentRoom].locked) {
                Jeu.player.currentRoom = this.rooms[iCoordPlayerCurrentRoom - 1][jCoordPlayerCurrentRoom];
                this.discoverRoom(iCoordPlayerCurrentRoom - 1, jCoordPlayerCurrentRoom);
                Console.clearConsoleGame();
                this.triggerEventCurrentRoom();

            this.drawMap(Jeu.player.currentRoom);
        }
    }
    goDown(){
        let playerCurrentRoom = Jeu.player.currentRoom;
        let iCoordPlayerCurrentRoom = 0;
        let jCoordPlayerCurrentRoom = 0;
        for (let i = 0; i < this.rooms.length; i++) {
            for (let j = 0; j < this.rooms.length; j++) {
                if (playerCurrentRoom === this.rooms[i][j]) {
                    iCoordPlayerCurrentRoom = i;
                    jCoordPlayerCurrentRoom = j;
                }
            }
        }
        if ((this.rooms[iCoordPlayerCurrentRoom + 1][jCoordPlayerCurrentRoom] != null)
            && !this.rooms[iCoordPlayerCurrentRoom + 1][jCoordPlayerCurrentRoom].locked) {
            Jeu.player.currentRoom = this.rooms[iCoordPlayerCurrentRoom + 1][jCoordPlayerCurrentRoom];
            this.discoverRoom(iCoordPlayerCurrentRoom + 1, jCoordPlayerCurrentRoom);
            Console.clearConsoleGame();
            this.triggerEventCurrentRoom();
            this.drawMap(Jeu.player.currentRoom);
        }
    }
    goLeft(){
        let playerCurrentRoom = Jeu.player.currentRoom;
        let iCoordPlayerCurrentRoom = 0;
        let jCoordPlayerCurrentRoom = 0;
        for (let i = 0; i < this.rooms.length; i++) {
            for (let j = 0; j < this.rooms.length; j++) {
                if (playerCurrentRoom === this.rooms[i][j]) {
                    iCoordPlayerCurrentRoom = i;
                    jCoordPlayerCurrentRoom = j;
                }
            }
        }
        if ((this.rooms[iCoordPlayerCurrentRoom][jCoordPlayerCurrentRoom - 1] != null)
            && !this.rooms[iCoordPlayerCurrentRoom][jCoordPlayerCurrentRoom - 1].locked) {
            Jeu.player.currentRoom = this.rooms[iCoordPlayerCurrentRoom][jCoordPlayerCurrentRoom - 1];
            this.discoverRoom(iCoordPlayerCurrentRoom, jCoordPlayerCurrentRoom-1);
            Console.clearConsoleGame();
            this.triggerEventCurrentRoom();
            this.drawMap(Jeu.player.currentRoom);
        }
    }
    goRight(){
        let playerCurrentRoom = Jeu.player.currentRoom;
        let iCoordPlayerCurrentRoom = 0;
        let jCoordPlayerCurrentRoom = 0;
        for (let i = 0; i < this.rooms.length; i++) {
            for (let j = 0; j < this.rooms.length; j++) {
                if (playerCurrentRoom === this.rooms[i][j]) {
                    iCoordPlayerCurrentRoom = i;
                    jCoordPlayerCurrentRoom = j;
                }
            }
        }
        if ((this.rooms[iCoordPlayerCurrentRoom][jCoordPlayerCurrentRoom + 1] != null)
            && !this.rooms[iCoordPlayerCurrentRoom][jCoordPlayerCurrentRoom + 1].locked) {
            Jeu.player.currentRoom = this.rooms[iCoordPlayerCurrentRoom][jCoordPlayerCurrentRoom + 1];
            this.discoverRoom(iCoordPlayerCurrentRoom, jCoordPlayerCurrentRoom+1);
            Console.clearConsoleGame();
            this.triggerEventCurrentRoom();
            this.drawMap(Jeu.player.currentRoom);
        }
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
        Console.clearConsoleMap();
        let iCoordOfCentredRoom = null;
        let jCoordOfCentredRoom = null;
        for (let i = 0; i < this.rooms.length; i++) {
            for (let j = 0; j < this.rooms.length; j++) {
                if (centredRoom === this.rooms[i][j]) {
                    iCoordOfCentredRoom = i;
                    jCoordOfCentredRoom = j;
                }
            }
        }
        if(jCoordOfCentredRoom==null || iCoordOfCentredRoom==null){
            console.log("Erreur, impossible de trouver la salle")
            return;
        }
        // pour afficher la carte
        let line1 = "";
        let line2 = "";
        let line3 = "";
        let roomContent = "";
        for (let i = iCoordOfCentredRoom - 3; i < (iCoordOfCentredRoom + 3); i++) {
            for (let j = jCoordOfCentredRoom - 3; j < (jCoordOfCentredRoom + 3); j++) {
                roomContent = "";
                try {
                    if (this.rooms[i][j] === Jeu.player.currentRoom)
                        roomContent += "<";
                    if (this.rooms[i][j] === this.endRoom)
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
                                let b = this.rooms[i][j + 1] !== undefined;
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
            Console.ecrireConsoleMap(line1);
            Console.ecrireConsoleMap(line2);
            Console.ecrireConsoleMap(line3);
            line1 = "";
            line2 = "";
            line3 = "";
        }
    }

     triggerEventCurrentRoom() {
        this.drawMap(Jeu.player.currentRoom);
        if ((Jeu.player != null) && (Jeu.player.currentRoom.enemy != null)) { // Si le joueur
            // n'est pas mort et
            // qu'il y a un
            // ennemi
            //Console.ecrireConsoleGame("Vous tombez nez à nez avec un ennemi !");
            // let passToFlee = 0;
            // if (checkMovement(Direction.Nord, false))
            //     passToFlee++;
            // if (checkMovement(Direction.Sud, false))
            //     passToFlee++;
            // if (checkMovement(Direction.Ouest, false))
            //     passToFlee++;
            // if (checkMovement(Direction.Est, false))
            //     passToFlee++;
            //
            Jeu.player.currentRoom.enemy.attack(Jeu.player);
            if(Jeu.player==null)
                return;
            let rdmYes = Math.random();
            let rdmNo = Math.random();
            Console.ecrireConsoleGame("<text class='naration'>Que voulez-vous faire ? <button id='"+rdmYes+"' class='yesButton'>⚔</button> <button id='"+rdmNo+"' class='noButton'>💨</button></text>");
            document.getElementById(""+rdmYes).addEventListener("click",function () {
                Jeu.player.inBattle = true;
                Jeu.player.attack(Jeu.player.currentRoom.enemy);
                if(Jeu.player.currentRoom.enemy.hp<=0){
                    Console.ecrireConsoleGame("<text class='dialog'>"+Jeu.player.currentRoom.enemy.nom + " : " + Jeu.player.currentRoom.enemy.deathSentance + "</text>");
                    Console.ecrireConsoleGame("<text class='naration'>Vous avez vaincu votre enemi !</text>");
                    Jeu.player.currentRoom.enemy = null;
                }
                document.getElementById(""+rdmNo).style.backgroundColor = "grey";
                Jeu.actualiserInventaire();
                Console.clearConsoleGame();
                Jeu.dungeon.triggerEventCurrentRoom();
            });
            document.getElementById(""+rdmNo).addEventListener("click",function () {
                document.getElementById(""+rdmYes).style.backgroundColor = "grey";
            });
        }
        else if ((Jeu.player != null) && (Jeu.player.currentRoom.trap != null)) { // si le joueur n'est
            // pas mort et qu'il
            // y a un piège
            Console.ecrireConsoleGame("<text class='naration'>Vous n'avez pas vu le piège !</text>");
            Console.ecrireConsoleGame("<text class='naration'>"+Jeu.player.currentRoom.trap.triggerSentence+"</text>");
            Jeu.player.takeDamage(Jeu.player.currentRoom.trap.damage);
            Jeu.actualiserInventaire();
            Jeu.player.currentRoom.trap=null;
        }
        else if ((Jeu.player != null) && (Jeu.player.currentRoom.chest != null)) {// Si le joueur n'est
            // pas mort et qu'il
            // y a un coffre
            Console.ecrireConsoleGame("<text class='naration'>Vous trouvez un coffre !</text>");
            let rdmYes = Math.random();
            let rdmNo = Math.random();
            Console.ecrireConsoleGame("<text class='naration'>Voulez-vous ouvrir le coffre ? <button id='"+rdmYes+"' class='yesButton'>oui</button> <button id='"+rdmNo+"' class='noButton'>non</button></text>");
            document.getElementById(""+rdmYes).addEventListener("click",function () {
                Console.ecrireConsoleGame("<text class='naration'>Butin obtenu : "+ Jeu.player.currentRoom.chest +"</text>");
                Jeu.player.inventory.addItems(Jeu.player.currentRoom.chest.items);
                Jeu.actualiserInventaire();
                document.getElementById(""+rdmNo).style.backgroundColor = "grey";
                Jeu.player.currentRoom.chest = null;
                Jeu.dungeon.triggerEventCurrentRoom();

            });
            document.getElementById(""+rdmNo).addEventListener("click",function () {
                Console.clearConsoleGame();
                Console.ecrireConsoleGame("<text class='naration'>Vous laissez ce magnifique coffre ici</text>");
                document.getElementById(""+rdmYes).style.backgroundColor = "grey";
            });
        }
        else if ((Jeu.player != null) && (this.currentRoomOfPlayer === this.endRoom)) {// Si le joueur n'est pas mort et que c'est
            // la salle finale, on lance l'evenement
            // du boss
            Jeu.player.inBattle=true;
            //Game.startFightBoss(boss);
        }

    }
}
