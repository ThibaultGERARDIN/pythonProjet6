import { fetchMovies } from "./fetchmovies.js";

// fonction qui créer les vignettes de la catégorie choisie
export async function createVignette(category) {

    const fetchUrl = `http://localhost:8000/api/v1/titles/?genre_contains=${category}&sort_by=-imdb_score`

    let location = document.querySelector(`#${category} .card-wrapper`)
    let container
    if (location) {
        location.innerHTML = "";
        container = document.querySelector(`#${category} .category-container`)
    }
    else {
        container = document.querySelector(`#other .category-container`)
        container.innerHTML = "";
        let wrapper = document.createElement("div")
        wrapper.className = "card-wrapper"
        container.append(wrapper)
        location = document.querySelector(`#other .card-wrapper`);
        location.innerHTML = "";
    }
        
    // récupère les films de la catégorie donnée (triés par note) sur l'API et les stocke dans une variable
    const getMovies = await fetchMovies(fetchUrl);
    let movies = getMovies.results;

    // const getMoviesPageTwo = await fetchMovies(fetchUrlPageTwo);
    if (getMovies.next) {
        let pageTwo = await fetchMovies(getMovies.next)
        movies.push(pageTwo.results[0])
    }

    // créé les éléments HTML et les rempli avec les données récupérées grâce à l'API
    for (let i = 0; i < movies.length; i++) {

        const vignette = movies[i];

        // création de l'image avec les attributs nécessaires
        const imgVignette = document.createElement("img");
        imgVignette.src = vignette.image_url;
        imgVignette.alt = vignette.title;
        imgVignette.className = "vignette-img";
        imgVignette.id = vignette.id;
        imgVignette.addEventListener("error", function(event) {
            event.target.src = "./assets/images/defaultimg.png"
            event.onerror = null
          })

        // idem pour le conteneur de l'image et l'overlay
        const card = document.createElement("div");
        card.id = vignette.id;
        card.className = "card";

        const overlay = document.createElement("div");
        overlay.className = "card-overlay";
        overlay.innerHTML = '<button class="overlay-details">Détails</button>'

        const overlayTitle = document.createElement("h3");
        overlayTitle.innerText = vignette.title;
        overlay.prepend(overlayTitle);

        // génère les éléments dans le code html
        location.append(card);
        card.append(imgVignette);
        card.append(overlay);       
    }

    if ((movies.length > 4 && window.screen.width >= 788) | (movies.length > 2 && window.screen.width < 788)){
    const buttonMore = document.createElement("input")
    buttonMore.id = `more-less ${category}`
    buttonMore.type = "checkbox"
    buttonMore.checked = false

    const buttonLabel = document.createElement("label")
    buttonLabel.setAttribute("for", `more-less ${category}`);
    buttonLabel.className = "button-more-less"

    buttonLabel.addEventListener('click', (event) => {
        event.preventDefault()
        if (buttonMore.checked) {
            buttonMore.checked = false;
          } else {
            buttonMore.checked = true;
          }
    })
    container.prepend(buttonLabel);
    container.prepend(buttonMore);
    }
}