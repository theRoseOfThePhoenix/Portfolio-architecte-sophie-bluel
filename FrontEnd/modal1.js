// @ts-nocheck
import { updateWorksData } from "./script.js";

let gallerys = await fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);
// Fonction asynchrone pour supprimer une œuvre par son ID
export function deleteWorks(idElement) {
  try {
    const token = localStorage.getItem("token"); // récupération du token de l'utilisateur depuis le localStorage

    fetch(`http://localhost:5678/api/works/${idElement}`, {
      // appel API pour supprimer l'œuvre spécifiée par idElement
      method: "DELETE",
      headers: {
        Accept: "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        //Rafraîchissement des galeries après la suppression
        const updatedWorks = gallerys.filter((work) => work.id !== idElement);
        updateWorksData(updatedWorks);
      }
    });
  } catch (error) {
    // erreurs éventuelles lors de l'appel API
    console.error("Erreur lors de la suppression de l'œuvre : ", error);
  }
}
// Fonction pour créer et afficher la galerie dans une modale
export async function modalGallery(gallerys) {
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
        deleteWorks(loop.id);
      }
    });
  });
}
modalGallery(gallerys);

//ouverture de la modale
const openModal = function (event) {
  event.preventDefault();
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
  const modal1 = document.querySelector("#modal1");
  modal1.style.display = "none";
  modal1
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};
//ouverture de la modale
document.querySelector(".js-modal").addEventListener("click", openModal);
// click au bouton uniquement
const stopPropagation = function (event) {
  event.stopPropagation();
};
