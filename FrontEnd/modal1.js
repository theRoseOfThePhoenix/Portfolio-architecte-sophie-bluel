// @ts-nocheck
//creation de la gallery dans la modal
import { creatGallery, gallerys } from "./script.js";

export function modalGallery(gallerys) {
  const modalGallery = document.querySelector(".modal_gallery");
  const modal1 = document.querySelector("#modal1");
  modalGallery.innerHTML = "";

  for (let i = 0; i < gallerys.length; i++) {
    // Récupération de l'élément du DOM qui accueillera la gallery
    const loop = gallerys[i];
    // Création d’une balise dédiée à une photo
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const trashIcon = document.createElement("i");
    const idElement = loop.id;
    figureElement.className = "figure_modal";
    imageElement.className = "imageStyleModal";
    imageElement.src = loop.imageUrl;
    imageElement.alt = loop.title;
    trashIcon.classList.add("fa-solid", "fa-trash-can"); //btn trash

    console.log(idElement);
    console.log(figureElement);
    // On rattache la balise photo à la section gallery
    modalGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(trashIcon); //btn trash

    //btn trash ecoute devenement
    trashIcon.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      deleteWorks(idElement);
      modal1.style.display = "flex";
    });
  }
}
console.log(modal1);
modalGallery(gallerys);

// modale1
let modal = null;

//ouverture de la modale
const openModal = function (event) {
  const target = document.querySelector(event.target.getAttribute("href"));
  event.preventDefault();
  target.style.display = null;
  modal = target;
  modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

//fermeture de la modale
const closeModal = function (event) {
  event.preventDefault();
  if (modal === null) return;
  modal.style.display = "none";
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};
//ouverture de la modal1
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
// click au bouton uniquement
const stopPropagation = function (event) {
  event.stopPropagation();
};

// Fonction asynchrone pour supprimer une photo par son ID
export async function deleteWorks(idElement) {
  console.log(idElement);

  const imageElement = idElement;
  if (imageElement) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5678/api/works/" + idElement, {
      method: "DELETE",
      headers: {
        Accept: "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const figureElement = document.getElementById(idElement);
    figureElement.remove();
    const works = await fetch("http://localhost:5678/api/works").then((works) =>
      works.json()
    );
    const sectionGalleryRefresh = document.querySelector(".gallery");
    const modalGalleryReferesh = document.querySelector(".modal_gallery");
    sectionGalleryRefresh.innerHTML = "";
    modalGalleryReferesh.innerHTML = "";

    modalGallery(works);
    creatGallery(works);
  }
}
