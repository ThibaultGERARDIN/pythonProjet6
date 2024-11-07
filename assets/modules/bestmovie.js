import { fetchMovies } from './fetchmovies.js'

// Function that creates the bestmovie section
export async function bestMovie() {
  const fetchUrl = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`

  const location = document.querySelector(`#bestmovie .best-movie`)
  location.innerHTML = ''

  // fetch all movies sorted by best score
  const getBestScore = await fetchMovies(fetchUrl)

  // gets best score value
  let bestScore = getBestScore.results[0].imdb_score

  // fetch all movies that have the best score and sort them by number of votes
  const fetchBestMovieUrl = `http://localhost:8000/api/v1/titles/?imdb_score=${bestScore}&sort_by=-votes`
  const getBestMovie = await fetchMovies(fetchBestMovieUrl)

  // gets the movie with the most number of votes and best score and fetch detailed information
  const fetchBestMovieDetailUrl = getBestMovie.results[0].url
  const bestMovie = await fetchMovies(fetchBestMovieDetailUrl)

  // Creates DOM elements with all relevent attributes / values
  const imgBest = document.createElement('img')
  imgBest.src = bestMovie.image_url
  imgBest.alt = bestMovie.title

  const imgContainer = document.createElement('div')
  imgContainer.className = 'best-img'

  const textContainer = document.createElement('div')
  textContainer.className = 'best-text'
  textContainer.id = bestMovie.id
  textContainer.innerHTML = `<button class="best-details">Détails</button>`

  const bestTitle = document.createElement('h2')
  bestTitle.innerText = bestMovie.title
  const bestDescription = document.createElement('p')
  bestDescription.className = 'best-description'
  bestDescription.innerText = bestMovie.description

  // add all created DOM elements to the HTML code
  location.append(imgContainer)
  location.append(textContainer)
  imgContainer.append(imgBest)
  textContainer.prepend(bestDescription)
  textContainer.prepend(bestTitle)
}
