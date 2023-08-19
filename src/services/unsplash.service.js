import axios from 'axios'

export const unsplashService = {
  getPhotos,
}

const STORAGE_KEY = 'photos'
const photos = _loadFromStorage(STORAGE_KEY) || null
const api_key = process.env.REACT_APP_UNSPLASH_API_KEY

async function getPhotos(searchTxt) {
  if (!searchTxt && photos) return photos
  let URL = `https://api.unsplash.com/photos/random?count=30${
    searchTxt ? `&query=${searchTxt}` : ''
  }&client_id=${api_key}`

  try {
    const response = await axios.get(URL)
    const { data } = response
    const photos = data.map(photo => ({
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
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}
