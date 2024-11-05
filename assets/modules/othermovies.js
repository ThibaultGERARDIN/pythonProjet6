import { createVignette } from "./createvignette.js";


const select = document.getElementById("cat-select")

export function otherMovies() {

    select.addEventListener("change", (event) => {
        event.preventDefault();
        let highlight = document.querySelector(".selected-option")
        if (highlight) {
            highlight.classList =""
        }
        let selectedCategory = select.value
        
        if (selectedCategory !== "") {
            createVignette(selectedCategory)  
            let selectedOption = document.querySelector(`option[value=${selectedCategory}]`)
            selectedOption.classList = "selected-option"    
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