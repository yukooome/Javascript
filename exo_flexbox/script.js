

  // elements dont j'ai besoin
  const btn = document.getElementById ("btn");

  // recuperer les cards
  const carte_1 = document.getElementById ("carte1");
  const carte_2 = document.getElementById ("carte2");
  const carte_3 = document.getElementById ("carte3");
  const carte_4 = document.getElementById ("carte4");
  const carte_5 = document.getElementById ("carte5");

  // ajout de l'event
  btn.addEventListener("click", () => {
    console.log(carte_1);
    carte_1.style.order = Math.floor(Math.random()*5)
    carte_2.style.order = Math.floor(Math.random()*5)
    carte_3.style.order = Math.floor(Math.random()*5)
    carte_4.style.order = Math.floor(Math.random()*5)
    carte_5.style.order = Math.floor(Math.random()*5)
  } )











  