// Fonction d'envoi du formulaire de login
function login() {
    // Sélectionne le formulaire de login par son ID
    const login = document.querySelector("#loginForm");

    // Ajoute un écouteur d'événements pour le formulaire lors de la soumission
    login.addEventListener("submit", function(event) {
        // Empêche la page de se rafraîchir immédiatement lors de la soumission du formulaire
    event.preventDefault();

        // objet (email et mot de passe)
        const loginInfo = {
            email: email.value,
            password: password.value
        };

        // Convertit l'objet loginInfo en format JSON
        const chargeUtile = JSON.stringify(loginInfo);
        console.log(loginInfo); // Vérifie les informations envoyées

        // Envoie la demande de connexion au serveur
        fetch('http://localhost:5678/api/users/login', { 
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: chargeUtile
        })
        .then(response => response.json().then(r => ({status: response.status, body: r}))) // Séparation du statut et du token
        .then(data => {
            console.log(data.status); // Vérifie le code de statut du serveur

            // mdp ok (code 200)
            if (data.status === 200) {
                // Stocke le token dans local storage
                localStorage.setItem("token", data.body.token);
                console.log(data.body.token);
                // Redirige l'utilisateur vers la page d'accueil
                window.location.replace("./index.html");
                
            }

            // mdp incorrect (code 401)
            if (data.status === 401) {
                alert("Mot de passe incorrect");
            }

            // Si l'utilisateur est inconnu (code 404)
            if (data.status === 404) {
                alert("Utilisateur inconnu. Vérifiez l'e-mail");
            }
        });
    });
}

// Appelle la fonction login lors du chargement de la page
login();
