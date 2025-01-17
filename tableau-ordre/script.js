


//#region Exercice 1 :
// Soit la chaine de caractères suivante : "Je veux me retourner la tête !"
// Trouver un moyen d'obtenir la chaine suivante : "! etêt al renruoter em xuev eJ";

let stringToReverse = 'Je veux me retourner la tête !';
let tabToReverse = stringToReverse.split('');
let tabReversed = tabToReverse.reverse();
let stringReversed = tabReversed.join('');
console.log(stringReversed);

// Chainage de méthodes
console.log( stringToReverse.split('').reverse().join('')  );
//#endregion

//#region Exercice 3 (voir image EnonceEx3.PNG)
// 1) Faire la liste
const contacts = [
    { firstname : 'Maissaa', lastname : 'ElB', birthdate : new Date('1989-10-16'), phone : '0478 78 78 78'},
    { firstname : 'Amandine', lastname : 'Cpc', birthdate : new Date('1989-11-1'), phone : '0477 77 77 77'},
   
    { firstname : 'Ayoub', lastname : 'Nhi', birthdate : new Date('1997-10-18'), phone : '0472 45 76 78'},
    { firstname : 'schek', lastname : 'phpo', birthdate : new Date('1997-10-18'), phone : '0472 45 36 95'},
    { firstname : 'Cece', lastname : 'ole', birthdate : new Date('1997-10-18'), phone : '0472 44 76 95'},
    { firstname : 'Mimi', lastname : 'cra', birthdate : new Date('1997-10-18'), phone : '0472 45 77 95'},

        // { name: "S", prenom: "Tamara", date: new Date('1996, 0, 1'), numero: "0425879654" },
        // { lastname: "Q", firstname: "Fatima", birthdate: null, phone: "04523698563" },
        // { lastname: "P", firstname: "Sounia", birthdate: new Date(2010, 0, 24), phone: "0475821369" },
        // { lastname: "O", firstname: "Laurie", birthdate: new Date(2015, 1, 9), phone: "0412587963" },
        // { lastname: "I",firstname: "Sounia", birthdate: new Date(2022, 1, 17), phone: "0412563528" },
        // { lastname: "U", firstname: "Amandine", birthdate: new Date(1956, 1, 21), phone: "04179852936" },
        // { lastname: "Y", firstname: "Magaly", birthdate: new Date(1987, 2, 19), phone: "0418364759" },
        // { lastname: "Y", firstname: "Ksenia", birthdate: new Date(1990, 2, 25), phone: "0417125856" },
        // { lastname: "A", firstname: "Lara", birthdate: new Date(2000, 11, 12), phone: "0412578985" },
        // { lastname: "T", firstname: "Zuzana", birthdate: new Date(2000, 3, 29), phone: "04171258523" },
        // { lastname: "R", firstname: "Maïssâa", birthdate: new Date(1999, 4, 9), phone: null },
        // { lastname: "E", firstname: "Béné", birthdate: new Date(1995, 6, 2), phone: "0478985658" },
        // { lastname: "Z", firstname: "Alex", birthdate: new Date(1994, 7, 26), phone: "0478522896" },
];

const TBODY = document.querySelector("tbody");

// 2) Création d'une ligne
// JS DOC
/**
 * Créer une TR contenant les informations d'un contact
 * @param { { firstname : string, lastname : string, birthdate : Date, phone : string} } contact
 * @returns { HTMLElement }
*/
function createRow(contact) {
    const ROW = document.createElement("tr");

    //#region avant opti boucle
    // const TD_LASTNAME = document.createElement("td");
    // TD_LASTNAME.innerText = contact.lastname;

    // const TD_FIRSTNAME = document.createElement("td");
    // TD_FIRSTNAME.innerText = contact.firstname;

    // const TD_BIRTHDATE = document.createElement("td");
    // TD_BIRTHDATE.innerText = contact.birthdate.toLocaleDateString('fr');

    // const TD_PHONE = document.createElement("td");
    // TD_PHONE.innerText = contact.phone;

    // ROW.append( TD_FIRSTNAME, TD_LASTNAME, TD_BIRTHDATE, TD_PHONE);
    //#endregion

    // #region version opti boucle
    // On peut utiliser
    for(const prop in contact){
        console.log("Pour la propriété " + prop + " la valeur est " + contact[prop] );
        const TD = document.createElement("td");
        
        // Il faudrait vérifier si on a un type date pour une des données
        console.log(typeof contact[prop]); //pas assez précis (pour la date, renvoie object)
        console.log(contact[prop] instanceof Date ); //Renvoie un boolean si votre variable est du type renseigné (variable instanceof Type)
        console.log(contact[prop].constructor.name); //Renvoie le nom de l'objet correspondant au type (String, Number, Date etc...)

        // Si contact[prop] est de type Date, on affiche contact[prop] formaté, sinon, on affiche contact[prop] sans formatage
        TD.innerText = ( contact[prop] instanceof Date ) ? contact[prop].toLocaleDateString('fr') : contact[prop]  ;

        ROW.appendChild(TD);
    }

    return ROW;
}

