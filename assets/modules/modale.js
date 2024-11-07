import { movieDetails } from './moviedetails.js'

// select the dialog element in index.html
const dialog = document.querySelector('dialog')

// function that shows/hides the modal dialog
export function showModal() {
  document.addEventListener('click', (event) => {
    event.preventDefault()
    // gets class of clicked element
    let targetclass = event.target.getAttribute('class')

    // gets id of movie in clicked deatil button
    if (targetclass === 'overlay-details') {
      dialog.showModal()
      let targetMovieId =
        event.target.parentElement.parentElement.getAttribute('id')
      movieDetails(targetMovieId)
    } else if (targetclass === 'best-details') {
      dialog.showModal()
      let bestMovieId = event.target.parentElement.getAttribute('id')
      movieDetails(bestMovieId)
    }

    // close modal on outside click
    dialog.addEventListener('click', (event) => {
      let closetarget = event.target.getAttribute('class')
      if (closetarget === null) {
        dialog.close()
      }
    })

    const closeModal = document.getElementById('close')

    // close modal on "close" button click
    closeModal.addEventListener('click', (event) => {
      event.preventDefault()
      dialog.close()
    })
  })
}
