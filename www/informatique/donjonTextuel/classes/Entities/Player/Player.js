import Entity from "../Entity.js";
import Weapon from "../../Items/Weapon.js";
import Console from "../../../Console.js";
import Enemy from "../Enemy.js";
import Room from "../../Room/Room.js";
import Potion from "../../Items/Potion.js";

import * as Jeu from "../../../Jeu.js";
export default class Player extends Entity{
    currentRoom;
    inBattle;
    constructor(){
        super();
        this.hp=500;
        this.maxHp=500;
    }
    attack(enemy){
        Console.ecrireConsoleGame("<text class='naration'>"+this.nom + " attaque " + enemy.nom + " avec " + this.weapon.toString()+"</text>");
        enemy.takeDamage(this.weapon.damage + this.strength);
    }
    changeWeapon(number){
        this.inventory.addItem(this.weapon);
        this.weapon = this.inventory.takeWeapon(number);
    }
    takeDamage(damage){
        this.hp = this.hp - damage;
        if(damage>100){
            Console.ecrireConsoleGame("<text class='naration'><text style='color: blue'>"+this.nom + "</text> subit <text style='color: red;font-weight: bold'>" + damage + "</text> points de dégats ! Ca doit vraiment faire mal...</text>");
        }else{
            Console.ecrireConsoleGame("<text class='naration'><text style='color: blue'>"+this.nom + "</text> subit <text style='color: red;font-weight: bold'>" + damage + "</text> points de dégats !</text>");
        }
        Jeu.checkPlayerIsAlive();
    }
    toString(){
        return this.nom + "<text style='color: red;float: right'>" + this.hp + "/" + this.maxHp + "💖</text><br><br><text style='float: right'>Force: " + this.strength + "</text><br>Arme: " + this.weapon + "<br><br>" + this.inventory;
    }
    useLoot(number){
        switch(this.inventory.takeLoot(number).effet){
            case "Pierre à ponser":
                this.weapon.damage+=10;
                Jeu.actualiserInventaire();
                break;
            case "Coeur artificiel":
                this.maxHp+=10;
                this.hp+=10;
                Jeu.actualiserInventaire();
                break;
            case "Monocle de vérité":

                break;
            case "Cube horadrique":

                break;
            default:
                console.log("ERREUR, item non trouvé")
                break;
        }
    }
    usePotion(number){
        Console.ecrireConsoleGame("<text class='naration'>Sur qui utiliser la potion ?</text>");
        let idBtnPlayer = Math.random();
        let idBtnEnemy = Math.random();
        let buttons = "<text class='naration'><button class='inventoryButton' id='"+idBtnPlayer+"'>"+this.nom+"</button></text>";
        let enemy = this.currentRoom.enemy;
        if(enemy!=null) {
            buttons += " <text class='naration'><button class='inventoryButton' id='"+idBtnEnemy+"'>" + this.currentRoom.enemy.nom + "</button></text>";
        }
        Console.ecrireConsoleGame(buttons);
        document.getElementById(""+idBtnPlayer).addEventListener("click",function () {
            let potion = Jeu.player.inventory.takePotion(number);
            Jeu.player.receivePotionEffect(potion);
            Jeu.actualiserInventaire();
        });
        document.getElementById(""+idBtnEnemy).addEventListener("click",function () {
            let potion = Jeu.player.inventory.takePotion(number);
            enemy.receivePotionEffect(potion);
        });
    }
}