// Test de la fonction
// TBODY.append( createRow(contacts[0]) );

// 3) Création des lignes à partir d'un tableau
/**
 * Fonction qui pour chaque élément dans tab, ajoute une row dans refElement 
 * @param { HTMLElement } refElement
 * @param { { firstname : string, lastname : string, birthdate : Date, phone : string}[] } tab
 */

function createRows(refElement, tab ){
    refElement.innerHTML = '';
   //pour chaque contact dans tab -> créer une row et l'ajouter dans refElement
   tab.forEach(c => {
        const ROW = createRow(c); //On appelle notre fonction qui crée une ligne pour un contact donné
        refElement.appendChild(ROW);

        // refElement.appendChild(createRow(c));
   })
}

//Affichage du tableau contacts au chargement de la page
createRows(TBODY, contacts);


//#region Test des tris
//Tri croissant sur les chaines de caractères :
// La méthode toSorted/sort prend en paramètre une fonction anonyme (callback)
// Cette fonction anonyme a deux paramètres correspondant à deux élément du tableaux comparés entre eux (ici deux contacts)
// Comme on peut faire le tri sur un propriété de ces contacts, on va devoir cibler cette propriété
console.clear();
const contactSortedByFirstname = contacts.toSorted( (contact1, contact2 ) => { 
                        // return contact1.firstname.localeCompare(contact2.firstname) 
                        //Si on veut le tri inverse
                        return contact2.firstname.localeCompare(contact1.firstname)
                    });
console.log( contactSortedByFirstname );

const contactSortedByLastname = contacts.toSorted( (contact1, contact2 ) => { 
    // return contact1.lastname.localeCompare(contact2.lastname) 
    return contact2.lastname.localeCompare(contact1.lastname) //dans l'autre sens

});
console.log( contactSortedByLastname );

//Tri sur les numbers
const contactSortedByBirthDate = contacts.toSorted( (contact1, contact2) => {
    //Attention que pour les dates, on obtient le nombre en ms depuis le 1/1/1970 donc plus la personne est vieille, plus ce chiffre sera petit (on doit donc inverser notre comparaison)
    return contact2.birthdate - contact1.birthdate; //pour un tri croissant
    // return contact1.birthdate - contact2.birthdate; //Pour un tri dans l'autre sens
})
console.log( contactSortedByBirthDate );
//#endregion

document.getElementById('asc-ln').addEventListener('click', () => {
    const contactSortedByLastname = contacts.toSorted( (contact1, contact2 ) => { 
        return contact1.lastname.localeCompare(contact2.lastname) 
    });
    createRows(TBODY, contactSortedByLastname);
});

document.getElementById('desc-ln').addEventListener('click', () => {
    const contactSortedByLastname = contacts.toSorted( (contact1, contact2 ) => { 
        return contact2.lastname.localeCompare(contact1.lastname) 
    });
    createRows(TBODY, contactSortedByLastname);
});

document.getElementById('asc-fn').addEventListener('click', () => {
    const contactSortedByFirstname = contacts.toSorted( (contact1, contact2 ) => { 
        return contact1.firstname.localeCompare(contact2.firstname) 
    });
    createRows(TBODY, contactSortedByFirstname);
});
document.getElementById('desc-fn').addEventListener('click', () => {
    const contactSortedByFirstname = contacts.toSorted( (contact1, contact2 ) => { 
        return contact2.firstname.localeCompare(contact1.firstname) 
    });
    createRows(TBODY, contactSortedByFirstname);
});

document.getElementById('asc-bd').addEventListener('click', () => {
    const contactSortedByBirthdate = contacts.toSorted( (contact1, contact2 ) => { 
        return contact2.birthdate - contact1.birthdate; 
    });
    createRows(TBODY, contactSortedByBirthdate);
});
document.getElementById('desc-bd').addEventListener('click', () => {
    const contactSortedByBirthdate = contacts.toSorted( (contact1, contact2 ) => { 
        return contact1.birthdate - contact2.birthdate; 
    });
    createRows(TBODY, contactSortedByBirthdate);
});

// Filtre de la liste de contacts quand on tape dans l'input
// l'évènement input, se déclenche chaque fois que vous tapez dans l'input
const INPUT_SEARCH = document.getElementById("search");
INPUT_SEARCH.addEventListener('input', () => {
    //Récupérer ce qui est tapé dans l'input
    const searched = INPUT_SEARCH.value;

    //tableau.filter(elem => condition)
    const newContacts = contacts.filter(contact => contact.firstname.includes(searched) || contact.lastname.includes(searched) || contact.phone.includes(searched));

    // Ce que fait le filter pour vous
    // const newContacts = [];
    // contacts.forEach(contact => {
    //     if(contact.firstname.includes(searched) || contact.lastname.includes(searched) || contact.phone.includes(searched)){
    //         newContacts.push(contact);
    //     }
    // })

    createRows(TBODY, newContacts);

})

//#endregion


