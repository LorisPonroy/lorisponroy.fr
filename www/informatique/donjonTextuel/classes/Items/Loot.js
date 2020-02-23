import Item from "./Item.js";
import Utils from "../Utils";

export default class Loot extends Item{
    effet;
    constructor(){
        super();
        var effetLoot = ["Pierre à ponser","Coeur artificiel","Monocle de vérité","Cube horadrique"];
        this.effet = effetLoot[Utils.getRandomInt(effetLoot.length)];
    }
    toString(){
        return this.effet;
    }
}