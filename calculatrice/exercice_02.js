// ! Etape 1 :
// Identifier tous les éléments html dont je vais avoir besoin
// Les récupérer
// On récupère les deux éléments html input
const INPUT_NB1 = document.getElementById("nb1")
const INPUT_NB2 = document.getElementById("nb2")

// On récupère les buttons avec les opérateurs
const BTN_ADD = document.getElementById("add")
const BTN_SOUS = document.getElementById("sous")
const BTN_MULT = document.getElementById("mult")
const BTN_DIV = document.getElementById("div")
const BTN_MOD = document.getElementById("mod")

// On récupère la div dans laquelle sera stockée le résultat
const DIV_RESULT = document.getElementById("result")

// ! Etape 2 :
// Ajouter les fonctionnalités aux buttons
BTN_ADD.addEventListener("click", () => {
    // ? Récupérer les deux nombres
    let nb1String = INPUT_NB1.value.replace(",", ".");
    let nb2String = INPUT_NB2.value.replace(",", ".");
    // ? Les transformer en number puisque value est en string
    let nb1 = parseFloat(nb1String)
    let nb2 = parseFloat(nb2String)
    // ? Faire le calcul
    let addition = nb1 + nb2
    // ? Afficher le résultat
    DIV_RESULT.innerText = addition;
})

BTN_SOUS.addEventListener("click", () => {
    //Optimisation des instructions du dessus : on peut tout faire en une seule
    DIV_RESULT.innerText = parseFloat(INPUT_NB1.value.replace(",", ".")) - parseFloat(INPUT_NB2.value.replace(",", "."));
})

BTN_MULT.addEventListener("click", () => {
    DIV_RESULT.innerText = parseFloat(INPUT_NB1.value.replace(",", ".")) * parseFloat(INPUT_NB2.value.replace(",", "."));

})

BTN_DIV.addEventListener("click", () => {
    DIV_RESULT.innerText = (parseFloat(INPUT_NB1.value.replace(",", ".")) / parseFloat(INPUT_NB2.value.replace(",", "."))).toFixed(2);

})

BTN_MOD.addEventListener("click", () => {
    DIV_RESULT.innerText = parseInt(INPUT_NB1.value) % parseInt(INPUT_NB2.value);

})
