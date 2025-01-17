document.addEventListener("DOMContentLoaded", function () 
//  garantit que le code JavaScript qui manipule le contenu de la page ne s'exécutera pas avant que le contenu HTML soit prêt à être manipulé.
{
    /* DOM ELEMENTS */
    const REMAINING_TRY = document.getElementById('remainingTry');
    // REMAINING_TRY constante fait référence à élément HTML ayant l'ID "remainingTry", afficher le nombre de tentatives restantes au joueur.

    const board = document.getElementById('board');
    // board référence élément HTML avec l'ID "board", endroit où le mot secret est affiché sous forme de tirets ou de lettres au fur et à mesure que le joueur devine correctement les lettres.

    const keyboard = document.getElementById('keyboard');
    // keyboard référence élément HTML avec l'ID "keyboard", afficher le clavier visuel à partir duquel le joueur sélectionne les lettres pour deviner le mot secret.

    const gamesPlayedSpan = document.querySelector('.games-played');
    // document.querySelector('.games-played') : Cette partie utilise la méthode document.querySelector() pour rechercher un élément dans le document HTML qui correspond au sélecteur CSS spécifié entre parenthèses(classe). 
    // const gamesPlayedSpan = : Une fois que l'élément correspondant à la classe CSS "games-played" est trouvé, il est assigné à une variable appelée gamesPlayedSpan. Cette variable est déclarée en utilisant const, ce qui signifie qu'elle ne peut pas être réassignée à une autre valeur par la suite.

    const playerWinsSpan = document.querySelector('.player-wins');
    const computerWinsSpan = document.querySelector('.computer-wins');
    const resetButton = document.getElementById('reset-stats');

    const hangmanImages = [
        "assets/images/pendu_0.jpg",
        "assets/images/pendu_1.jpg",
        "assets/images/pendu_2.jpg",
        "assets/images/pendu_3.jpg",
        "assets/images/pendu_4.jpg",
        "assets/images/pendu_5.jpg",
        "assets/images/pendu_6.jpg",
        "assets/images/pendu_7.jpg",
        "assets/images/pendu_8.jpg",
        "assets/images/pendu_9.jpg"
    ];
    // ce tableau hangmanImages contient les adresses URL de différentes images représentant les étapes d'un pendu dans un jeu. Ces images sont utilisées pour afficher visuellement la progression du jeu, généralement en remplaçant l'image affichée à chaque fois qu'une mauvaise lettre est devinée.

    let remainingTry = 9;
    // remainingTry variable qui stocke le nombre de tentatives restantes que le joueur a pour deviner le mot, initialisé à 9.

    let gamesPlayed = localStorage.getItem('gamesPlayed') || 0;
    // mécanisme du stockage local (localStorage) pour récupérer le nombre de parties jouées (gamesPlayed). 
    // localStorage est un objet JavaScript qui fournit une interface de stockage persistant pour les données au sein du navigateur. 
    // getItem est une méthode de l'objet localStorage qui permet de récupérer la valeur associée à une clé donnée.
    // la clé est 'gamesPlayed', ce qui signifie qu'on cherche à récupérer la valeur stockée dans le stockage local sous cette clé spécifique.
    // || 0: Si la valeur récupérée pour la clé 'gamesPlayed' est null ou undefined (ce qui peut arriver si aucun enregistrement correspondant n'est trouvé dans le stockage local), la partie droite de l'opérateur logique OU (||) est évaluée. Dans ce cas, cette partie est simplement 0, ce qui signifie que si aucune valeur n'est trouvée dans le stockage local, la variable gamesPlayed sera initialisée à 0.
    // let gamesPlayed , la variable gamesPlayed est initialisée avec la valeur récupérée du stockage local (ou 0 si aucune valeur n'est trouvée). Le mot-clé let est utilisé pour déclarer une variable locale à la portée du bloc dans lequel elle est définie
    let playerWins = localStorage.getItem('playerWins') || 0;
    let computerWins = localStorage.getItem('computerWins') || 0;

    updateStatisticsDisplay();


    const Alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    // Alphabet tableau contenant les lettres de l'alphabet en majuscules de A à Z, utilisé pour générer un clavier visuel.

    const wordList = [ "ANGLE", "ARMOIRE", "BANC", "BUREAU", "CABINET", "CARREAU", "CHAISE", "CLASSE", "CLEF", "COIN", "COULOIR", "DOSSIER", "EAU", "ECOLE","ENTRER" , "ESCALIER", "ETAGERE", "EXTERIEUR", "FENETRE", "INTERIEUR", "LAVABO", "LIT", "MARCHE", "MATELAS", "MATERNELLE", "MEUBLE", "MOUSSE", "MUR", "PELUCHE", "PLACARD", "PLAFOND", "PORTE", "POUBELLE", "RADIATEUR", "RAMPE", "RIDEAU", "ROBINET", "SALLE", "SALON", "SERRURE", "SERVIETTE", "SIEGE", "SIESTE", "SILENCE", "SOL", "SOMMEIL", "SONNETTE", "SORTIE", "TABLE", "TABLEAU", "TABOURET", "TAPIS", "TIROIR", "TOILETTE", "VITRE", "ALLER", "AMENER", "APPORTER", "APPUYER", "ATTENDRE", "BAILLER", "COUCHER", "DORMIR", "ECLAIRER", "EMMENER", "EMPORTER", "ENTRER", "FERMER", "FRAPPER", "INSTALLER", "LEVER", "OUVRIR", "PRESSER", "RECHAUFFER", "RESTER", "SONNER", "SORTIR", "VENIR", "ABSENT", "ASSIS", "BAS", "HAUT", "PRESENT", "GAUCHE", "DROITE", "DEBOUT", "DEDANS", "DEHORS", "FACE", "LOIN", "PRES", "TARD", "TOT", "APRES", "AVANT", "CONTRE", "DANS", "DE", "DERRIERE", "DEVANT", "DU", "SOUS", "SUR", "CRAYON", "STYLO", "FEUTRE", "MINE", "GOMME", "DESSIN", "COLORIAGE", "RAYURE", "PEINTURE", "PINCEAU", "COULEUR", "CRAIE", "PAPIER", "FEUILLE", "CAHIER", "CARNET", "CARTON", "CISEAUX", "DECOUPAGE", "PLIAGE", "PLI", "COLLE", "AFFAIRE", "BOITE", "CASIER", "CAISSE", "TROUSSE", "CARTABLE", "JEU", "JOUET", "PION", "DOMINO", "PUZZLE", "CUBE", "PERLE", "CHOSE", "FORME", "CARRE", "ROND", "PATE", "MODELER", "TAMPON", "LIVRE", "HISTOIRE", "BIBLIOTHEQUE", "IMAGE", "ALBUM", "TITRE", "CONTE", "DICTIONNAIRE", "MAGAZINE", "CATALOGUE", "PAGE", "LIGNE", "MOT", "ENVELOPPE", "ETIQUETTE", "CARTE", "APPEL", "AFFICHE", "ALPHABET", "APPAREIL", "CAMESCOPE", "CASSETTE", "CHAINE", "CHANSON", "CHIFFRE", "CONTRAIRE", "DIFFERENCE", "DOIGT", "ECRAN", "ECRITURE", "FILM", "FOIS", "FOI", "IDEE", "INSTRUMENT", "INTRUS", "LETTRE", "LISTE", "MAGNETOSCOPE", "MAIN", "MICRO", "MODELE", "MUSIQUE", "NOM", "NOMBRE", "ORCHESTRE", "ORDINATEUR", "PHOTO", "POINT", "POSTER", "POUCE", "PRENOM", "QUESTION", "RADIO", "SENS", "TAMBOUR", "TELECOMMANDE", "TELEPHONE", "TELEVISION", "TRAIT", "TROMPETTE", "VOIX", "XYLOPHONE", "ZERO", "CHANTER", "CHERCHER", "CHOISIR", "CHUCHOTER", "COLLER", "COLORIER", "COMMENCER", "COMPARER", "COMPTER", "CONSTRUIRE", "CONTINUER", "COPIER", "COUPER", "DECHIRER", "DECOLLER", "DECORER", "DECOUPER", "DEMOLIR", "DESSINER", "DIRE", "DISCUTER", "ECOUTER", "ECRIRE", "EFFACER", "ENTENDRE", "ENTOURER", "ENVOYER", "FAIRE", "FINIR", "FOUILLER", "GOUTER", "IMITER", "LAISSER", "LIRE", "METTRE", "MONTRER", "OUVRIR", "PARLER", "PEINDRE", "PLIER", "POSER", "PRENDRE", "PREPARER", "RANGER", "RECITER", "RECOMMENCER", "REGARDER", "REMETTRE", "REPETER", "REPONDRE", "SENTIR", "SOULIGNER", "TAILLER", "TENIR", "TERMINER", "TOUCHER", "TRAVAILLER", "TRIER", "AMI", "ATTENTION", "CAMARADE", "COLERE", "COPAIN", "COQUIN", "DAME", "DIRECTEUR", "DIRECTRICE", "DROIT", "EFFORT", "ELEVE", "ENFANT", "FATIGUE", "FAUTE", "FILLE", "GARCON", "GARDIEN", "MADAME", "MAITRE", "MAITRESSE", "MENSONGE", "ORDRE", "PERSONNE", "RETARD", "JOUEUR", "SOURIRE", "TRAVAIL", "AIDER", "DEFENDRE", "DESOBEIR", "DISTRIBUER", "ECHANGER", "EXPLIQUER", "GRONDER", "OBEIR", "OBLIGER", "PARTAGER", "PRETER", "PRIVER","PROMETTRE", "PROGRES", "PROGRESSER", "PUNIR", "QUITTER", "RACONTER", "EXPLIQUER", "REFUSER", "SEPARER", "BLOND", "BRUN", "CALME", "CURIEUX", "DIFFERENT", "DOUX", "ENERVER", "GENTIL", "GRAND", "HANDICAPE", "INSEPARABLE", "JALOUX", "MOYEN", "MUET", "NOIR", "NOUVEAU", "PETIT", "POLI", "PROPRE", "ROUX", "SAGE", "SALE", "SERIEUX", "SOURD", "TRANQUILLE", "ARROSOIR", "ASSIETTE", "BALLE", "BATEAU", "BOITE", "BOUCHON", "BOUTEILLE", "BULLES", "CANARD", "CASSEROLE", "CUILLERE", "CUVETTE", "DOUCHE", "ENTONNOIR", "GOUTTES", "LITRE", "MOULIN", "PLUIE", "POISSON", "PONT", "POT", "ROUE", "SAC", "PLASTIQUE", "SALADIER", "SEAU", "TABLIER", "TASSE", "TROUS", "VERRE", "AGITER", "AMUSER", "ARROSER", "ATTRAPER", "AVANCER", "BAIGNER", "BARBOTER", "BOUCHER", "BOUGER", "DEBORDER", "DOUCHER", "ECLABOUSSER", "ESSUYER", "ENVOYER", "COULER", "PARTIR", "FLOTTER", "GONFLER", "INONDER", "JOUER", "LAVER", "MELANGER", "MOUILLER", "NAGER", "PLEUVOIR", "PLONGER", "POUSSER", "POUVOIR", "PRESSER", "RECEVOIR", "REMPLIR", "RENVERSER", "SECHER", "SERRER", "SOUFFLER","TIRER", "TOURNER", "TREMPER", "VERSER", "VIDER", "VOULOIR", "AMUSANT", "CHAUD", "FROID", "HUMIDE", "INTERESSANT", "MOUILLE", "SEC", "TRANSPARENT", "MOITIE","AUTANT", "BEAUCOUP", "ENCORE", "MOINS", "PEU", "PLUS", "TROP", "ANORAK", "ARC","BAGAGE", "BAGUETTE", "BARBE", "BONNET", "BOTTE", "BOUTON", "BRETELLE", "CAGOULE", "CASQUE", "CASQUETTE", "CEINTURE", "CHAPEAU", "CHAUSSETTE", "CHAUSSON", "CHAUSSURE", "CHEMISE", "CIGARETTE", "COL", "COLLANT", "COURONNE", "CRAVATE", "CULOTTE", "ECHARPE", "EPEE", "FEE", "FLECHE", "FUSIL", "GANT", "HABIT", "JEAN", "JUPE", "LACET", "LAINE", "LINGE", "LUNETTES", "MAGICIEN", "MAGIE", "MAILLOT", "MANCHE", "MANTEAU", "MOUCHOIR", "MOUFLE", "NOEUD", "PAIRE", "PANTALON", "PIED", "POCHE", "PRINCE", "PYJAMA", "REINE", "ROBE", "ROI", "RUBAN", "SEMELLE", "SOLDAT", "SORCIERE", "TACHE", "TAILLE", "TALON", "TISSU","TRICOT", "UNIFORME", "VALISE", "VESTE", "VETEMENT", "CHANGER", "CHAUSSER", "COUVRIR", "DEGUISER", "DESHABILLER", "ENLEVER", "HABILLER", "LACER", "PORTER", "RESSEMBLER", "CLAIR", "COURT", "ETROIT", "FONCE", "JOLI", "LARGE", "LONG", "MULTICOLORE", "NU", "USE", "BIEN", "MAL", "MIEUX", "PRESQUE", "AIGUILLE", "AMPOULE", "AVION", "BOIS", "BOUT", "BRICOLAGE", "BRUIT", "CABANE", "CARTON", "CLOU", "COLLE", "CROCHET", "ELASTIQUE", "FICELLE", "FIL", "MARIONNETTE", "MARTEAU", "METAL", "METRE", "MORCEAU", "MOTEUR", "OBJET", "OUTIL", "PEINTURE", "PINCEAU", "PLANCHE", "PLATRE", "SCIE", "TOURNEVIS", "VIS", "VOITURE", "ARRACHER", "ATTACHER", "CASSER", "COUDRE", "DETRUIRE", "ECORCHER", "ENFILER", "ENFONCER", "FABRIQUER", "MESURER", "PERCER", "PINCER", "REPARER", "REUSSIR", "SERVIR", "TAPER", "TROUER", "TROUVER", "ADROIT", "DIFFICILE", "DUR", "FACILE", "LISSE", "MALADROIT", "POINTU", "TORDU", "ACCIDENT", "AEROPORT", "CAMION", "ENGIN", "FEU", "FREIN", "FUSEE", "GARAGE", "GARE", "GRUE", "HELICOPTERE", "MOTO", "PANNE", "PARKING", "PILOTE", "PNEU", "QUAI", "TRAIN", "VIRAGE", "VITESSE", "VOYAGE", "WAGON", "ZIGZAG", "ARRETER", "ATTERRIR", "BOUDER", "CHARGER", "CONDUIRE", "DEMARRER", "DISPARAITRE", "DONNER", "ECRASER", "ENVOLER", "GARDER", "GARER", "MANQUER", "PARTIR", "POSER", "RECULER", "ROULER", "TENDRE", "TRANSPORTER", "VOLER", "ABIME", "ANCIEN", "BLANC", "BLEU", "CASSE", "CINQ", "DERNIER", "DEUX", "DEUXIEME", "DIX", "GRIS", "GROS", "HUIT", "JAUNE", "MEME", "NEUF", "PAREIL", "PREMIER", "QUATRE", "ROUGE", "SEPT", "SEUL", "SIX", "SOLIDE", "TROIS", "TROISIEME", "UN", "VERT", "DESSUS", "AUTOUR", "VITE", "VERS", "ACROBATE", "ARRET", "ARRIERE", "BARRE", "BARREAU", "BORD", "BRAS", "CERCEAU", "CHAISE", "CHEVILLE", "CHUTE", "COEUR", "CORDE", "CORPS", "COTE", "COU", "COUDE", "CUISSE", "DANGER", "DOIGTS", "DOS", "ECHASSES", "ECHELLE", "EPAULE", "EQUIPE", "ESCABEAU", "FESSE", "FILET", "FOND", "GENOU", "GYMNASTIQUE", "HANCHE", "JAMBE", "JEU", "MAINS", "MILIEU", "MONTAGNE", "MUR", "ESCALADE", "MUSCLE", "NUMERO", "ONGLE", "PARCOURS", "PAS", "PASSERELLE", "PENTE", "PEUR", "PIED", "PLONGEOIR", "POIGNET", "POING", "PONT", "SIGNE", "SINGE", "POUTRE", "EQUILIBRE", "PRISE", "RIVIERE", "CROCODILE", "ROULADE", "PIROUETTE", "SAUT", "SERPENT", "SPORT", "SUIVANT", "TETE", "TOBOGGAN", "TOUR", "TRAMPOLINE", "TUNNEL", "VENTRE", "ACCROCHER", "APPUYER", "ARRIVER", "BAISSER", "BALANCER", "BONDIR", "BOUSCULER", "COGNER", "COURIR", "DANSER", "DEPASSER", "DESCENDRE", "ECARTER", "ESCALADER", "GAGNER", "GENER", "GLISSER", "GRIMPER", "MARCHER", "AYOUB", "PATTES", "DEBOUT", "MONTER", "MONTRER", "PENCHER", "PERCHER", "PERDRE", "RAMPER", "RATER", "REMPLACER", "RESPIRER", "RETOURNER", "REVENIR", "SAUTER", "SOULEVER", "SUIVRE", "TOMBER", "TRANSPIRER", "TRAVERSER", "DANGEUREUX", "EPAIS", "FORT", "GROUPE", "IMMOBILE", "ROND", "SERRE", "SOUPLE", "ENSEMBLE", "ICI", "JAMAIS", "TOUJOURS", "SOUVENT", "BAGARRE", "BALANCOIRE", "BALLON", "BANDE", "BICYCLETTE", "BILLE", "CAGE", "ECUREUIL", "CERF", "VOLANT", "CHATEAU", "COUP", "COUR", "COURSE", "ECHASSE", "FLAQUE", "EAU", "PAIX", "PARDON", "PARTIE", "PEDALE", "PELLE", "POMPE", "PREAU", "RAQUETTE", "RAYON", "RECREATION", "SABLE", "SIFFLET", "SIGNE", "TAS", "TRICYCLE", "TUYAU", "VELO", "FILE", "RANG", "BAGARRER", "BATTRE", "CACHER", "CRACHER", "CREUSER", "CRIER", "DEGONFLER", "DISPUTE", "EMPECHER", "GALOPER", "HURLER", "JONGLER", "LANCER", "PEDALER", "PLAINDRE", "PLEURER", "POURSUIVRE", "PROTEGER", "SAIGNER", "SALIR", "SIFFLER", "SURVEILLER", "TRAINER", "TROUVER", "FOU", "MECHANT"];
    // wordList tableau contenant une liste de mots. Chaque élément du tableau est une chaîne de caractères représentant un mot. Ces mots peuvent être utilisés comme choix possibles pour le jeu.



   // Choix aléatoire d'un mot secret
const secretWordIndex = Math.floor(Math.random() * wordList.length);
// secretWordIndex génère un nombre aléatoire entre 0 (inclus) et la longueur de la liste de mots. 
// en utilisant Math.random() pour obtenir un nombre décimal pseudo-aléatoire entre 0 (inclus) et 1 (exclus)
// puis en multipliant ce nombre par la longueur de la liste de mots.
// Math.floor() est utilisé pour arrondir ce nombre à l'entier le plus proche vers le bas, pour obtenir un index entier dans la liste de mots.

const secretWord = wordList[secretWordIndex];
// secretWord est défini comme le mot situé à l'index 'secretWordIndex' dans la liste wordList. Signifie que secretWord est un mot choisi au hasard parmi ceux disponibles dans wordList.

// console.log(secretWord); si on ne veut pas qu'il reste afficher
console.log("Mot à trouver:", secretWord);
// console.log(secretWord) affiche constament le mot choisi au hasard dans la console.



    // Création des éléments de clavier
Alphabet.forEach (letter =>
    // utilise forEach pour agir sur chaque lettre de l'alphabet dans le tableau 'Alphabet'. Pour chaque lettre, il effectue les actions suivantes :
    {
    const letterElement = document.createElement('div');
    //variable letterElement, permettra de le manipuler plus tard l'élément html (div) qui vient du document.createElement('div')
    letterElement.classList.add('letters');
    //  ajoute une classe CSS à l'élément HTML nouvellement créé.
    letterElement.id = `l${letter}`;
    // `l${letter}` permet de créer une chaîne en combinant le caractère 'l' avec la valeur de letter. 
    // exemple, si letter vaut 'A', alors letterElement.id sera 'lA'. Cela signifie que l'élément aura un identifiant unique basé sur la lettre correspondante de l'alphabet.
    letterElement.textContent = letter;
    // textContent est une propriété qui permet de définir ou de récupérer le contenu textuel d'un élément.
    //letter est une variable qui représente chaque lettre de l'alphabet dans cette boucle.
    // cette ligne définira le texte à afficher à l'intérieur de l'élément créé en tant que lettre de l'alphabet correspondante.
    // exemple, si letter vaut 'A', alors le contenu textuel de letterElement sera 'A'.
    keyboard.appendChild(letterElement);
    // keyboard.appendChild(letterElement); signifie que l'élément letterElement, créé précédemment, sera ajouté en tant qu'enfant de l'élément keyboard. Cela ajoute chaque lettre à l'affichage du clavier dans la page HTML.
});

    for (let i = 1; i <= secretWord.length; i++) {
        board.textContent += '_';
        // Cette boucle va mettre sur chaque lettre du mot un trait de soulignement _ à l'élément board.
        // for: débute une boucle. Il est suivi par des parenthèses qui définissent les conditions de la boucle.
        // let i = 1;: C'est le point de départ de la boucle. On commence à compter à partir de 1. 
        // i <= secretWord.length;: Cette partie dit à la boucle de continuer tant que la valeur de i est inférieure ou égale à la longueur du mot secret (secretWord.length). En d'autres termes, tant que nous n'avons pas atteint la fin du mot secret.
        // i++: Cela signifie qu'à chaque tour de boucle, la valeur de i est augmentée de 1. Cela nous permet de passer à la lettre suivante du mot secret à chaque itération de la boucle.
        // board.textContent += '_';: Pendant chaque itération de la boucle, un trait de soulignement _ est ajouté au contenu textuel du tableau board. Donc, pour chaque lettre du mot secret, un trait de soulignement est ajouté au tableau.
    }

    board.textContent = board.textContent.replace(' ', '');
    // tous les espaces (représentés par ' ') seront remplacés par une chaîne vide '', ce qui revient à les supprimer. En d'autres termes, cette ligne de code supprime tous les espaces présents dans le texte contenu dans l'élément "board".

    const letters = [...document.querySelectorAll('.letters')];
    // const letters = [...document.querySelectorAll('.letters')]; crée une variable letters qui contient une liste de tous les éléments HTML ayant la classe CSS "letters" sur la page. 
    // document.querySelectorAll('.letters'): recherche tous les éléments HTML qui ont la classe CSS "letters". Cette méthode retourne une liste (ou une collection) de tous les éléments correspondants.
    // ...: cette collection est décomposée en éléments individuels, ce qui signifie que chaque élément est extrait de la collection et placé dans un tableau distinct.
    // const letters = [...]: le résultat, letters est une variable constante et ne peut pas être réaffectée par la suite.


    function updateStatisticsDisplay() {
        gamesPlayedSpan.textContent = gamesPlayed;
        playerWinsSpan.textContent = playerWins;
        computerWinsSpan.textContent = computerWins;

         // Ajouter des instructions de journalisation pour afficher les statistiques dans la console
        console.log("Nombre total de parties jouées:", gamesPlayed);
        console.log("Victoires:", playerWins);
        console.log("Défaite:", computerWins);
    }


    function clickLetter(l) 
    //  fonction, clickLetter, est appelée lorsqu'un utilisateur clique sur une lettre dans l'interface
    //  paramètre l, qui est l'événement de clic lui-même.
    {
        let clickedLetter = document.getElementById(l.target.id);
        // document.getElementById(l.target.id). Cela récupère l'élément HTML correspondant à l'ID de l'élément sur lequel l'utilisateur a cliqué.
        if (secretWord.includes(clickedLetter.textContent)) 
        // vérifie si la lettre cliquée est présente dans le mot secret en utilisant secretWord.includes(clickedLetter.textContent). 
        // secretWord : variable qui contient le mot secret à deviner
        // clickedLetter.textContent récupère le texte contenu dans l'élément HTML de la lettre cliquée.
        {
            console.log(`La lettre "${clickedLetter.textContent}" est présente dans le mot secret.`);

            let indexOfLetter = [];
            // Si la lettre cliquée est présente dans le mot secret, elle procède à la recherche de toutes les fois ou la lettre est dans le mot secret. Elle initialise un tableau vide indexOfLetter pour stocker les indices de ces occurrences.

            for (let i = 0; i < secretWord.length; i++) {
                if (secretWord[i] === clickedLetter.textContent) {
                    indexOfLetter.push(i);
                }
            }
            let splitBoard = board.textContent.split('');
            for (let i = 0; i < indexOfLetter.length; i++) {
                splitBoard[indexOfLetter[i]] = clickedLetter.textContent;
            }
            board.textContent = splitBoard.join('');
        } else  {
            remainingTry--;
            REMAINING_TRY.textContent = remainingTry;
             // Changer l'image si une lettre est incorrecte
        document.getElementById("hangmanImage").src = hangmanImages[9 - remainingTry];

        console.log(`La lettre "${clickedLetter.textContent}" n'est pas présente dans le mot secret.`);

         // Afficher le nombre d'essais restants dans la console
         console.log("Nombre d'essais restants:", remainingTry);

        }




        // VERIFICATION WIN/LOOSE
        if (board.textContent === secretWord) {
            playerWins++;
            gamesPlayed++;
            localStorage.setItem('playerWins', playerWins);
            localStorage.setItem('gamesPlayed', gamesPlayed);
            updateStatisticsDisplay();
            hangmanImage.style.display = 'none';

            const newLocal = board.textContent = 'Oyé Oyé la pendaison est annulée..Tu as trouvé : ' + secretWord;
            board.style.fontSize = '30px';
            keyboard.style.display = 'none';
            essai.style.display = 'none';
            
            board.style.display = 'flex';
            board.style.flexDirection = 'row';
            board.style.width = '80%';
            board.style.height = '100%';
            board.style.alignItems = 'center';
            board.style.justifyContent = 'center';

            haut.style.padding = '20px'
            haut.style.margin = '20px'
            haut.style.border = '12px dashed #4CAF50';

            setTimeout(() => {
                document.location.reload();
            }, 4000);
        } else if (remainingTry === 0) {
            computerWins++;
            gamesPlayed++;
            localStorage.setItem('computerWins', computerWins);
            localStorage.setItem('gamesPlayed', gamesPlayed);
            updateStatisticsDisplay();
            // hangmanImage.src = 'images/game_over_image.jpg.jpg' ; changer l'image par une tombe

            board.textContent = 'Jouissance l\'heure de la pandaison est terminée.. Tu n\'a pas trouvé le mot :' + secretWord;
            board.style.fontSize = '30px';
            keyboard.style.display = 'none';
            essai.style.display = 'none';

            board.style.display = 'flex';
            board.style.flexDirection = 'row';
            board.style.width = '80%';
            board.style.height = '100%';
            board.style.alignItems = 'center';
            board.style.justifyContent = 'center';

            haut.style.padding = '20px'
            haut.style.margin = '20px'
            haut.style.border = '12px dashed red';


            setTimeout(() => {
                document.location.reload();
            }, 4000);
        }
        clickedLetter.textContent = '';
         // Effacer le texte de la lettre cliquée

    }


    function resetStatistics() {
        gamesPlayed = 0;
        playerWins = 0;
        computerWins = 0;
        updateStatisticsDisplay();
        localStorage.setItem('gamesPlayed', gamesPlayed);
        localStorage.setItem('playerWins', playerWins);
        localStorage.setItem('computerWins', computerWins);
    }

    resetButton.addEventListener('click', resetStatistics);

    letters.forEach((l) => {
        l.addEventListener('click', clickLetter);
    });

    

})();



