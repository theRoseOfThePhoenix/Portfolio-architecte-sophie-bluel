// @ts-nocheck
import { modalGallery } from "./modal1.js";
import { creatGallery } from "./script.js";

const formData = new FormData();
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
  .addEventListener("click", downloadImage);

// Gestionnaire d'événements pour le bouton télécharger dans la modale2
function downloadImage(event) {
  const display = document.querySelector("#custom_button");
  display.click(); //declecnhe l'ouverture du menu de selection de l'image à telecharger
  event.preventDefault();
  const creatImageOnce = function (event) {
    createImage(event);
    display.removeEventListener("change", creatImageOnce);
  }; //empeche l'aparition d'un message dans le champ titre du formulaire
  display.addEventListener("change", createImage);
}

// Gestionnaire d'événements pour le changement de l'image dans la modale2
function createImage(event) {
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
}
// Réinitialisation de l'objet FormData après chaque soumission réussie
function resetFormData() {
  const formData = new FormData();
}

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
    //modal1Open = true;
    //Nouveau fetch de récupération des images stocker dans une variable
    const works = await fetch("http://localhost:5678/api/works").then((works) =>
      works.json()
    );
    //Vidage de la gallery et appel des fonction de creation de gallery avec le nouveau fetch en parametre
    const sectionGalleryRefresh = document.querySelector(".gallery");
    sectionGalleryRefresh.innerHTML = "";
    creatGallery(works);
    modalGallery(works);
    resetFormData();
  } catch (error) {
    console.error("Erreur lors de la création de l'œuvre:", error);
  }
}

const btnValider = document.querySelector("#form_photo");
btnValider.addEventListener("submit", checkForm);

function checkForm(event) {
  event.preventDefault();
  //ajout du titre et de la catégorie dans l'objet
  const photoTitre = document.querySelector("#titre_photo").value;
  formData.append("title", photoTitre);
  const photoCategorie = document.querySelector("#categorie_photo").value;
  formData.append("category", photoCategorie);
  //displayImage.innerHTML = "";
  createWorks();
  const modale2 = document.querySelector("#modale2");
  modale2.style.display = "none";
  const modale1 = document.querySelector("#modal1");
  modale1.style.display = "flex";
  btnValider.reset();
  resetModalImage();
}

// réinitialisation de la modal téléchargement
async function resetModalImage() {
  const modale2 = document.querySelector("#modale2");
  const displayImageModal2 = modale2.querySelector(".containerImage");
  const inputFileModal2 = modale2.querySelector("#custom_button");
  displayImageModal2.innerHTML = `
  <i class="fa-solid fa-image"></i>
  <input type="file" id="custom_button" />
  <button class="download_button">+ Ajouter photo</button>
  <p class="conditionPix">jpn, png : 4mo max</p>
  `;
  document
    .querySelector(".download_button")
    .addEventListener("click", downloadImage);
  //inputFileModal2.value = "";
  if (inputFileModal2) {
    inputFileModal2.addEventListener("change", createImage);
  }
  const btnValider = document.querySelector("#form_photo");
  btnValider.addEventListener("submit", checkForm);
}

// // Check de la limite de 4mo de l'image
// let uploadLimit = document.querySelector("#custom_button");
// uploadLimit.onchange = function () {
//   if (photo_form.files[0].size > 4194304) {
//     alert("Fichier trop volumineux");
//     photo_form.value = "";
//   }
// };
