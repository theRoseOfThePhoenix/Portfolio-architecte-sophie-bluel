//creation de la gallery dans la modal
let gallerys = await fetch('http://localhost:5678/api/works').then(works => works.json());

function modalGallery(gallerys){

    const modalGallery = document.querySelector(".modal_gallery")
    modalGallery.innerText="";
    
    for(let i = 0; i < gallerys.length; i++) {
  
        // Récupération de l'élément du DOM qui accueillera la gallery
        const loop = gallerys[i];      
        
  
        // Création d’une balise dédiée à une photo
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const trashIcon = document.createElement("i");
        const idElement = loop.id;
        figureElement.className ="figure_modal"
        imageElement.className = "imageStyleModal";
        imageElement.src = loop.imageUrl;
        imageElement.alt = loop.title;
        trashIcon.classList.add("fa-solid", "fa-trash-can"); //btn trash
  
        // console.log(idElement);
        console.log(figureElement);
        
      
      // On rattache la balise photo à la section gallery
      modalGallery.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(trashIcon);  //btn trash
  
      //btn trash ecoute devenement
    trashIcon.addEventListener("click", (event) => {
    event.stopPropagation()
    deleteWorks(idElement);
  
  });  
    }
  }
  modalGallery(gallerys);
  
  
  // modale1
  let modal = null

  //ouverture de la modale
  const openModal = function(event) {
    event.preventDefault()
  const target = document.querySelector(event.target.getAttribute("href"))
    target.style.display = null
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
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
  }
     //ouverture de la modal1 
     document.querySelectorAll(".js-modal").forEach(a =>{
        a.addEventListener("click", openModal)
        
       })
      
  // click au bouton uniquement
  const stopPropagation = function (event) {
    event.stopPropagation()
  }

  //fermeture par echape de la modale pour l'accecibillité
  window.addEventListener("keydown", function (event){
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal (event)
    }
  })
      
  
  
  // Fonction asynchrone pour supprimer une photo par son ID
  async function deleteWorks(idElement) {
    console.log(idElement)
    
    const imageElement = idElement
      if (imageElement) {
        const token = localStorage.getItem("token");
        fetch ("http://localhost:5678/api/works/" + idElement, {
          method: 'Delete',
          headers: {
            Accept: "application/json;charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (response.ok){
            imageElement.remove();         
            // modalGallery();
          }
        })
      }}
    
    // const response = await fetch("http://localhost:5678/api/works/" + idElement, {
    //   method: "DELETE",
    //   headers: {
    //     Accept: "application/json;charset=utf-8",
    //     Authorization: `Bearer ${token}`,
    //   },