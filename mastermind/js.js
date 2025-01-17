// Fonction pour générer une couleur aléatoire
function couleurAleatoire() {
    // Génère un index aléatoire entre 0 et 5
    const randomIndex = Math.floor(Math.random() * 6);
    let color;

    // Associe l'index à une couleur spécifique
    switch (randomIndex) {
        case 0:
            color = 'jaune';
            break;
        case 1:
            color = 'bleu';
            break;
        case 2:
            color = 'rouge';
            break;
        case 3:
            color = 'vert';
            break;
        case 4:
            color = 'blanc';
            break;
        case 5:
            color = 'noir';
            break;
        default:
            color = 'inconnu'; // Au cas où l'index n'est pas dans la plage définie
    }

    return color; // Renvoie la couleur correspondante
}

// Fonction pour générer un tableau de couleurs aléatoires
function generateColors() {
    // Crée un tableau de 4 cases, puis le remplit avec des couleurs aléatoires
    const randomColors = new Array(4).fill(null).map(() => couleurAleatoire());
    return randomColors;
}

// Exemple d'utilisation de la fonction generateColors()
const randomColors = generateColors();
console.log(randomColors);



// Fonction pour trouver le nombre d'éléments similaires à la même position dans deux tableaux
function matchingElements(arr1, arr2) {
    // Vérifie si les deux tableaux ont la même longueur
    if (arr1.length !== arr2.length) {
        throw new Error('Les tableaux n\'ont pas la même longueur');
    }

    // Filtrer les éléments des deux tableaux qui sont égaux aux mêmes positions
    const matchingColors = arr1.filter((color, index) => color === arr2[index]);

    // Renvoyer le nombre d'éléments similaires et le tableau des couleurs correspondantes
    return [matchingColors.length, matchingColors];
}

// Exemple d'utilisation de la fonction matchingElements()
const colors1 = ['vert', 'jaune', 'rouge', 'noir'];
const colors2 = ['rouge', 'jaune', 'vert', 'rouge'];

const [matchingCount, matchingColors] = matchingElements(colors1, colors2);
console.log('Nombre d\'éléments similaires à la même position:', matchingCount);
console.log('Couleurs correspondantes:', matchingColors);