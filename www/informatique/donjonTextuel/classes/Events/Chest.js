import Utils from "../Utils.js";

export default class Chest{
    items = [];
    constructor(golded){
        var nbItems = Math.random();
        if(!golded){
            if(nbItems<0.33){
                this.items.push(Utils.generateItem());
            }else if(nbItems<0.66){
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
            }else if(nbItems<0.90){
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
            }else{
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
            }
        }else{
            if(nbItems<0.33){
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
            }else if(nbItems<0.66){
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
            }else if(nbItems<0.90){
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
            }else{
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
                this.items.push(Utils.generateItem());
            }
        }
    }
    toString(){
        let ans = "";
        for(let i = 0;i<this.items.length;i++){
            ans+= "<br> - " + this.items[i];
        }
        return ans;
    }
}