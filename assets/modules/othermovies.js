import { createVignette } from "./createvignette.js";


const select = document.getElementById("cat-select")

export function otherMovies() {

    select.addEventListener("change", (event) => {
        event.preventDefault();
        let selectedCategory = select.value
        if (selectedCategory !== "") {
            createVignette(selectedCategory)      
        }
        else {
            let otherSpace = document.querySelector("#other .card-wrapper")
            otherSpace.innerHTML = ""
            let placeHolder = document.createElement("div")
            placeHolder.className = "other-placeholder"
            placeHolder.innerHTML = "<h2>Sélectionnez une catégorie à afficher</h2>"
            otherSpace.append(placeHolder)
        }
    })
}