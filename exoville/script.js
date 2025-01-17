// Tableau des villes
const CITIES = [
    {
        name: "Paris",
        image: "./assets/images/paris.jpg",
        country: "France",
        continent: "Europe",
        nbResidents: 2148327,
    },
    {
        name: "Tokyo",
        image: "./assets/images/tokyo.jpg",
        country: "Japan",
        continent: "Asie",
        nbResidents: 13929286,
    },
    {
        name: "Washington",
        image: "./assets/images/washington.jpg",
        country: "United States",
        continent: "North America",
        nbResidents: null,
    },
    {
        name: "Ottawa",
        image: "./assets/images/ottawa.jpg",
        country: "Canada",
        continent: "North America",
        nbResidents: 1016356,
    },
    {
        name: "Rome",
        image: "./assets/images/rome.jpg",
        country: "Italy",
        continent: "Europe",
        nbResidents: 2872800,
    },
    {
        name: "Buenos Aires",
        image: "./assets/images/buenosaires.jpeg",
        country: "Argentina",
        continent: "South America",
        nbResidents: null,
    },
    {
        name: "Brussels",
        image: "./assets/images/brussels.jpg",
        country: "Belgium",
        continent: "Europe",
        nbResidents: 1211035,
    },
    {
        name: "Zagreb",
        image: "./assets/images/zagreb.jpg",
        country: "Croatia",
        continent: "Europe",
        nbResidents: null,
    },
];

