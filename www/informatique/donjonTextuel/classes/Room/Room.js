import Chest from "../Events/Chest.js";
import Enemy from "../Entities/Enemy.js";
import Trap from "../Events/Trap.js";

import Utils from "../Utils.js";
import Entity from "../Entities/Entity.js";

export default class Room{
    explored;
    locked;
    key;
    chest;
    enemy;
    trap;

    constructor(locked){
        this.locked = locked;
        this.explored = false;
        if(locked){
            this.chest = new Chest(true);
            this.enemy = null;
        }else{
            var r = Utils.getRandomInt(6);
            switch(r){
                case 0:
                    break;
                case 1:
                    this.chest = new Chest();
                    this.enemy = null;
                    this.trap = null;
                    break;
                case 2:
                    this.chest = null;
                    this.enemy = new Enemy();
                    this.trap = null;
                    break;
                case 3:
                    this.chest = null;
                    this.enemy = null;
                    this.trap = new Trap();
                    break;
                case 4:
                    this.chest = new Chest();
                    this.enemy = new Enemy();
                    this.trap = null;
                    break;
                case 5:
                    this.chest = new Chest();
                    this.enemy = null;
                    this.Trap = new Trap();

            }
        }
    }
}