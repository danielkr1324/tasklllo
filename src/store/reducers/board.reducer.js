export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const SAVE_GROUP = 'SAVE_GROUP'
export const ADD_GROUP = 'ADD_GROUP'

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
        board: action.board,
      }
    case SET_BOARD:
      return {
        ...state,
        board: action.board,
      }

    case REMOVE_GROUP:
      return {
        ...state,
        board: {
          ...state.board,
          groups: state.board.groups.filter(
            group => group.id !== action.groupId
          ),
        },
      }

    case ADD_GROUP:
      return {
        board: {
          ...state.board,
          groups: [...state.board.groups, action.savedGroup],
        },
      }

    case SAVE_GROUP:
      return {
        board: {
          ...state.board,
          groups: state.board.groups.map(group =>
            group.id === action.group.id ? action.group : group
          ),
        },
      }

    default:
      return state
  }
}
