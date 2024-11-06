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
            let container = document.querySelector(`#other .category-container`)
            container.innerHTML = "";
            let wrapper = document.createElement("div")
            wrapper.className = "card-wrapper"
            container.append(wrapper)
            let placeHolder = document.createElement("div")
            placeHolder.className = "other-placeholder"
            placeHolder.innerHTML = "<h2>Sélectionnez une catégorie à afficher</h2>"
            wrapper.append(placeHolder)
        }
    })
}