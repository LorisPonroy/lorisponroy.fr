import Weapon from "../../Items/Weapon.js";
import Potion from "../../Items/Potion.js";
import Loot from "../../Items/Loot.js";
import Key from "../../Items/Key.js";
import Player from "./Player.js";

import Console from "../../../Console.js";

export default class Inventory{
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
        else if (item instanceof Potion) {
            this.potions.push(item);
        }
        else if (item instanceof Loot) {
            this.loots.push(item);
        }
        else if (item instanceof Key) {
            this.keys.push(item);
        }else{
            console.log("Item non reconnu");
        }
    }
    addItems(items){
        for (var i = 0; i < items.length; i++) {
            this.addItem(items[i]);
        }
    }
    takeAllItems(){

    }
    takeKey(number){
        let key = this.keys[number];
        this.keys.splice(number,1);
        return key;
    }
    takeLoot(number){
        let loot = this.loots[number];
        this.loots.splice(number,1);
        return loot;
    }
    takePotion(number){
        let potion = this.potions[number];
        this.potions.splice(number,1);
        return potion;
    }
    takeWeapon(number){
        let weapon = this.weapons[number];
        this.weapons.splice(number,1);
        return weapon;
    }
    toString(){
        var s = "<br><br>Armes (" + this.weapons.length +")";
        var num = 0;
        for (var i = 0; i < this.weapons.length; i++) {
            num++;
            s+="<br/>   " + this.weapons[i].toString() +" <button class='inventoryButton' id='Weapon"+i+"'>Équiper!</button>";
        }
        s+= "<br><br>Potions (" + this.potions.length +")";
        num = 0;
        for (var i = 0; i < this.potions.length; i++) {
            num++;
            s+="<br/>   " + this.potions[i].toString() +" <button class='inventoryButton' id='Potion"+i+"'>Utiliser!</button>";
        }
        s+= "<br><br>Objets (" + this.loots.length +")";
        num = 0;
        for (var i = 0; i < this.loots.length; i++) {
            num++;
            s+="<br/>   " + this.loots[i].toString() +" <button class='inventoryButton' id='Loot"+i+"'>Utiliser!</button>";
        }
        s+= "<br><br>Clés (" + this.keys.length +")";
        num = 0;
        for (var i = 0; i < this.keys.length; i++) {
            num++;
            s+="<br/>   " + this.keys[i].toString() +" <button class='inventoryButton' id='Key"+i+"'>Utiliser!</button>";
        }
        return s;
    }

    onWeaponUse(i){
        console.log("Changement d'arme");
        let p = new Player();
        p.changeWeapon(i);
    }
    onPotionUse(){

    }
    onLootUse(){

    }
    onKeyUse(){

    }
}