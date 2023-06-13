import { boardService } from '../../services/board.service'
import {
  REMOVE_BOARD,
  SET_BOARDS,
  SET_BOARD,
  UPDATE_BOARD,
  ADD_BOARD,
} from '../reducers/board.reducer'

export function loadBoards() {
  return async (dispatch, getState) => {
    try {
      const boards = await boardService.query()
      const action = {
        type: SET_BOARDS,
        boards,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function removeBoard(boardId) {
  return async dispatch => {
    try {
      await boardService.remove(boardId)
      const action = { type: REMOVE_BOARD, boardId }
      dispatch(action)
      return 'Removed!'
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function addBoard(board) {
  return async dispatch => {
    try {
      const savedBoard = await boardService.save(board)
      const action = {
        type: ADD_BOARD,
        savedBoard,
      }
      dispatch(action)
      return savedBoard
    } catch (error) {
      console.log('cannot add board', error)
    }
  }
}

export function updateBoard(board) {
  return async dispatch => {
    await boardService.save(board)
    try {
      const action = {
        type: UPDATE_BOARD,
        board,
      }
      dispatch(action)
    } catch (error) {
      console.log('failed to update board ', error)
    }
  }
}

export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = await boardService.getById(boardId)
      const action = {
        type: SET_BOARD,
        board,
      }
      dispatch(action)
      return board
    } catch (error) {
      console.log('failed to load the board ', error)
    }
  }
}

export function removeGroup(groupId, boardId) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.removeGroup(groupId, boardId)
      console.log(updatedBoard.groups.length)

      const action = {
        type: UPDATE_BOARD,
        board: updatedBoard,
      }
      dispatch(action)
      return updatedBoard
    } catch (error) {
      console.log('failed to remove group ', error)
    }
  }
}

export function saveGroup(group, boardId) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.saveGroup(group, boardId)
      const action = {
        type: UPDATE_BOARD,
        board: updatedBoard,
      }
      dispatch(action)
      return updatedBoard
    } catch (error) {
      console.log('failed to save group ', error)
    }
  }
}
