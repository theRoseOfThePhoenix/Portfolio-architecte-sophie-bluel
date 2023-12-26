

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
      document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    btnAll.classList.add("active");
    
      console.log("youyou");
});

// Bouton Objets    
  const btnObjet = document.querySelector(".filterObjects");
  btnObjet.addEventListener("click", function()  {
    const galleryObjets = gallerys.filter(function(gallerys) {
        return gallerys.category.id === 1;
    });
    document.querySelector(".gallery").innerText = "";
    creatGallery(galleryObjets);
    document.querySelectorAll("#filtres button").forEach(function(btn) {
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
    document.querySelectorAll("#filtres button").forEach(function(btn) {
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
      document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    btnHotelResto.classList.add("active");
 });
      
    
