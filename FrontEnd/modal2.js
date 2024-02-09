// @ts-nocheck
import { modalGallery } from "./modal1.js";
import { creatGallery } from "./script.js";

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

//boutton telecharger image
const displayImage = document.querySelector("#apercuPhotoDiv");

document.querySelector(".cust_button").addEventListener("click", downloadImage);

// Gestionnaire d'événements pour le bouton télécharger dans la modale2

function downloadImage(event) {
  const display = document.querySelector("#custom_button");
  // Supprimez d'abord tout gestionnaire d'événements 'change' précédent, s'il y en a
  display.removeEventListener("change", createImage);
  display.click(); // Déclenche l'ouverture du menu de sélection de l'image à télécharger
  event.preventDefault(); // Empêche l'apparition d'un message dans le champ titre du formulaire
  // Ensuite, ajoutez le nouvel écouteur d'événement 'change'
  display.addEventListener("change", createImage);
}

// Gestionnaire d'événements pour le changement de l'image dans la modale2

function createImage(event) {
  //ecoute du changement du champ input file
  event.preventDefault();
  let file = event.target.files[0]; //acces au fichier par propriete files

  //affichage de l'image dans le cadre
  let url = URL.createObjectURL(file);
  const uploadImage = document.querySelector("#apercuPhoto");
  const uploadImageDiv = document.querySelector("#apercuPhotoDiv");
  uploadImage.src = url;
  uploadImage.alt = "Nouvelle Image de Sophie Bluel";
  uploadImageDiv.setAttribute("style", "display: flex");
  console.log(url);
}
let formData = new FormData();
// Fonction asynchrone pour importer un nouvelle photo
async function createWorks() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    console.log(response);

    //on cache la div de l'image uploeadé et on vide la source
    const uploadImageDiv = document.querySelector("#apercuPhotoDiv");
    uploadImageDiv.setAttribute("style", "display: none");
    const uploadImage = document.querySelector("#apercuPhoto");
    uploadImage.src = "";

    //Nouveau fetch de récupération des images stocker dans une variable
    const works = await fetch("http://localhost:5678/api/works").then((works) =>
      works.json()
    );
    //Vidage de la gallery et appel des fonction de creation de gallery avec le nouveau fetch en parametre
    const sectionGalleryRefresh = document.querySelector(".gallery");
    sectionGalleryRefresh.innerHTML = "";
    creatGallery(works);
    modalGallery(works);
  } catch (error) {
    console.error("Erreur lors de la création de l'œuvre:", error);
  }
}

const btnValider = document.querySelector("#form_photo");
btnValider.addEventListener("submit", checkForm);

async function checkForm(event) {
  event.preventDefault();
  formData = new FormData();
  let nouvellePhoto = document.querySelector("#custom_button");
  formData.append("image", nouvellePhoto.files[0]); //ajout du fichier dans l'objet formData
  //ajout du titre et de la catégorie dans l'objet
  let photoTitre = document.querySelector("#titre_photo").value;
  formData.append("title", photoTitre);
  let photoCategorie = document.querySelector("#categorie_photo").value;
  formData.append("category", photoCategorie);
  createWorks();
  const modale2 = document.querySelector("#modale2");
  modale2.style.display = "none";
  const modale1 = document.querySelector("#modal1");
  modale1.style.display = "none";
  btnValider.reset();
}
