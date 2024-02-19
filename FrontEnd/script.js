// @ts-nocheck
import { modalGallery } from "./modal1.js";

export let gallerys = await fetch("http://localhost:5678/api/works").then(
  (works) => works.json()
);

const categories = await fetch("http://localhost:5678/api/categories").then(
  (categories) => categories.json()
);

export async function creatGallery(gallerys) {
  for (let i = 0; i < gallerys.length; i++) {
    const loop = gallerys[i];
    const sectionGallery = document.querySelector(".gallery"); // Récupération de l'élément du DOM qui accueillera la gallery
    const figureElement = document.createElement("figure"); // Création d’une balise dédiée à une photo
    const imageElement = document.createElement("img");
    const descriptionPhoto = document.createElement("figcaption");
    const idElement = document.createElement("id");
    imageElement.src = loop.imageUrl;
    imageElement.alt = loop.title;
    idElement.id = loop.id;
    descriptionPhoto.innerText = loop.title;

    sectionGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(descriptionPhoto);
    figureElement.appendChild(idElement);
  }
}
creatGallery(gallerys);

//Création des filtres par catégorie
async function creerFiltres(categories) {
  const zoneButtons = document.querySelector(".filtres");
  const buttonReset = document.createElement("button");
  buttonReset.innerText = "Tous";
  buttonReset.classList.add("filterAll", "filterCategories-btn", "active");
  zoneButtons.appendChild(buttonReset);
  for (let i = 0; i < categories.length; i++) {
    const buttonFilters = document.createElement("button");
    buttonFilters.classList.add("filterCategories-btn");
    zoneButtons.appendChild(buttonFilters);
    buttonFilters.innerText = categories[i].name;
    buttonFilters.id = categories[i].id;
  }
}
creerFiltres(categories);
//gestion des boutons filtres
//stylisation des btns
const updateActiveButton = (activeButton) => {
  document.querySelectorAll(".filterCategories-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  activeButton.classList.add("active");
};

document.querySelectorAll(".filterCategories-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const categoryID = parseInt(btn.getAttribute("id"), 10); // verifie le numéro de la catégorie entré dans le html  La fonction parseInt convertit cette valeur en un nombre entier
    if (btn.classList.contains("filterAll")) {
      document.querySelector(".gallery").innerText = ""; // Remettre à zéro la galerie
      creatGallery(gallerys);
    } else {
      const filteredGallerys = gallerys.filter(
        (gallery) => gallery.category.id === categoryID
      );
      document.querySelector(".gallery").innerText = ""; // Remettre à zéro la galerie
      creatGallery(filteredGallerys);
    }
    updateActiveButton(btn);
  });
});

//Mise à jour de la gallery lors de l'ajout ou de la suppression d'image

export function updateWorksData(updatedWorks) {
  gallerys = updatedWorks;
  refreshGalleries(); // Fonction pour rafraîchir l'affichage
}
export function refreshGalleries() {
  // Videz et recréez la galerie avec currentWorksData
  document.querySelector(".gallery").innerHTML = "";
  document.querySelector(".modal_gallery").innerHTML = "";
  creatGallery(gallerys); // Utilisez les données mises à jour pour recréer la galerie
  modalGallery(gallerys);
}
//mode edition
// Masquage btn modifier
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

  //intégration DOM
  const bandeau = document.querySelector(".bandeau");
  const zoneEdition = document.createElement("div");
  const logoEdition = document.createElement("i");
  const modeEdition = document.createElement("p");
  zoneEdition.className = "editor";
  logoEdition.className = "fa-regular fa-pen-to-square";
  modeEdition.innerText = "Mode Édition";
  bandeau.appendChild(zoneEdition);
  zoneEdition.appendChild(logoEdition);
  zoneEdition.appendChild(modeEdition);

  // Masquage des filtres
  const hidingFilters = document.querySelector(".filtres");
  hidingFilters.setAttribute("style", "display: none");

  //styliser le bouton modifier
  modifierWrapper.setAttribute(
    "style",
    "display: flex; ; padding-bottom: 80px"
  );
  const loginModifier = document.querySelector(".js-login-modifier");
  loginModifier.setAttribute("style", "display: none");
}
