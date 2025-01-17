// ? 1) Récupération de tous les éléments HTML
// Récupération des pastilles de stock
const STOCK_YOURNAME = document.getElementById("stockYourname")
const STOCK_BERSERK = document.getElementById("stockBerserk")
const STOCK_NARUTO = document.getElementById("stockNaruto")
const STOCK_HXH = document.getElementById("stockHxh")
const STOCK_ONEPIECE = document.getElementById("stockOnepiece")
const STOCK_DEATHNOTE = document.getElementById("stockDeathnote")
const STOCK_KINGDOM = document.getElementById("stockKingdom")
const STOCK_SEVENDS = document.getElementById("stockSevends")
const STOCK_DEMONSLAYER = document.getElementById("stockDemonslayer")
const STOCK_DBZ = document.getElementById("stockDbz")
const STOCK_ONEPM = document.getElementById("stockOnepm")
const STOCK_JJK = document.getElementById("stockJjk")

// Affichage dans l'écran
const P_SELECTION = document.getElementById("selection")

// Touches - Numéros
const BTN_0 = document.getElementById("btn-0")
const BTN_1 = document.getElementById("btn-1")
const BTN_2 = document.getElementById("btn-2")
const BTN_3 = document.getElementById("btn-3")
const BTN_4 = document.getElementById("btn-4")
const BTN_5 = document.getElementById("btn-5")
const BTN_6 = document.getElementById("btn-6")
const BTN_7 = document.getElementById("btn-7")
const BTN_8 = document.getElementById("btn-8")
const BTN_9 = document.getElementById("btn-9")

// Touches - Reset + Valider
const BTN_RESET = document.getElementById("btn-reset")
const BTN_VALID = document.getElementById("btn-valid")

// Délivreur boisson
const IMG_BONK = document.getElementById("img-bonk")

// ? 2) Compléter la sélection avec la touche appuyée
BTN_0.addEventListener("click", () => {
    P_SELECTION.innerText += "0";

})
BTN_1.addEventListener("click", () => {
    P_SELECTION.innerText += "1";
})
BTN_2.addEventListener("click", () => {
    P_SELECTION.innerText += "2";
})
BTN_3.addEventListener("click", () => {
    P_SELECTION.innerText += "3";
})
BTN_4.addEventListener("click", () => {
    P_SELECTION.innerText += "4";
})
BTN_5.addEventListener("click", () => {
    P_SELECTION.innerText += "5";
})
BTN_6.addEventListener("click", () => {
    P_SELECTION.innerText += "6";
})
BTN_7.addEventListener("click", () => {
    P_SELECTION.innerText += "7";
})
BTN_8.addEventListener("click", () => {
    P_SELECTION.innerText += "8";
})
BTN_9.addEventListener("click", () => {
    P_SELECTION.innerText += "9";
})

// ? 3) Remettre à zéro la sélection
BTN_RESET.addEventListener("click", () => {
    P_SELECTION.innerText = "";
})

// ? 4) Lors de la validation :
BTN_VALID.addEventListener("click", () => {
    //#region avec if
    // if(P_SELECTION.innerText === "1") {

    // } else if(P_SELECTION.innerText === "2") {

    // } else if(P_SELECTION.innerText === "3") ...
    // else {
    //     //si aucun des if
    // }
    //#endregion
    // Vérifier si la sélection est valide
    switch(P_SELECTION.innerText){
        case "1":
            // Vérifier si stock
            if(parseInt(STOCK_YOURNAME.innerText) > 0){
                // Donner boisson
                // IMG_BONK.setAttribute("src", "/source/de/image")
                IMG_BONK.src = ".";
                // Baisser stock
                // Mettre à jour les stocks
                STOCK_YOURNAME.innerText--;            

            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }
            break;
        case "2":
            if(parseInt(STOCK_BERSERK.innerText) > 0)
            {
                IMG_BONK.src = "./img/berserk.png";
                STOCK_BERSERK.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }
            break;
        case "3":
            if(parseInt(STOCK_NARUTO.innerText) > 0)
            {
                IMG_BONK.src = "./img/naruto.png";
                STOCK_NARUTO.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }
            break;
        case "4":
            if(parseInt(STOCK_HXH.innerText) > 0)
            {
                IMG_BONK.src = "./img/hxh.png";
                STOCK_HXH.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }
            break;
        case "5":
            if(parseInt(STOCK_ONEPIECE.innerText) > 0)
            {
                IMG_BONK.src = "./img/onepiece.png";
                STOCK_ONEPIECE.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }
            break;
        case "6":
            if(parseInt(STOCK_DEATHNOTE.innerText) > 0)
            {
                IMG_BONK.src = "./img/deathnote.png";
                STOCK_DEATHNOTE.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }
            break;
        case "7":
            if(parseInt(STOCK_KINGDOM.innerText) > 0)
            {
                IMG_BONK.src = "./img/kingdom.png";
                STOCK_KINGDOM.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }
            break;
        case "8":
            if(parseInt(STOCK_SEVENDS.innerText) > 0)
            {
                IMG_BONK.src = "./img/sevends.png";
                STOCK_SEVENDS.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }
            break;
        case "9":
            if(parseInt(STOCK_DEMONSLAYER.innerText) > 0)
            {
                IMG_BONK.src = "./img/demonslayer.png";
                STOCK_DEMONSLAYER.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }

            break;
        case "10":
            if(parseInt(STOCK_DBZ.innerText) > 0)
            {
                IMG_BONK.src = "./img/dbz.png";
                STOCK_DBZ.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }

            break;
        case "11":
            if(parseInt(STOCK_ONEPM.innerText) > 0)
            {
                IMG_BONK.src = "./img/onepm.png";
                STOCK_ONEPM.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }

            break;
        case "12":
            if(parseInt(STOCK_JJK.innerText) > 0)
            {
                IMG_BONK.src = "./img/jjk.png";
                STOCK_JJK.innerText--;
            }
            else {
                P_SELECTION.innerText = "NO STOCK";
            }

            break;
        default :
            P_SELECTION.innerText = "ERROR"
            break;
    }

    // setTimeout( () => {}, temps en millisecondes)
    // Exécute la fonction renseignée au bout de X millisecondes
    setTimeout(() => {
        P_SELECTION.innerText = "";
        IMG_BONK.src = "";

    }, 3000)
    //#region setInterval
    // setInterval( () => {}, temps en millisecondes)
    // Exécute la fonction renseignée TOUTES les X millisecondes
    // let compteur = 0;
    // let timer = setInterval(() => {
    //     compteur++;
    //     console.log(compteur);
    //     if(compteur >= 10) {
    //         clearInterval(timer); //pour arrêter le timer
    //     }
    // }, 1000);
    //#endregion
    

})
