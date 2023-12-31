import { boardService } from "../../services/board.service"
import {
  REMOVE_BOARD,
  SET_BOARDS,
  SET_BOARD,
  UPDATE_BOARD,
  UPDATE_BOARDS,
  ADD_BOARD,
  REMOVE_GROUP,
  SAVE_GROUP,
  ADD_GROUP,
} from "../reducers/board.reducer"

export function loadBoards(loggedinUserId) {
  return async dispatch => {
    try {
      const boards = await boardService.boardQuery(loggedinUserId)

      const action = {
        type: SET_BOARDS,
        boards,
      }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function removeBoard(boardId) {
  return async dispatch => {
    try {
      await boardService.removeBoard(boardId)
      const action = { type: REMOVE_BOARD, boardId }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
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
      console.log("cannot add board", error)
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
      console.log("failed to update board ", error)
    }
  }
}

export function updateBoards(board) {
  return async dispatch => {
    try {
      const action = {
        type: UPDATE_BOARDS,
        board,
      }
      dispatch(action)
      await boardService.save(board)
    } catch (error) {
      console.log("failed to update board ", error)
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
      console.log("failed to load the board ", error)
    }
  }
}

export function removeGroup(groupId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const action = {
        type: REMOVE_GROUP,
        groupId,
      }
      dispatch(action)
      await boardService.removeGroup(groupId, board)
    } catch (error) {
      console.log("failed to remove group ", error)
    }
  }
}

export function saveGroup(group) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const action = {
        type: SAVE_GROUP,
        group,
      }
      dispatch(action)
      await boardService.saveGroup(group, board)
    } catch (error) {
      console.log("failed to save group ", error)
    }
  }
}

export function addGroup(group) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const action = {
        type: ADD_GROUP,
        group,
      }
      dispatch(action)
      await boardService.saveGroup(group, board)
    } catch (error) {
      console.log("failed to add group ", error)
    }
  }
}
