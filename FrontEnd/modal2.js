// afficher modal2
const btnAjouter = document.querySelector("#ajouter");
btnAjouter.addEventListener("click", function(event){
    event.preventDefault();
    const modale2 = document.querySelector("#modale2");
    modale2.style.display = "flex";
    document.querySelector(".close").addEventListener("click", closeModalAjouter)
    document.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
})
  //flêche retour
  const retour = document.querySelector("#retour");
  retour.addEventListener("click", function(event){
      event.preventDefault();
      const modale2 = document.querySelector("#modale2");
      modale2.style.display = "none";
      const modale1 = document.querySelector("#modal1");
      modale1.style.display = "flex";
      
  });
  
//fermer la modal d'ajout
    const closeModalAjouter = function(event) {
    const modale2 = document.querySelector("#modale2");
    if (modale2 === null) return;
    event.preventDefault();
    modale2.style.display = "none";
    modale2.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    const modale1 = document.querySelector("#modal1");
    modale1.style.display = "none"
};



// Fermeture par échappement de la modal pour l'accessibilité
window.addEventListener("keydown", function(event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }
});
  
  // click au bouton uniquement
  const stopPropagation = function (event) {
    event.stopPropagation()
  }

  const zoneImage = document.querySelector(".containerImage");
  //boutton telecharger image
  document.querySelector(".download_button").addEventListener("click", () =>{
    const display = document.querySelector("#custom_button");
    display.click();
    display.addEventListener("change", (event) => {

     const file = event.target.files[0]   
     containerImage.innerHTML = "";
     const uploadImage = document.createElement("img");
     uploadImage.src = URL.createObjectURL(file);
     uploadImage.alt = "Nouvelle Image";
     uploadImageploadedImage.style.width = "129px";
    uploadImage.style.height = "193px";
    containerImage.appendChild(uploadImage);
    })
  }) 
