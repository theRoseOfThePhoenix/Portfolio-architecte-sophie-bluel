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

async function getAllWork() {
    const response = await fetch("http://localhost:5678/api/works");
    const gallery = await response.json();
    console.log(gallery)

    for(let i = 0; i < gallery.length; i++) {
        
          // Récupération de l'élément du DOM qui accueillera la gallery
    const sectionGallery = document.querySelector(".gallery");
  // Création d’une balise dédiée à une photo
    const figureElement = document.createElement("figure");
  
  // Création des balises dans figure
     const imageElement = document.createElement("img");
     imageElement.src = gallery[i].imageUrl;
     imageElement.alt = gallery[i].title;
  
    const descriptionPhoto = document.createElement("figcaption");
    descriptionPhoto.textContent = gallery[i].title; 
    
    console.log(figureElement);
    
    // On rattache la balise photo à la section gallery
    sectionGallery.appendChild(figureElement);

    figureElement.appendChild(imageElement);
    figureElement.appendChild(descriptionPhoto);
  }
}

getAllWork();

