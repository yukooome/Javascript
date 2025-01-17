//#region 1) Récupérer tous les éléments dont on aura besoin
// Images joueur
const IMGS_PLAYER = document.querySelectorAll("#player-hand img");

// Score joueur
const SCORE_PLAYER = document.getElementById("score-player");

// Image ordi
const IMG_COMPUTER = document.getElementById("computer-hand");

// Score ordi
const SCORE_COMPUTER = document.getElementById("score-computer");

// Résultat central
const RESULT = document.querySelector(".resultat");

// Historique parties
const GAMES_PLAYER = document.getElementById("games-player");
const GAMES_COMPUTER = document.getElementById("games-computer");


// Bouton rejouer
const REPLAY = document.getElementById("replay");

// Bouton effacer historique
const ERASE = document.getElementById("erase");
//#endregion


// 2) Tableau avec les valeurs possibles
const CHOICES = ["pierre", "feuille", "ciseaux"];

// Récupération du localStorage pour voir si un historique était déjà en place
// ?? -> Coalesce
// Prend la valeur à gauche des ?? si elle n'est pas null sinon prendra la valeur à droite des ??
GAMES_PLAYER.textContent = localStorage.getItem("player") ?? "0" ; 
// équivalent avec une ternaire
// GAMES_PLAYER.textContent = localStorage.getItem("player") !== null ? localStorage.getItem("player") : "0"
GAMES_COMPUTER.textContent = localStorage.getItem("computer") ?? "0";


// 3) Ajouter un évènement aux images du player
// IMGS_PLAYER.forEach(IMG => {})
// for (const IMG of IMGS_PLAYER) {
//     // je renseigne le nom de la fonction a déclencher au click
//     // attention, je ne veux pas l'activer au moment où la ligne est lue donc pas de plays()
//     IMG.addEventListener('click', play)
// }
activateImg();


REPLAY.addEventListener('click', () => {
    SCORE_PLAYER.textContent = 0;
    SCORE_COMPUTER.textContent = 0;
    IMG_COMPUTER.src = "./images/waiting.jpg";
    IMGS_PLAYER.forEach(img => img.classList.remove("disabled"));
    activateImg();
    RESULT.textContent = "Cliquez sur une image pour jouer";
})

ERASE.addEventListener('click', () => {
    localStorage.clear();
    GAMES_PLAYER.textContent = "0" ; 
    GAMES_COMPUTER.textContent = "0";
})


function play(e) {
        deactivateImg();
        //#region Explications sur le paramètre e
        //Si un paramètre est ajouté dans la fonction présente dans l'eventListener, il représente d'office l'évènement déclenché
        //e -> variable contenant un objet qui réprésente l'évènement qui vient d'être déclenché (par convention, on l'appelle e ou event)
        // on y retrouve plusieurs informations qui peuvent être pratiques
        // Celle qui nous interesse actuellement : e.target -> représente l'élément html qui vient de déclencher l'event

        //ici, e.target contient l'image qui vient de déclencher l'event
        // je vais pouvoir récupérer son alt, qui contenait le mot joué
        //#endregion

        const playerChoice = e.target.alt;
        console.log("PLAYER : ", playerChoice);

        // Mettre en évidence le choix du joueur
        IMGS_PLAYER.forEach(currentIMG => {
            //On parcourt les trois images et si l'image qu'on est en train de parcourir n'est pas celle sur laquelle on vient de cliquer, on ajoute notre classe qui grise
            if (currentIMG !== e.target) {
                currentIMG.classList.add("disabled");
            }
            else {
                //Si les deux correspondent, on enlève la classe qui aurait pu être mise à la manche précédente
                currentIMG.classList.remove("disabled");
            }
        })

        // 4) Génération du choix de l'ordinateur
        //#region Math.random() 
        // Math.random() : 0 -> 0.9999...
        // Math.random() * 3 : 0 -> 2.999999...
        // Math.floor() : arrondi vers l'entier inférieur donc : 0 -> 2
        // const nbRand = Math.floor(Math.random() * 3)
        // const computerChoice = CHOICES[nbRand];
        //#endregion

        // 7) Mise en place des images qui défilent
        //Lancement des images qui défilent toutes les 150ms
        let currentIndexImg = 0;
        const INTERVAL = setInterval(() => {
            currentIndexImg++;
            if (currentIndexImg >= CHOICES.length) currentIndexImg = 0;
            IMG_COMPUTER.src = `./images/${CHOICES[currentIndexImg]}.jpg`
        }, 150)

        //Arrêt du défilement des images et suite de notre algo
        setTimeout(() => {
            clearInterval(INTERVAL);

            //Attention, on veut générer le choix du computer à la fin de l'""""animation""""
            const computerChoice = CHOICES[Math.floor(Math.random() * 3)];
            console.log("COMPUTER : ", computerChoice);
            IMG_COMPUTER.src = `./images/${computerChoice}.jpg`;
            // or IMG_COMPUTER.setAttribute("src", `./images/${computerChoice}.jpg` );

            // 5) Résolution de la manche :
            roundResolution(playerChoice, computerChoice);

            // 6) Résolution de la partie
            isGameOver();
        }, 1500)
}

/**
 * Désactive le fait de pouvoir cliquer sur les images
 */
function deactivateImg() {
    for(const IMG of IMGS_PLAYER){
        IMG.removeEventListener('click', play)
    }
}

/**
 * Active le fait de pouvoir cliquer sur les images
 */
function activateImg() {
    for(const IMG of IMGS_PLAYER){
        IMG.addEventListener('click', play)
    }
}


/**
 * Gère la résolution d'une manche
 * @param {string} player
 * @param {string} computer
 */
function roundResolution(player, computer) {
    if (player === computer) {
        RESULT.textContent = "C'est une égalité !"
    }
    else if (player === "pierre" && computer === "ciseaux"
        || player === "feuille" && computer === "pierre"
        || player === "ciseaux" && computer === "feuille"
    ) {
        RESULT.textContent = `${player} gagne contre ${computer}`;
        SCORE_PLAYER.textContent++;
    }
    else {
        RESULT.textContent = `${player} perd contre ${computer}`
        SCORE_COMPUTER.textContent++;
    }

    //Réactiver le fait que les images soient clickables
    activateImg();
}

/** 
 * Vérifie si la partie est terminée et gère l'affichage si oui
*/
function isGameOver() {
    if (SCORE_COMPUTER.textContent >= 3 || SCORE_PLAYER.textContent >= 3) {
        deactivateImg();

        if (SCORE_PLAYER.textContent >= 3) {
            RESULT.textContent = "Bravo vous avez gagné la partie ! Cliquez sur rejouer";
            GAMES_PLAYER.textContent++;
        }
        else {
            RESULT.textContent = "Loser ! C'est l'ordinateur qui a gagné ! Cliquez sur rejouer";
            GAMES_COMPUTER.textContent++;
        }

        // Mise à jour des scores dans le localStorage
        localStorage.setItem("player", GAMES_PLAYER.textContent)
        localStorage.setItem("computer", GAMES_COMPUTER.textContent)

    }
}

