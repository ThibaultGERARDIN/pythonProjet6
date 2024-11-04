import { fetchMovies } from "./fetchmovies.js";

// fonction qui créer les vignettes de la catégorie choisie
export async function bestMovie() {

    const fetchUrl = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`

    const location = document.querySelector(`#bestmovie .best-movie`)
    location.innerHTML = "";

    // récupère les films par score décroissant
    const getBestScore = await fetchMovies(fetchUrl);

    // récupère le score maximal
    let bestScore = getBestScore.results[0].imdb_score

    // récupère les films avec score max, triés par nombre de votes (pour avoir le meilleur résultat)
    const fetchBestMovieUrl = `http://localhost:8000/api/v1/titles/?imdb_score=${bestScore}&sort_by=-votes`

    const getBestMovie = await fetchMovies(fetchUrl);

    const fetchBestMovieDetailUrl = getBestMovie.results[0].url

    const bestMovie = await fetchMovies(fetchBestMovieDetailUrl);
  
    // création de l'image avec les attributs nécessaires
    const imgBest = document.createElement("img");
    imgBest.src = bestMovie.image_url;
    imgBest.alt = bestMovie.title;

    // idem pour le conteneur de l'image et du texte
    const imgContainer = document.createElement("div");
    imgContainer.className = "best-img";

    const textContainer = document.createElement("div");
    textContainer.className = "best-text";
    textContainer.id = bestMovie.id
    textContainer.innerHTML = `<button class="best-details">Détails</button>`

    const bestTitle = document.createElement("h2");
    bestTitle.innerText = bestMovie.title;
    const bestDescription = document.createElement("p");
    bestDescription.className = "best-description";
    bestDescription.innerText = bestMovie.description;

    // génère les éléments dans le code html
    location.append(imgContainer);
    location.append(textContainer);
    imgContainer.append(imgBest);
    textContainer.prepend(bestDescription);       
    textContainer.prepend(bestTitle);

}