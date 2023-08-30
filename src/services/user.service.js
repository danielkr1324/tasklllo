import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const USER_STORAGE_KEY = 'user'
const LOGGEDIN_USER_STORAGE_KEY = 'loggedInUser'

export const userService = {
  login,
  signup,
  logout,
  getLoggedinUser,
  getById,
  remove,
  getUsers,
}

window.userService = userService

async function getUsers() {
  return await httpService.get(`user`)
}

async function login(credentials) {
  try {
    // const users = await storageService.query(USER_STORAGE_KEY)
    // const user = users.find(
    //   u =>
    //     u.username === credentials.username &&
    //     u.password === credentials.password
    // )
    const user = await httpService.post('auth/login', credentials)

    if (user) {
      return saveLocalUser(user)
    } else {
      console.log('err')

      throw new Error('Incorrect username or password')
    }
  } catch (error) {
    console.log(error)
  }
}

async function signup(credentials) {
  try {
    // const users = storageService.query(USER_STORAGE_KEY)
    // const userIndex = users.findIndex(u => u.username === credentials.username)

    // if (userIndex === -1) {
    //   throw new Error('Username is already exist')
    // }

    credentials.imgUrl =
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

    const user = await httpService.post('auth/signup', credentials)
    return saveLocalUser(user)
  } catch (err) {
    console.log(err)
  }
}

async function logout() {
  sessionStorage.removeItem(LOGGEDIN_USER_STORAGE_KEY)
  return await httpService.post('auth/logout')
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_STORAGE_KEY))
}

async function getById(userId) {
  return await httpService.get(`user/${userId}`)
}

async function remove(userId) {
  return await httpService.delete(`user/${userId}`)
}

function saveLocalUser(user) {
  const { _id, username, imgUrl, fullname } = user
  const localUser = {
    _id,
    username,
    imgUrl,
    fullname,
  }
  sessionStorage.setItem(LOGGEDIN_USER_STORAGE_KEY, JSON.stringify(localUser))
  return localUser
}
