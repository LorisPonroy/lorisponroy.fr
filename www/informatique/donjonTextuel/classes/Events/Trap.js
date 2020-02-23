import Utils from "../Utils.js";

export default class Trap{
    viewed;
    damage;
    triggerSentence;
    constructor(){
        this.viewed = false;
        this.damage = Math.round(Math.random()*9+1);
        var triggerSentences = ['Un énorme piège à Ours s\'est rabattu sur vous','des minuscules fléchettes volent vers vous','un javelot tombant de nul part manque de vous empaller','Une potion vole sur vous !'];
        this.triggerSentence = triggerSentences[Utils.getRandomInt(triggerSentences.length)];
    }
}