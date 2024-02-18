// @ts-nocheck

// Importations nécessaires
import { gallerys, updateWorksData } from "./script.js";

// Sélecteurs DOM
const modale2 = document.querySelector("#modale2");
const btnAjouter = document.querySelector("#ajouter");
const btnFermer = modale2.querySelector(".close");
const btnStopPropagation = modale2.querySelector(".js-modal-stop");
const btnRetour = document.querySelector("#retour");
const apercuPhotoDiv = document.querySelector("#apercuPhotoDiv");
const inputImage = document.querySelector("#custom_button");
const apercuPhoto = document.querySelector("#apercuPhoto");

// Affichage de la modal d'ajout (modal2)
btnAjouter.addEventListener("click", (event) => {
  event.preventDefault();
  modale2.style.display = "flex";
});

// Fermeture de modal2
btnFermer.addEventListener("click", closeModalAjouter);
btnStopPropagation.addEventListener("click", stopPropagation);

// Retour à modal1
btnRetour.addEventListener("click", (event) => {
  event.preventDefault();
  modale2.style.display = "none";
  document.querySelector("#modal1").style.display = "flex";
});

// fonction que fait la fermeture de la modal2
function closeModalAjouter(event) {
  event.preventDefault();
  modale2.style.display = "none";
}

// fonction qui stoppe la propagation de l'événement de clic
function stopPropagation(event) {
  event.stopPropagation();
}

inputImage.addEventListener("change", createImage); // téléchargement de l'image

// Fonction pour créer et afficher l'image téléchargée
function createImage(event) {
  let file = event.target.files[0];
  let url = URL.createObjectURL(file);
  apercuPhoto.src = url;
  apercuPhoto.alt = "Nouvelle Image de Sophie Bluel";
  apercuPhotoDiv.style.display = "flex";
}

let newFile = new FormData(); // Ajoutez des données à formData si nécessaire

// Fonction asynchrone pour importer une nouvelle photo
async function createWorks(newFile) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: newFile,
    });

    if (response.status != 201) {
      throw new Error("Une erreur est survenue");
    }
    // Rafraîchissement des galeries devrait être ici si nécessaire
    const updatedWorks = await response.json();
    updateWorksData([...gallerys, updatedWorks]); // Assurez-vous que cette ligne fait ce que vous attendez

    //on cache la div de l'image uploeadé et on vide la source
    const uploadImageDiv = document.querySelector("#apercuPhotoDiv");
    uploadImageDiv.style.display = "none"; // Modification pour une meilleure lisibilité
    const uploadImage = document.querySelector("#apercuPhoto");
    uploadImage.src = "";
  } catch (error) {
    console.error("Erreur lors de la création de l'œuvre:", error);
  }
}

const btnValider = document.querySelector("#form_photo");
btnValider.addEventListener("submit", checkForm);

function checkForm(event) {
  event.preventDefault();
  // Initialisation de formData pour chaque soumission pour éviter d'ajouter des données en double
  newFile = new FormData();
  let nouvellePhoto = document.querySelector("#custom_button").files[0];
  let photoTitre = document.querySelector("#titre_photo").value;
  let photoCategorie = document.querySelector("#categorie_photo").value;
  // Validation du titre
  if (!photoTitre) {
    alert("Veuillez renseigner le titre de la photo.");
  }
  // Validation de la catégorie
  if (!photoCategorie) {
    alert("Veuillez sélectionner une catégorie.");
    return;
  }
  // Validation de la taille de l'image (4 Mo = 4 * 1024 * 1024 octets)
  if (nouvellePhoto && nouvellePhoto.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }
  // Ajout des informations au formData
  newFile.append("image", nouvellePhoto);
  newFile.append("title", photoTitre);
  newFile.append("category", photoCategorie);

  // Appel de la fonction pour créer une nouvelle œuvre
  createWorks(newFile);

  // Réinitialisation et fermeture des modales après la soumission
  document.querySelector("#form_photo").reset();
  modale2.style.display = "none";
  document.querySelector("#modal1").style.display = "none";
}
