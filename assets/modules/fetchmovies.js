// fonction pour récupérer les films sur l'API depuis l'url donnée

export async function fetchMovies(url) {
    const reponse = await fetch(url);
    let movies = await reponse.json();
    return movies;
}

