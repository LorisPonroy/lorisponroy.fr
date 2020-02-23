import Entity from "./Entity.js";
import Utils from "../Utils.js";
import Console from "../../Console.js";
import Potion from "../Items/Potion.js";
export default class Enemy extends Entity{
    deathSentance;
    constructor(){
        super();
        let enemyNames = [
            'Zombi',
            'Mage squelette',
            'Femme-Renarde enragée',
            'Succube',
            'Araignée géante',
            'Nazi peu commode',
            'Sous-fifre',
            'Dangereux choux de Bruxelles',
            'Homme-Loup des Bois',
            'T-Rex',
            'Mignon petit chaton',
            'SS d\'Élite',
            'Stagiaire'
        ];
        let enemyDeathSentence = [
            "Moiii pas mangeeeer cerveauuuu",
            "Le pouvoir s'éteint en moi...",
            "di di di ding",
            "Vous payerez pour cela, vilain",
            "Cssss Cssss",
            "neeeiiin !",
            "Ma vie de souffrance arrive à son terme",
            "Beeeeuurk",
            "Ahh woooooooo",
            "RHOAAAAAA",
            "Miaaouu",
            "nein nein nein",
            "Quel micmak..."
        ];
        let r = Utils.getRandomInt(enemyNames.length);
        this.nom = enemyNames[r];
        this.deathSentance = enemyDeathSentence[r];
        this.maxHp = Math.round(Math.random()*150+50);
        this.hp = this.maxHp;
        let nbItems = Math.random();
        if(nbItems<0.33){
            this.inventory.addItem(Utils.generateItem());
        }else if(nbItems<0.66){
            this.inventory.addItem(Utils.generateItem());
            this.inventory.addItem(Utils.generateItem());
        }else if(nbItems<0.90){
            this.inventory.addItem(Utils.generateItem());
            this.inventory.addItem(Utils.generateItem());
            this.inventory.addItem(Utils.generateItem());
        }else{
            this.inventory.addItem(Utils.generateItem());
            this.inventory.addItem(Utils.generateItem());
            this.inventory.addItem(Utils.generateItem());
            this.inventory.addItem(Utils.generateItem());
        }
    }
    addKey(key){
        this.inventory.addItem(key);
    }
    attack(enemy){
        Console.ecrireConsoleGame("<text style='color: crimson'>"+this.nom + "</text> attaque " + enemy.nom + " avec " + this.weapon.toString());
        enemy.takeDamage(this.weapon.damage + this.strength);
        if(Math.random()<0.7777){
            this.usePotion(enemy);
        }
    }
    takeDamage(damage){
        this.hp = this.hp - damage;
        if(damage>100){
            Console.ecrireConsoleGame("<text style='color: crimson'>"+this.nom + "</text> subit <text style='color: red;font-weight: bold'>" + damage + "</text> points de dégats ! Ca doit vraiment faire mal...");
        }else{
            Console.ecrireConsoleGame("<text style='color: crimson'>"+this.nom + "</text> subit <text style='color: red;font-weight: bold'>" + damage + "</text> points de dégats !");
        }
    }
    usePotion(enemy){
        if(this.hp<100){
            try{
                let potion = null;
                this.inventory.potions.forEach(function(item, index, array) {
                    if(item.effet==="Soin")
                        potion = item;
                });
                this.receivePotionEffect(potion);
                Console.ecrireConsoleGame(this.nom +" utilise une potion de soin ! Il récupère " + potion.heal + " PV");
            }catch(error){
                console.log(error);
            }
        }
        if(enemy.hp<100){
            try{
                let potion = null;
                this.inventory.potions.forEach(function(item, index, array) {
                    if(item.effet==="Dégat")
                        potion = item;
                });
                Console.ecrireConsoleGame(this.nom +" utilise une potion de dégats !" + enemy.nom + " perd " + potion.heal);
                enemy.receivePotionEffect(potion);
            }catch(error){
                console.log(error);
            }
        }
    }
}