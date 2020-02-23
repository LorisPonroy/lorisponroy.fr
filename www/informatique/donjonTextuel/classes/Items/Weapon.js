import Item from "./Item.js";
import Utils from "../Utils";

export default class Weapon extends Item{
    damage;
    constructor(){
        super();
        var weaponNames = ['Dague','Arme de poing','Arc long','Arc court','Rapière','Épée longue','Épée courte','Shuriken','Glaive'];
        var weaponAdj = ['du barbare','magique','rare','de feu','de foudre','de glace','ensorcelé','du Roi Squelette','horrifique','sublime','de la démence','de nain','du Dragon'];
        this.damage = Math.round(Utils.randn_bm()*15+50);
        this.nom = weaponNames[Utils.getRandomInt(weaponNames.length)] +" "+weaponAdj[Utils.getRandomInt(weaponAdj.length)];
    }
    toString(){
        var color = "white";
        if(this.damage<=30){
            color = "grey";
        }else if(this.damage<=60){
            color = "blue";
        }else if(this.damage<=90){
            color = "darkviolet";
        }else{
            color ="goldenrod";
        }
        return "<text style='color: "+color+"'>"+this.nom + "["+this.damage+"]</text>";
    }
}