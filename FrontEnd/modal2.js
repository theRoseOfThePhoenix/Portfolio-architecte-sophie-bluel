// @ts-nocheck
import { modalGallery } from "./modal1.js";
import { creatGallery } from "./script.js";
import { gallerys } from "./script.js";
// afficher modal2
const btnAjouter = document.querySelector("#ajouter");
btnAjouter.addEventListener("click", function (event) {
  event.preventDefault();
  const modale2 = document.querySelector("#modale2");
  modale2.style.display = "flex";

  document.querySelector(".close").addEventListener("click", closeModalAjouter);

  document
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
});

//flêche retour
const retour = document.querySelector("#retour");
retour.addEventListener("click", function (event) {
  event.preventDefault();
  const modale2 = document.querySelector("#modale2");
  modale2.style.display = "none";
  const modale1 = document.querySelector("#modal1");
  modale1.style.display = "flex";
});

//fermer la modal d'ajout
const closeModalAjouter = function (event) {
  event.preventDefault();
  const modale2 = document.querySelector("#modale2");
  if (modale2 === null) return;
  modale2.style.display = "none";

  modale2
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  const modale1 = document.querySelector("#modal1");
  modale1.style.display = "none";
};

// click au bouton uniquement
const stopPropagation = function (event) {
  event.stopPropagation();
  event.preventDefault();
};

const displayImage = document.querySelector(".containerImage");
//boutton telecharger image
document
  .querySelector(".download_button")
  .addEventListener("click", (event) => {
    const display = document.querySelector("#custom_button");
    display.click(); //declecnhe l'ouverture du menu de selection de l'image a telecharger
    event.preventDefault(); //empeche l'aparition d'un message dans le champ titre du formulaire
    display.addEventListener("change", (event) => {
      //ecoute du changement du champ input file
      event.preventDefault();
      const file = event.target.files[0]; //acces au fichier par propriete files

      formData.append("image", file); //ajout du fichier dans l'objet formData
      displayImage.innerHTML = ""; //effacement du contenu du cadre image
      //affichage de l'image dans le cadre
      const uploadImage = document.createElement("img");
      uploadImage.src = URL.createObjectURL(file);
      uploadImage.alt = "Nouvelle Image";
      uploadImage.style.height = "220px";
      displayImage.appendChild(uploadImage);
    });
  });
//contenant les nouvelles informations de la nouvelle photo
const formData = new FormData();
console.log(formData);
let modal1Open = false;
// Fonction asynchrone pour importer un nouvelle photo
async function createWorks() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  modal1Open = true;
  //Nouveau fetch de récupération des images stocker dans une variable
  const works = await fetch("http://localhost:5678/api/works").then((works) =>
    works.json()
  );
  //Vidage de la gallery et appel des fonction de creation de gallery avec le nouveau fetch en parametre
  const sectionGalleryRefresh = document.querySelector(".gallery");
  sectionGalleryRefresh.innerHTML = "";
  creatGallery(works);
  modalGallery(works);
}

const btnValider = document.querySelector("#form_photo");
btnValider.addEventListener("submit", (event) => {
  const photoTitre = document.querySelector("#titre_photo").value;
  formData.append("title", photoTitre);
  const photoCategorie = document.querySelector("#categorie_photo").value;
  formData.append("category", photoCategorie);

  createWorks();
  event.preventDefault();
  if (!modal1Open) {
    const modale2 = document.querySelector("#modale2");
    modale2.style.display = "none";
    const modale1 = document.querySelector("#modal1");
    modale1.style.display = "flex";
    btnValider.reset();
    event.preventDefault();
  }
});
