import axios from 'axios'

const STORAGE_KEY = 'photos'

const api_key = process.env.REACT_APP_UNSPLASH_API_KEY

export const unsplashService = {
  getPhotos,
}

async function getPhotos(searchTxt) {
  const cachedPhotos = _loadFromStorage(STORAGE_KEY)

  if (!searchTxt && cachedPhotos) {
    return cachedPhotos
  }

  const URL = `https://api.unsplash.com/photos/random?count=30${
    searchTxt ? `&query=${searchTxt}` : ''
  }&client_id=${api_key}`

  try {
    const response = await axios.get(URL)
    const photos = response.data.map(photo => ({
      backgroundColor: photo.color,
      background: photo.urls.full,
      thumbnail: photo.urls.small,
    }))

    _saveToStorage(STORAGE_KEY, photos)

    return photos
  } catch (err) {
    console.error('ERROR in getting photos!', err)
  }
}

function _saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function _loadFromStorage(key) {
  const val = localStorage.getItem(key)
  return JSON.parse(val)
}
