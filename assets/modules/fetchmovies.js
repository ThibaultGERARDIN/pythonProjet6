// function that fetches the information from the API from given URL
export async function fetchMovies(url) {
  const reponse = await fetch(url)
  let movies = await reponse.json()
  return movies
}
