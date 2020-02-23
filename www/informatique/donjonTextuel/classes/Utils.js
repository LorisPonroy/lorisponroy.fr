import Weapon from "./Items/Weapon.js";
import Potion from "./Items/Potion.js";
import Loot from "./Items/Loot.js";

function randn_bm() { //Fonction qui renvoie une valeur aléatoire suivant une loi normale(0,1)
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
function getRandomInt(max) {
    let x = Math.floor(Math.random() * Math.floor(max))+"";
    return parseInt(x,10);
}
function generateItem(){ //Fonction qui génère un item aléatoire
    let r = Math.random();
    if(r<0.3333){
        return new Weapon();
    }else if(r<0.6666){
        return new Potion();
    }else{
        return new Loot();
    }
}

export default {randn_bm,getRandomInt,generateItem};