import { userService } from '../../services/user.service'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const REMOVE_USER = 'REMOVE_USER'

const INITIAL_STATE = {
  users: [],
  user: userService.getLoggedinUser(),
}

export function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      }
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId),
      }

    default:
      return state
  }
}
