import { fetchMovies } from './fetchmovies.js'

// function that fetches and generates modal content (from movie ID)
export async function movieDetails(targetMovieId) {
  const fetchUrl = `http://localhost:8000/api/v1/titles/${targetMovieId}`

  const location = document.querySelector('.movie-details')
  location.innerHTML = ''

  // fetch movie detailed info from constructed URL
  const movie = await fetchMovies(fetchUrl)

  // Creates DOM elements with all relevent attributes / values
  const imgDetail = document.createElement('img')
  imgDetail.src = movie.image_url
  imgDetail.alt = movie.title
  imgDetail.className = 'detail-img'
  imgDetail.id = movie.id
  imgDetail.addEventListener('error', function (event) {
    event.target.src = './assets/images/defaultimg.png'
    event.onerror = null
  })

  const imgDetailMobile = imgDetail.cloneNode()
  imgDetailMobile.id = ''
  imgDetailMobile.className = 'detail-img-mobile'
  imgDetailMobile.addEventListener('error', function (event) {
    event.target.src = './assets/images/defaultimg.png'
    event.onerror = null
  })

  const movieInfo = document.createElement('div')
  movieInfo.className = 'movie-info'
  movieInfo.innerHTML = `<h2 class="h2-detail">${movie.title}</h2><br />
        <span class="span-detail">${movie.year} - ${movie.genres}</span><br />
        <span class="span-detail">Rated : ${movie.rated} - ${movie.duration} minutes (${movie.countries})</span><br />
        <span class="span-detail">IMDB score : ${movie.imdb_score}/10</span>
        <br />
        <br />
        <h4 class="h4-detail">Réalisé par :</h4>
        <span class="director-span">${movie.directors}</span>
        `

  const movieDescription = document.createElement('div')
  movieDescription.className = 'movie-description'
  movieDescription.innerHTML = `<p class="p-detail">${movie.long_description}</p>`

  const movieActors = document.createElement('div')
  movieActors.className = 'movie-actors'
  movieActors.innerHTML = `<h4 class="h4-detail">Avec :</h4>
        <p class="p-detail">${movie.actors}</p>`

  // add all created DOM elements to the HTML code
  location.append(movieInfo)
  location.append(imgDetail)
  location.append(movieDescription)
  movieDescription.append(imgDetailMobile)
  location.append(movieActors)
}
