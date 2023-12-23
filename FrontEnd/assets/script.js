/*
const reponse = await fetch("http://localhost:5678/api/works")
  .then(response => {
    // La méthode json() renvoie une Promise qui résout avec le corps du JSON parsé
    return response.json();
  })
  .then(data => {
    // Faites quelque chose avec les données récupérées
    const gallery = data
    console.log(gallery);
    getAllWork();
  })

  .catch(error => {
    // Gérer les erreurs survenues lors de la requête
    console.error('Erreur de fetch:', error);
  });*/

export async function getAllWork() {
    const response = await fetch("http://localhost:5678/api/works");
    const gallery = await response.json();
    console.log(gallery)

    for(let i = 0; i < gallery.length; i++) {
        
  // Récupération de l'élément du DOM qui accueillera la gallery
    const sectionGallery = document.querySelector(".gallery");
  // Création d’une balise dédiée à une photo
  const figureElement = document.createElement("figure");
  const imageElement = document.createElement("img");
  imageElement.src = gallery[i].imageUrl;
  imageElement.alt = gallery[i].title;

 const descriptionPhoto = document.createElement("figcaption");
 descriptionPhoto.textContent = gallery[i].title; 

 const idElement = document.createElement("id");
 idElement.id =  gallery[i].categoryId;
 console.log(idElement);
 console.log(figureElement);
 
 // On rattache la balise photo à la section gallery
 sectionGallery.appendChild(figureElement);
 figureElement.appendChild(imageElement);
 figureElement.appendChild(descriptionPhoto);
 figureElement.appendChild(idElement);
  }
}
getAllWork();

const btnAll = document.querySelector(".filterAll");
    btnAll.addEventListener("click", function () {
      getAllWork();
      console.log("youyou");
    });

    

async function objectFilter() {
  const response = await fetch("http://localhost:5678/api/works");
  const gallery = await response.json();


  const boutonObjet = document.querySelector(".filterObjects");
  boutonObjet.addEventListener("click",  () => {
    for(let i = 0; i < gallery.length; i++) {
      const tableauObjet = gallery.filter((id) => id.categoryId == 1 );
      console.log(tableauObjet);
      const sectionGallery = document.querySelector(".gallery");
      sectionGallery.innerHTML = "";


      return tableauObjet
    };
  });
}
objectFilter()

async function appartementsFilter() {
  const response = await fetch("http://localhost:5678/api/works");
  const gallery = await response.json();
const boutonAppartements = document.querySelector(".fitlerApartments");
boutonAppartements.addEventListener("click",  () => {
    for(let i = 0; i < gallery.length; i++) {
      const tableauAppartements = gallery.filter((id) => id.categoryId == 2 );
      console.log(tableauAppartements);
      const sectionGallery = document.querySelector(".gallery");
      sectionGallery.innerHTML = "";
      return tableauAppartements
    };
  });
}
  appartementsFilter()



async function hotelRetauFilter() {
  const response = await fetch("http://localhost:5678/api/works");
  const gallery = await response.json();
const btnHotelResto = document.querySelector(".filterHotelsRestaurants");
btnHotelResto.addEventListener("click",  () => {
    for(let i = 0; i < gallery.length; i++) {
      const tableaHotelsRestaurants = gallery.filter((id) => id.categoryId == 3 );
      console.log(tableaHotelsRestaurants);
      const sectionGallery = document.querySelector(".gallery");
      sectionGallery.innerHTML = "";
      return tableaHotelsRestaurants
    };
  });
}
hotelRetauFilter()