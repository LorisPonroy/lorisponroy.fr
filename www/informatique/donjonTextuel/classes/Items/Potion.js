import Item from "./Item.js";

export default class Potion extends Item{
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