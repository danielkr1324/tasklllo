import { boardService } from '../../services/board.service'
import {
  REMOVE_BOARD,
  SET_BOARDS,
  SET_BOARD,
  UPDATE_BOARD,
  ADD_BOARD,
  REMOVE_GROUP,
  SAVE_GROUP,
  ADD_GROUP,
} from '../reducers/board.reducer'

export function loadBoards(loggedinUserId) {
  return async (dispatch, getState) => {
    try {
      const boards = await boardService.boardQuery(loggedinUserId)

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
    try {
      const action = {
        type: UPDATE_BOARD,
        board,
      }
      dispatch(action)
      await boardService.save(board)
    } catch (error) {
      console.log('failed to update board ', error)
    }
  }
}

export function loadBoard(boardId) {
  return async dispatch => {
    try {
      const board = await boardService.getBoardById(boardId)
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
      const action = {
        type: REMOVE_GROUP,
        groupId,
      }
      dispatch(action)
      await boardService.removeGroup(groupId, boardId)
    } catch (error) {
      console.log('failed to remove group ', error)
    }
  }
}

export function saveGroup(group, boardId) {
  return async dispatch => {
    try {
      const action = {
        type: SAVE_GROUP,
        group,
      }
      dispatch(action)
      await boardService.saveGroup(group, boardId)
    } catch (error) {
      console.log('failed to save group ', error)
    }
  }
}

export function addGroup(group, boardId) {
  return async dispatch => {
    try {
      const savedGroup = await boardService.saveGroup(group, boardId)
      const action = {
        type: ADD_GROUP,
        savedGroup,
      }
      dispatch(action)
      return savedGroup
    } catch (error) {
      console.log('failed to add group ', error)
    }
  }
}
