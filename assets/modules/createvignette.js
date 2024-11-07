import { fetchMovies } from './fetchmovies.js'

// function that dinamically generates movie cards based on given category
export async function createVignette(category) {

  // sets the URL of the category to fectch (sorted by score to get the best movies of the category)
  const fetchUrl = `http://localhost:8000/api/v1/titles/?genre_contains=${category}&sort_by=-imdb_score`

  // gets the DOM location of the code we need to generate, resets the HTML to refresh everytime it is reloaded
  let location = document.querySelector(`#${category} .card-wrapper`)
  let container
  if (location) {
    location.innerHTML = ''
    container = document.querySelector(`#${category} .category-container`)
  } else {
    container = document.querySelector(`#other .category-container`)
    container.innerHTML = ''
    let wrapper = document.createElement('div')
    wrapper.className = 'card-wrapper'
    container.append(wrapper)
    location = document.querySelector(`#other .card-wrapper`)
    location.innerHTML = ''
  }

  // fetch all movies of the given category (sorted by score) and extracts the results (first 5 movies)
  const getMovies = await fetchMovies(fetchUrl)
  let movies = getMovies.results

  // checks if there is a second page for the category, fetches the second page movie and adds the first one (6th movie) to the movie list
  if (getMovies.next) {
    let pageTwo = await fetchMovies(getMovies.next)
    movies.push(pageTwo.results[0])
  }

  // Creates DOM elements with all relevent attributes / values for each movie in the list
  for (let i = 0; i < movies.length; i++) {
    
    const vignette = movies[i]

    const imgVignette = document.createElement('img')
    imgVignette.src = vignette.image_url
    imgVignette.alt = vignette.title
    imgVignette.className = 'vignette-img'
    imgVignette.id = vignette.id
    imgVignette.addEventListener('error', function (event) {
      event.target.src = './assets/images/defaultimg.png'
      event.onerror = null
    })

    const card = document.createElement('div')
    card.id = vignette.id
    card.className = 'card'

    const overlay = document.createElement('div')
    overlay.className = 'card-overlay'
    overlay.innerHTML = '<button class="overlay-details">Détails</button>'

    const overlayTitle = document.createElement('h3')
    overlayTitle.innerText = vignette.title
    overlay.prepend(overlayTitle)

    // adds them to the proper location in the HTML code
    location.append(card)
    card.append(imgVignette)
    card.append(overlay)
  }

  // cheks if a "show more" button is needed (depending on number of movies and screen size) and adds it if necesseray
  if (
    (movies.length > 4 && window.screen.width >= 788) |
    (movies.length > 2 && window.screen.width < 788)
  ) {
    const buttonMore = document.createElement('input')
    buttonMore.id = `more-less ${category}`
    buttonMore.type = 'checkbox'
    buttonMore.checked = false

    const buttonLabel = document.createElement('label')
    buttonLabel.setAttribute('for', `more-less ${category}`)
    buttonLabel.className = 'button-more-less'

    buttonLabel.addEventListener('click', (event) => {
      event.preventDefault()
      if (buttonMore.checked) {
        buttonMore.checked = false
      } else {
        buttonMore.checked = true
      }
    })
    container.prepend(buttonLabel)
    container.prepend(buttonMore)
  }
}
