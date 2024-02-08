// @ts-nocheck
export let gallerys = await fetch("http://localhost:5678/api/works").then(
  (works) => works.json()
);

//console.log(gallerys);

export function creatGallery(gallerys) {
  for (let i = 0; i < gallerys.length; i++) {
    const loop = gallerys[i];
    // Récupération de l'élément du DOM qui accueillera la gallery
    const sectionGallery = document.querySelector(".gallery");
    // Création d’une balise dédiée à une photo
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = loop.imageUrl;
    imageElement.alt = loop.title;
    const descriptionPhoto = document.createElement("figcaption");
    descriptionPhoto.innerText = loop.title;
    const idElement = document.createElement("id");
    idElement.id = loop.id;
    //console.log(idElement);
    //console.log(figureElement);

    // On rattache la balise photo à la section gallery

    sectionGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(descriptionPhoto);
    figureElement.appendChild(idElement);
  }
}
creatGallery(gallerys);

// Le bouton Tous
const btnAll = document.querySelector(".filterAll");
btnAll.addEventListener("click", function () {
  document.querySelector(".gallery").innerText = ""; //remettre à zero
  creatGallery(gallerys);
  document.querySelectorAll(".filterCategories-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  btnAll.classList.add("active");
});

// Bouton Objets
const btnObjet = document.querySelector(".filterObjects");
btnObjet.addEventListener("click", function () {
  const galleryObjets = gallerys.filter(function (gallerys) {
    return gallerys.category.id === 1;
  });
  document.querySelector(".gallery").innerText = ""; //remettre à zero
  creatGallery(galleryObjets);
  document.querySelectorAll(".filterCategories-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  btnObjet.classList.add("active");
});

// Bouton Appartements
const btnAppartements = document.querySelector(".fitlerApartments");
btnAppartements.addEventListener("click", function () {
  const galleryAppartements = gallerys.filter(function (gallerys) {
    return gallerys.category.id === 2;
  });
  document.querySelector(".gallery").innerText = ""; //remettre à zero
  creatGallery(galleryAppartements);
  document.querySelectorAll(".filterCategories-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  btnAppartements.classList.add("active");
});

// Bouton Hôtels & Restaurants
const btnHotelResto = document.querySelector(".filterHotelsRestaurants");
btnHotelResto.addEventListener("click", function () {
  const galleryHotelsRestaurants = gallerys.filter(function (gallerys) {
    return gallerys.category.id === 3;
  });
  document.querySelector(".gallery").innerText = ""; //remettre à zero
  creatGallery(galleryHotelsRestaurants);
  document.querySelectorAll(".filterCategories-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  btnHotelResto.classList.add("active");
});

// Masquage modifier
const modifierWrapper = document.querySelector(".modifier-wrapper");
modifierWrapper.setAttribute("style", "display : none");

// Création du bandeau d'édition en haut de la page et modifier en haut de la galerie
if (localStorage.getItem("token") !== null) {
  // Changement du bouton "login" en "logout"
  const loginHead = document.querySelector("#loginHead");
  loginHead.innerText = "logout";
  loginHead.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.replace("./index.html");
  });
  const bandeau = document.querySelector(".bandeau");

  const zoneEdition = document.createElement("div");
  zoneEdition.className = "editor";
  const logoEdition = document.createElement("i");
  logoEdition.className = "fa-regular fa-pen-to-square";

  const modeEdition = document.createElement("p");
  modeEdition.innerText = "Mode Édition";
  bandeau.appendChild(zoneEdition);
  zoneEdition.appendChild(logoEdition);
  zoneEdition.appendChild(modeEdition);

  // Masquage des filtres
  const hidingFilters = document.querySelector(".filtres");
  hidingFilters.setAttribute("style", "display: none");
  // affichage modifier

  modifierWrapper.setAttribute(
    "style",
    "display: flex; ; padding-bottom: 80px"
  );
  const loginModifier = document.querySelector(".js-login-modifier");

  loginModifier.setAttribute("style", "display: none");
}
