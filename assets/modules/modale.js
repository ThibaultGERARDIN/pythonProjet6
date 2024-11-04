import { movieDetails } from "./moviedetails.js";

// Partie concernant la modal (ouverture et fermeture)

const dialog = document.querySelector("dialog");
const modale = document.querySelector(".modale")
const detail = document.querySelectorAll(".overlay-details")
const card = document.querySelectorAll(".card")

export function showModal() {
    // ouverture et fermeture de la modale
    
    document.addEventListener("click", (event) => {
        event.preventDefault();
         // récupère la classe de l'élément cliqué
         let targetclass = event.target.getAttribute("class")
         let targetMovieId = event.target.parentElement.parentElement.getAttribute("id")

         if (targetclass === "overlay-details") {
            dialog.showModal();
            let location = document.querySelector(".movie-details")
            movieDetails(targetMovieId, location);
         }
         else if (targetclass === "best-details") {
            dialog.showModal();
            let bestMovieId = event.target.parentElement.getAttribute("id")
            let location = document.querySelector(".movie-details")
            movieDetails(bestMovieId, location);
         }
        
        // ferme la modal si on clique en dehors
        dialog.addEventListener('click', (event) => {
            // récupère la classe de l'élément cliqué
            let closetarget = event.target.getAttribute("class")
            // si l'élément cliqué n'a pas de class (donc en dehors de la modal) ferme la modal
            if (closetarget === null) {
                dialog.close();
            }
        })
       
        const closeModal = document.getElementById("close")
        // Ferme la modal au click sur le bouton X
        closeModal.addEventListener("click", (event) => {
            event.preventDefault();
            dialog.close();
        })

    })
}

