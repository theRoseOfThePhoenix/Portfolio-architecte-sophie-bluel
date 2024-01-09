

let gallerys = await fetch('http://localhost:5678/api/works').then(works => works.json());

console.log(gallerys)

function creatGallery(gallerys){

  for(let i = 0; i < gallerys.length; i++) {

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
      idElement.id =  loop.categoryId;
    
    console.log(idElement);
    console.log(figureElement);
    
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
      //remettre à zero
      document.querySelector(".gallery").innerText = ""; 
      creatGallery(gallerys);
      document.querySelectorAll(".filterCategories-btn").forEach(function(btn) {
      btn.classList.remove("active");
    });
      btnAll.classList.add("active");
    
});

// Bouton Objets    
  const btnObjet = document.querySelector(".filterObjects");
  btnObjet.addEventListener("click", function()  {
    const galleryObjets = gallerys.filter(function(gallerys) {
        return gallerys.category.id === 1;
    });
    document.querySelector(".gallery").innerText = "";
    creatGallery(galleryObjets);
    document.querySelectorAll(".filterCategories-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });
    btnObjet.classList.add("active");
    
});

// Bouton Appartements
const btnAppartements = document.querySelector(".fitlerApartments");
btnAppartements.addEventListener ("click",  function() {
    const galleryAppartements = gallerys.filter(function(gallerys) {
      return gallerys.category.id === 2;
    });
    document.querySelector(".gallery").innerText = "";
    creatGallery(galleryAppartements);
    document.querySelectorAll(".filterCategories-btn").forEach(function(btn) {
      btn.classList.remove("active");
  });
  btnAppartements.classList.add("active");
    });
  
// Bouton Hôtels & Restaurants
const btnHotelResto = document.querySelector(".filterHotelsRestaurants");
btnHotelResto.addEventListener("click",  function() {
      const galleryHotelsRestaurants = gallerys.filter(function(gallerys) {
        return gallerys.category.id ===3;
      });
      document.querySelector(".gallery").innerText = "";
      creatGallery(galleryHotelsRestaurants);
      document.querySelectorAll(".filterCategories-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });
    btnHotelResto.classList.add("active");
 });

           // Masquage modifier
           const modifierWrapper = document.querySelector(".modifier-wrapper");
           modifierWrapper.setAttribute("style", "visibility: hidden");
      
    
    // Création du bandeau d'édition en haut de la page et modifier en haut de la galerie
    if (localStorage.getItem("token") !== null) {
      // Changement du bouton "login" en "logout"
      const loginHead = document.querySelector("#loginHead");
      loginHead.innerText = "logout"
      loginHead.addEventListener("click", function(event) {
          event.preventDefault();
          localStorage.removeItem("token");
          window.location.replace("./index.html");
      })
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
        modifierWrapper.setAttribute("style", "visibility: visible; ; margin-bottom: 50px");



// modale1


let modal = null
//ouverture de la modale
const openModal = function(event) {
  event.preventDefault()
  const target = document.querySelector(event.target.getAttribute("href"))
  target.style.display = null
  target.removeAttribute("aria-hidden")
  target.setAttribute("aria-modal", "true")
  modal = target
  modal.addEventListener ("click", closeModal)
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}
//fermeture de la modale
const closeModal = function(event) {
  if (modal === null) return
  event.preventDefault()
  modal.style.display = "none"
  modal.setAttribute("aria-hidden", "true")
  modal.removeAttribute("aria-modal")
  modal.removeEventListener ("click", closeModal)
  modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
  modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
  modal = null
}
// click au bouton uniquement
const stopPropagation = function (event) {
  event.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a =>{
  a.addEventListener("click", openModal)
  
})
//fermeture par echape de la modale pour l'accecibillité

window.addEventListener("keydown", function (event){
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal (event)
  }
})


    }

