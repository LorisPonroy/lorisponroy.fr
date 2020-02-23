import * as Jeu from "./Jeu.js"

export default class Console {
    static consoleMap = document.getElementById("MapConsoleOutput");
    static consoleMenu = document.getElementById("MenuConsoleOutput");
    static consoleInventory = document.getElementById("InventoryConsoleOutput");
    static consoleGame = document.getElementById("GameConsoleOutput");

    static ecrireConsole(texte,console){
        if(console.innerHTML!=="" && console.innerHTML!=="\n"){
            console.innerHTML = console.innerHTML + '<br>' + texte;
        }else{
            console.innerHTML = texte;
        }
    }

    static ecrireConsoleMap(texte){
        this.ecrireConsole(texte,this.consoleMap);
    }
    static clearConsoleMap(){
        this.consoleMap.innerHTML = "";
    }

    static ecrireConsoleMenu(texte){
        this.ecrireConsole(texte,this.consoleMenu);
    }
    static clearConsoleMenu(){
        this.consoleMenu.innerHTML = "";
    }

    static ecrireConsoleInventory(texte){
        this.ecrireConsole(texte,this.consoleInventory);
    }
    static clearConsoleInventory(){
        this.consoleInventory.innerHTML = "";
    }

    static ecrireConsoleGame(texte) {
            this.consoleGame.innerHTML = this.consoleGame.innerHTML.split('<br id=\"ajoutConsole\">').join("");
            Console.consoleGame.innerHTML = this.consoleGame.innerHTML + '<br>' + texte + "<br id='ajoutConsole'><br id='ajoutConsole'><br id='ajoutConsole'> ";
            document.getElementById("GameConsole").scrollTop = Console.consoleGame.scrollHeight;
    }
    static clearConsoleGame(){
        //this.consoleGame.innerHTML = "";
        document.getElementById("GameConsole").scrollTop = this.consoleGame.scrollHeight;
    }

    static displayStartMenu(){
        this.clearConsoleMenu();
        this.ecrireConsoleMenu("<center>Le Donjon textuel</center>");
        this.ecrireConsoleMenu("<button class='menuButton' id='startNewGame'>Lancer une nouvelle partie</button>");
        this.ecrireConsoleMenu("<button class='menuButton' id='optionCreationPartie'>Options de création de partie</button>");
        this.ecrireConsoleMenu("<button class='menuButton' disabled>Charger une partie sauvegardée (SOON)</button>");
        this.ecrireConsoleMenu("<button class='menuButton' disabled>Battre le Seigneur du donjon (SOON)</button>");
        this.ecrireConsoleMenu("");
        document.getElementById("startNewGame").addEventListener("click",function () {
            Jeu.startGame(false);
        });
        document.getElementById("optionCreationPartie").addEventListener("click",function () {
            Console.displayGameCreationOptions();
        });
    }
    static displayGameCreationOptions(){
        this.clearConsoleMenu();
        Console.ecrireConsoleMenu("Nombre de salles maximum : <input type='number' id='nbRoomsMax' value='"+ Jeu.nbRoomsMax+"'>");
        Console.ecrireConsoleMenu("Nombre de salles minimum : <input type='number' id='nbRoomsMin' value='"+ Jeu.nbRoomsMin+"'>");
        Console.ecrireConsoleMenu("<button class='menuButton' id='retourMenu'>Retour au menu principal</button>");
        document.getElementById("retourMenu").addEventListener("click",function () {
            Jeu.setNbRoomMaw(document.getElementById("nbRoomsMax").value);
            Jeu.setNbRoomMin(document.getElementById("nbRoomsMin").value);
            Console.displayStartMenu();
        });
    }
}
