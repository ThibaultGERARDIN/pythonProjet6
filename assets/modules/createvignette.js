import { fetchMovies } from "./fetchmovies.js";

// fonction qui créer les vignettes de la catégorie choisie
export async function createVignette(category) {

    const fetchUrlPageOne = `http://localhost:8000/api/v1/titles/?genre_contains=${category}&sort_by=-imdb_score`
    const fetchUrlPageTwo = `http://localhost:8000/api/v1/titles/?genre_contains=${category}&page=2&sort_by=-imdb_score`
    const location = document.querySelector(`#${category} .card-wrapper`)
    location.innerHTML = "";
    
    // récupère les films de la catégorie donnée (triés par note) sur l'API et les stocke dans une variable
    const getMoviesPageOne = await fetchMovies(fetchUrlPageOne);
    const getMoviesPageTwo = await fetchMovies(fetchUrlPageTwo);


    let movies = getMoviesPageOne.results;
    movies.push(getMoviesPageTwo.results[0])


    // créé les éléments HTML et les rempli avec les données récupérées grâce à l'API
    for (let i = 0; i < movies.length; i++) {

        const vignette = movies[i];

        // création de l'image avec les attributs nécessaires
        const imgVignette = document.createElement("img");
        imgVignette.src = vignette.image_url;
        imgVignette.alt = vignette.title;
        imgVignette.className = "vignette-img";
        imgVignette.id = vignette.id;

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
}