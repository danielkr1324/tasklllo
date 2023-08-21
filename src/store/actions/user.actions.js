import { userService } from '../../services/user.service'
import { SET_USER, SET_USERS, REMOVE_USER } from '../reducers/user.reducer'

export function loadUsers() {
  return async dispatch => {
    try {
      const users = await userService.getUsers()
      const action = {
        type: SET_USERS,
        users,
      }
      dispatch(action)
    } catch (error) {
      console.log('failed to load users', error)
    }
  }
}

export function login(credentials) {
  return async dispatch => {
    try {
      const user = await userService.login(credentials)
      const action = {
        type: SET_USER,
        user,
      }
      dispatch(action)
      return user
    } catch (error) {
      console.log('failed to login', error)
    }
  }
}

export function signup(credentials) {
  return async dispatch => {
    try {
      const user = await userService.signup(credentials)
      console.log(user)

      const action = {
        type: SET_USER,
        user,
      }
      dispatch(action)
      return user
    } catch (error) {
      console.log('failed to signup', error)
    }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId)
      const action = {
        type: REMOVE_USER,
        userId,
      }
      dispatch(action)
    } catch (error) {
      console.log('failed to remove user', error)
    }
  }
}

export function logout() {
  return async dispatch => {
    try {
      await userService.logout()
      const action = {
        type: SET_USER,
        user: null,
      }
      dispatch(action)
    } catch (error) {
      console.log('failed to log out', error)
    }
  }
}
