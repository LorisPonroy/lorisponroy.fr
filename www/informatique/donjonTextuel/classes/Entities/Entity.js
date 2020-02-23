import Inventory from "./Player/Inventory.js";
import Weapon from "../Items/Weapon.js";
import Potion from "../Items/Potion.js";
import Console from "../../Console.js";

import * as Jeu from "../../Jeu.js";

export default class Entity{
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
        Console.ecrireConsoleGame("<text class='naration'>"+this.nom + " recoit un effet de potion !</text>");
        Jeu.checkPlayerIsAlive();
    }
}