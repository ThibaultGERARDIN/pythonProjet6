import { createVignette } from './modules/createvignette.js'
import { bestMovie } from './modules/bestmovie.js'
import { otherMovies } from './modules/othermovies.js'
import { showModal } from './modules/modale.js'

// generate bestmovie section
bestMovie()

// generate all selected categories
createVignette('Fantasy')
createVignette('Sci-Fi')
createVignette('Adventure')

// prepares the other category
otherMovies()

// prepares modal opening
showModal()