// Fonction pour créer une carte de ville
function createCard(city) {
    const CARD = document.createElement('div');
    CARD.className = 'card';

    const IMAGE = document.createElement('img');
    IMAGE.src = city.image;
    IMAGE.alt = city.name;




    
IMAGE.addEventListener('click', async () => {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&lang=fr&appid=13a8212552579d1e8ec8126ba3817805`);

        const largeMapContent = document.getElementById('large-map-content');
        largeMapContent.innerHTML = `
        <h2>Informations météorologiques pour ${city.name} :</h2>
        <p>Température minimale : ${res.data.main.temp_min}</p>
        <p>Température maximale : ${res.data.main.temp_max}</p>
        <p>Température ressentie : ${res.data.main.feels_like}</p>
        <p>Température actuelle : ${res.data.main.temp}</p>
        <p>Description du temps : ${res.data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${res.data.weather[0].icon}.png" alt="Weather Icon">
        `;
        // largeMapContent.appendChild(createLargeMap(res.data));
        
    } catch (err) {
        // console.log(err);
        // Afficher l'erreur dans la grande div
        const largeMapContent = document.getElementById('large-map-content');
        largeMapContent.innerHTML = `<p>${err.message}</p>`;
        
        // Afficher la grande div
      
    }
    const largeMapContainer = document.getElementById('large-map-container');
    largeMapContainer.style.display = 'block';

    }
);



const NAME = document.createElement('h2');
NAME.textContent = city.name;

const COUNTRY = document.createElement('p');
COUNTRY.textContent = `Country: ${city.country}`;

const CONTINENT = document.createElement('p');
CONTINENT.textContent = `Continent: ${city.continent}`;

const NB_RESIDENTS = document.createElement('p');
NB_RESIDENTS.textContent = `Residents: ${city.nbResidents ?? 'donnée inconnue'}`;

CARD.appendChild(NAME);
CARD.appendChild(IMAGE);
CARD.appendChild(COUNTRY);
CARD.appendChild(CONTINENT);
CARD.appendChild(NB_RESIDENTS);

return CARD;
}


// Fonction pour afficher les cartes des villes
function positionCities(cities) {
    const CONTAINER = document.getElementById('cards-container');
    CONTAINER.innerHTML = ''; // Efface les cartes existantes
    
    cities.forEach(city => {
        const cityCard = createCard(city);
        CONTAINER.appendChild(cityCard);
    });
}


// Écouteur d'événement pour le changement de continent
document.getElementById('continent-select').addEventListener('change', function () {
    const selectedContinent = this.value;
    const filteredCities = CITIES.filter(city => selectedContinent === 'all' || city.continent === selectedContinent);
    positionCities(filteredCities);
});


// au click sur le bouton fermer la div se ferme en display none
const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', () => {
    const largeMapContainer = document.getElementById('large-map-container');
    largeMapContainer.style.display = 'none';
});

// Initialisation avec toutes les villes
positionCities(CITIES);

































































            
            
            
            
            // // Tableau des villes avec un identifiant unique
            // const CITIES = [
                //     {
                    //         name: "Paris",
                    //         image: "../images/paris.jpg",
                    //         country: "France",
                    //         continent: "Europe",
                    //         nbResidents: 2148327,
                    //     },
                    //     {
//         name: "Tokyo",
//         image: "../images/tokyo.jpg",
//         continent: "Asia",
//         nbResidents: 13929286,
//     },
//     {
    //         name: "Washington",
    //         image: "../images/washington.jpg",
    //         country: "United States",
    //         continent: "North America",
    //         nbResidents: null,
    //     },
    //     {
        //         name: "Ottawa",
        //         image: "../images/ottawa.jpg",
        //         country: "Canada",
        //         continent: "North America",
        //         nbResidents: 1016356,
        //     },
        //     {
            //         name: "Rome",
            //         image: "../images/rome.jpg",
            //         country: "Italy",
            //         continent: "Europe",
            //         nbResidents: 2872800,
            //     },
            //     {
                //         name: "Buenos Aires",
                //         image: "../images/buenosaires.jpeg",
                //         country: "Argentina",
                //         continent: "South America",
                //         nbResidents: null,
                //     },
                //     {
                    //         name: "Brussels",
                    //         image: "../images/brussels.jpg",
                    //         country: "Belgium",
                    //         continent: "Europe",
                    //         nbResidents: 1211035,
                    //     },
                    //     {
                        //         name: "Zagreb",
                        //         image: "../images/zagreb.jpg",
                        //         country: "Croatia",
                        //         continent: "Europe",
                        //         nbResidents: null,
                        //     },
                        // ];
                        
                        // // Fonction pour créer une carte de ville
                        // function createCard(city) {
//     const CARD = document.createElement('div');
//     CARD.className = 'card';

//     const IMAGE = document.createElement('img');
//     IMAGE.src = city.image;
//     IMAGE.alt = city.name;

//     IMAGE.addEventListener('click', async () => {
    //         try {
        //             // Requête pour géocoder le nom de la ville en coordonnées géographiques
        //             const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city.name}`;
        //             const geoResponse = await axios.get(geoUrl);
        
        //             if (geoResponse.data && geoResponse.data.length > 0) {
            //                 const lat = geoResponse.data[0].lat;
            //                 const lon = geoResponse.data[0].lon;
            
            //                 // Requête pour obtenir les informations météorologiques à partir des coordonnées
            //                 const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=13a8212552579d1e8ec8126ba3817805`;
            //                 const weatherResponse = await axios.get(weatherUrl);
            //                 const data = weatherResponse.data;
            
            //                 // Affichage des informations météorologiques dans la grande div
            //                 const largeMapContent = document.getElementById('large-map-content');
            //                 largeMapContent.innerHTML = `
            //                     <h2>Informations météorologiques pour ${city.name} :</h2>
            //                     <p>Température minimale : ${data.main.temp_min}</p>
            //                     <p>Température maximale : ${data.main.temp_max}</p>
            //                     <p>Température ressentie : ${data.main.feels_like}</p>
            //                     <p>Température actuelle : ${data.main.temp}</p>
            //                     <p>Description du temps : ${data.weather[0].description}</p>
            //                     <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
            //                 `;
            
            //                 // Afficher la grande div
            //                 const largeMapContainer = document.getElementById('large-map-container');
            //                 largeMapContainer.style.display = 'block';
            //             } else {
                //                 throw new Error("Impossible de trouver les coordonnées de cette ville.");
                //             }
                //         } catch (err) {
                    //             console.error(err);
                    //             // Afficher l'erreur dans la grande div
                    //             const largeMapContent = document.getElementById('large-map-content');
                    //             largeMapContent.innerHTML = `<p>${err.message}</p>`;
                    
                    //             // Afficher la grande div
                    //             const largeMapContainer = document.getElementById('large-map-container');
                    //             largeMapContainer.style.display = 'block';
                    //         }
                    //     });
                    
                    
                    
                    //     // placement des element de la carte dans la div container cards
                    //     const NAME = document.createElement('h2');
                    //     NAME.textContent = city.name;
                    
                    //     const COUNTRY = document.createElement('p');
                    //     COUNTRY.textContent = `Country: ${city.country}`;
                    
                    //     const CONTINENT = document.createElement('p');
                    //     CONTINENT.textContent = `Continent: ${city.continent}`;
                    
                    //     const NB_RESIDENTS = document.createElement('p');
                    //     NB_RESIDENTS.textContent = `Residents: ${city.nbResidents ?? 'donnée inconnue'}`;
                    
                    //     CARD.appendChild(NAME);
                    //     CARD.appendChild(IMAGE);
                    //     CARD.appendChild(COUNTRY);
                    //     CARD.appendChild(CONTINENT);
                    //     CARD.appendChild(NB_RESIDENTS);
                    
                    //     return CARD;
                    // }
                    
                    // // on efface les carte qui n'ont pas besoins d'etre la 
                    // function positionCities(cities) {
                        //     const CONTAINER = document.getElementById('cards-container');
                        //     CONTAINER.innerHTML = ''; // Efface les cartes existantes
                        
                        //     cities.forEach(city => {
                            //         const cityCard = createCard(city);
                            //         CONTAINER.appendChild(cityCard);
                            //     });
                            // }
                            
                            // // lorsque je choisist un continant je filtre les pays/ville et je les affiche
                            // document.getElementById('continent-select').addEventListener('change', function () {
                                //     const selectedContinent = this.value;
                                //     const filteredCities = CITIES.filter(city => selectedContinent === 'all' || city.continent === selectedContinent);
                                //     positionCities(filteredCities);
                                // });
                                
                                // // au click sur le bouton fermer la div se ferme en display none
                                // const closeButton = document.getElementById('close-button');
                                // closeButton.addEventListener('click', () => {
                                    //     const largeMapContainer = document.getElementById('large-map-container');
                                    //     largeMapContainer.style.display = 'none';
                                    // });
                                    
                                    // // Initialisation avec toutes les villes
                                    // positionCities(CITIES);