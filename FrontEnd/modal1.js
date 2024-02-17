// @ts-nocheck
// Importation des fonctions nécessaires depuis le script principal
import { creatGallery, gallerys } from "./script.js";

// Fonction asynchrone pour supprimer une œuvre par son ID
export async function deleteWorks(idElement) {
  try {
    const token = localStorage.getItem("token"); // récupération du token de l'utilisateur depuis le localStorage

    await fetch(`http://localhost:5678/api/works/${idElement}`, {
      // appel API pour supprimer l'œuvre spécifiée par idElement
      method: "DELETE",
      headers: {
        Accept: "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    // Rafraîchissement des galeries après la suppression
    const works = await fetch("http://localhost:5678/api/works").then(
      // appel API pour récupérer les œuvres mises à jour
      (response) => response.json()
    );

    document.querySelector(".gallery").innerHTML = ""; // nettoyage des contenus
    document.querySelector(".modal_gallery").innerHTML = ""; // nettoyage des contenus

    modalGallery(works); // rapelle des galeries mis à jour
    creatGallery(works); // rapelle des galeries mis à jour
  } catch (error) {
    // erreurs éventuelles lors de l'appel API
    console.error("Erreur lors de la suppression de l'œuvre : ", error);
  }
}

// Fonction pour créer et afficher la galerie dans une modale
export function modalGallery(gallerys) {
  const modalGallery = document.querySelector(".modal_gallery"); // élément du DOM destiné à la galerie modale

  modalGallery.innerHTML = ""; // nettoyage des contenus

  // Itération sur chaque œuvre pour créer et afficher son élément correspondant
  gallerys.forEach((loop) => {
    const figureElement = document.createElement("figure"); // création DOm pour chaque œuvre
    const imageElement = document.createElement("img"); // création DOm pour chaque œuvre
    const trashIcon = document.createElement("i"); // création DOm pour chaque œuvre

    // classes et attributs nécessaires
    figureElement.className = "figure_modal";
    imageElement.className = "imageStyleModal";
    imageElement.src = loop.imageUrl;
    imageElement.alt = loop.title;
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    //console.log(imageElement);
    // Assemblage des éléments et ajout au DOM
    figureElement.appendChild(imageElement);
    figureElement.appendChild(trashIcon);
    modalGallery.appendChild(figureElement);
    console.log(figureElement);
    // Ajout d'un écouteur d'événement pour la suppression de l'œuvre
    trashIcon.addEventListener("click", async (event) => {
      event.preventDefault();

      // Message de confirmation avant suppression
      const isConfirmed = confirm(
        "Êtes-vous sûr de vouloir supprimer cette œuvre ?"
      );
      if (isConfirmed) {
        // Appel de la fonction de suppression en passant l'ID de l'œuvre
        await deleteWorks(loop.id);
      }
    });
  });
}
modalGallery(gallerys);

// modale1
let modal = null;

//ouverture de la modale
const openModal = function (event) {
  // const target = document.querySelector(event.target.getAttribute("href"));
  event.preventDefault();
  // target.style.display = null;
  // modal = target;
  const modal1 = document.querySelector("#modal1");
  modal1.style.display = "flex";
  modal1.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal1
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

//Fermeture de la modale
const closeModal = function (event) {
  event.preventDefault();
  if (modal === null) return;
  modal.style.display = "none";
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};
//Ouverture de la modal1
document.querySelector(".js-modal").addEventListener("click", openModal);

// click au bouton uniquement
const stopPropagation = function (event) {
  event.stopPropagation();
};
