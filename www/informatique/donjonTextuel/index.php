 <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Donjon textuel - Loris Ponroy</title>
  <link href="css_index.css" rel="stylesheet">
  <link href="../../CSS/darktheme.css" rel="stylesheet">
    <link href="../../CSS/css_bandeau.css" rel="stylesheet">
  <link rel="icon" type="image/png" href="../../icones/icone_LP.png" />
</head>
<body>
    <header>
      <?php include ('../../bandeau.html')?>
    </header>
    <script type="module" src="Jeu.js" charset="UTF-8"></script>
  <h1>Le donjon textuel</h1>
  <h5 id="sous_titre">__________________________</h5>
  <br/>
  <div id="ConteneurJeu">
    <div style="height: 100%;width: 100%;">
      <div id="ConsolesHautes">
        <div id="MapConsole">
          <pre id="MapConsoleOutput"></pre>
        </div>
        <div id="MenuConsole">
          <pre id="MenuConsoleOutput"></pre>
        </div>
      </div>
      <div style="display: flex;height: 100%">
        <div id="GameConsole" style="overflow:scroll">
          <pre id="GameConsoleOutput"></pre>
        </div>
        <div id="Boutons">
          <div style="margin-right: 5vw"><!--Boutons de gauche -->
<!--            <text id="textMovmentInput" >Se déplacer</text><br/>-->
            <span class="infobulle" aria-label="Aller vers la salle au Nord"><button id="Up">▲</button></span>
            <div style="display: flex;">
              <span class="infobulle" aria-label="Aller vers la salle au à l'Ouest"><button id="Left">◄</button></span><div style="width: 1vw"></div>
              <span class="infobulle" aria-label="Aller vers la salle à l'Est"><button id="Right">►</button></span>
            </div>
            <span class="infobulle" aria-label="Aller vers la salle au Sud"><button id="Down">▼</button></span>
            <br/>
<!--            <text id="textCombatInput">En combat</text><br/>-->
<!--            <div style="display: flex;">-->
<!--              <span class="infobulle" aria-label="Attaquer"><button id="Attak" onclick="attak()">⚔</button></span>-->
<!--              <span class="infobulle" aria-label="Fuir le combat"><button id="Flee" onclick="flee()">💨</button></span>-->
<!--            </div>-->
<!--            <text id="textTextInput">Zone de texte</text><br/>-->
            <span class="infobulle" aria-label="Entrez du texte"><textarea id="TextInput"></textarea></span>
<!--            <text id="textActionInput">Actions</text><br/>-->
<!--            <div>-->
<!--              <span class="infobulle" aria-label="Valider l'action"><button id="Valid" onclick="valid()">✔️</button></span>-->
<!--              <span class="infobulle" aria-label="Invalider l'action"><button id="Unvalid" onclick="unvalid()">❌</button></span>-->
<!--            </div>-->
          </div>
          <div style="margin-right: 1vw"><!--Boutons de droite -->
<!--            <text id="textInventoryInput">Inventaire</text>-->
<!--            <span class="infobulle" aria-label="Changer d'arme"><button id="ChangeWeapon">🗡↺</button></span>-->
<!--            <br/><br/>-->
<!--            <span class="infobulle" aria-label="Utiliser une potion"><button id="UsePotion" onclick="usePotion()">⚗️</button></span>-->
<!--            <br/><br/>-->
<!--            <span class="infobulle" aria-label="Utiliser un objet"><button id="UseLoot" onclick="useLoot(1)">🔮</button></span>-->
<!--            <br/><br/><br/>-->
            <span class="infobulle" aria-label="Afficher l'aide"><button id="" onclick="help()">Aide</button></span><br><br>
            <INPUT type="checkbox" name="Désactiver les infobulles" value="valeur attachée au bouton" style="float: left;bottom: 0">Désactiver les infobulles</INPUT>
          </div>
        </div>
      </div>
    </div>
    <div id="InventoryConsole">
        <pre id="InventoryConsoleOutput"></pre>
      </div>
  </div>
  <br/><br/>
  <h1>Histoire du jeu</h1>
  <h5 id="sous_titre">__________________________</h5>
  <p>Initialement un projet de Programmation Orientée Objet (POO) en JAVA, ce petit jeu de donjon textuel à été mes premiers pas dans le language Java script. Mes connaissances en Java m'ont permis de facilement transposé le code du jeu original au script JS (non sans y apporter quelques améliorations au passage)</p>
</body>
</html>
