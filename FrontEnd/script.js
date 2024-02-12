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

    // On rattache la balise photo à la section gallery
    sectionGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(descriptionPhoto);
    figureElement.appendChild(idElement);
  }
}
creatGallery(gallerys);

//gestion des boutons filtres
//stylisation des btns
const updateActiveButton = (activeButton) => {
  document.querySelectorAll(".filterCategories-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  activeButton.classList.add("active");
};
// apelle la galery en fonction du filtre
const filterAndDisplayGallery = (filterCondition) => {
  const filteredGallerys = gallerys.filter(filterCondition);
  document.querySelector(".gallery").innerText = ""; // Remettre à zéro la galerie
  creatGallery(filteredGallerys);
};

document.querySelectorAll(".filterCategories-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const categoryID = parseInt(btn.getAttribute("data-category-id"), 10); // verifie le numéro de la catégorie entré dans le html  La fonction parseInt convertit cette valeur en un nombre entier
    if (btn.classList.contains("filterAll")) {
      creatGallery(gallerys);
    } else {
      filterAndDisplayGallery((gallery) => gallery.category.id === categoryID);
    }
    updateActiveButton(btn);
  });
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

  //intégration DOM
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

  //styliser le bouton modifier
  modifierWrapper.setAttribute(
    "style",
    "display: flex; ; padding-bottom: 80px"
  );
  const loginModifier = document.querySelector(".js-login-modifier");
  loginModifier.setAttribute("style", "display: none");
}
