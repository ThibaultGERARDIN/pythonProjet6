import { fetchMovies } from "./fetchmovies.js";

// fonction qui créer les vignettes de la catégorie choisie
export async function movieDetails(targetMovieId, location) {

    const fetchUrl = `http://localhost:8000/api/v1/titles/${targetMovieId}`

    location.innerHTML = ""
    
    // récupère le film avec l'id donné sur la db
    const movie = await fetchMovies(fetchUrl);

        // création de l'image avec les attributs nécessaires
        const imgDetail = document.createElement("img");
        imgDetail.src = movie.image_url;
        imgDetail.alt = movie.title;
        imgDetail.className = "detail-img";
        imgDetail.id = movie.id;

        // idem pour le conteneur de l'image et l'overlay
        const movieInfo = document.createElement("div");
        movieInfo.className = "movie-info";
        movieInfo.innerHTML = 
        `<h2>${movie.title}</h2><br />
        <span>${movie.year} - ${movie.genres}</span><br />
        <span>Rated : ${movie.rated} - ${movie.duration} minutes (${movie.countries})</span><br />
        <span>IMDB score : ${movie.imdb_score}/10</span>
        <br />
        <br />
        <h4>Réalisé par :</h4>
        <span class="director-span">${movie.directors}</span>
        `

        const movieDescription = document.createElement("div");
        movieDescription.className = "movie-description";
        movieDescription.innerHTML = `<p>${movie.long_description}</p>`

        const movieActors = document.createElement("div");
        movieActors.className = "movie-actors";
        movieActors.innerHTML = 
        `<h4>Avec :</h4>
        <p>${movie.actors}</p>`

        // génère les éléments dans le code html
        location.append(movieInfo);
        location.append(imgDetail);
        location.append(movieDescription);
        location.append(movieActors);
}
