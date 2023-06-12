export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

const INITIAL_STATE = {
  board: null,
  boards: [],
}

export function boardReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_BOARDS:
      return {
        ...state,
        boards: action.boards,
      }
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.board],
      }
    case REMOVE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(board => board._id !== action.boardId),
      }
    case UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map(board =>
          board._id === action.board._id ? action.board : board
        ),
      }
    case SET_BOARD:
      return {
        ...state,
        board: action.board,
      }

    default:
      return state
  }
}
