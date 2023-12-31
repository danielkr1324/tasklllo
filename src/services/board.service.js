import { utilService } from "./util.service"
// import { storageService } from './async-storage.service'
import { httpService } from "./http.service"
import { userService } from "./user.service"

// const BOARD_KEY = 'boardDB'

export const boardService = {
  boardQuery,
  getBoardById,
  save,
  removeBoard,
  removeGroup,
  saveGroup,
  getTaskById,
  getGroupById,
  getEmptyGroup,
  getEmptyTask,
  getEmptyChecklist,
  getEmptyTodo,
  getEmptyLabel,
  getEmptyAttachment,
  getBoardLabels,
  saveTask,
  getEmptyBoard,
}

window.cs = boardService

function getEmptyBoard() {
  return {
    title: "",
    isStarred: false,
    archivedAt: null,
    createdBy: {},
    style: {
      background: "",
      thumbnail: "",
      backgroundColor: "",
    },
    labels: [
      {
        id: "l101",
        title: "",
        color: "#4bce97",
      },
      {
        id: "l102",
        title: "",
        color: "#e2b203",
      },
      {
        id: "l103",
        title: "",
        color: "#faa53d",
      },
      {
        id: "l104",
        title: "",
        color: "#f87462",
      },
      {
        id: "l105",
        title: "",
        color: "#9f8fef",
      },
      {
        id: "l106",
        title: "",
        color: "#579dff",
      },
    ],
    members: [],
    groups: [],
    activities: [],
  }
}

async function saveGroup(group, board) {
  const groupIdx = board.groups.findIndex(
    currGroup => currGroup.id === group.id
  )
  if (groupIdx < 0) {
    if (group.tasks?.length) {
      group.tasks.forEach(task => {
        task.id = utilService.makeId()
      })
    }
    board.groups.push(group)
  } else {
    const idx = board.groups.findIndex(currGroup => currGroup.id === group.id)
    if (idx < 0)
      throw new Error(`Update failed, cannot find group with id: ${group.id}`)
    board.groups.splice(idx, 1, group)
  }

  save(board)
  return group
}

async function getGroupById(groupId, boardId) {
  try {
    const board = await getBoardById(boardId)
    const group = board.groups.find(g => g.id === groupId)
    return group
  } catch (err) {
    console.log(err)
  }
}

async function removeGroup(groupId, board) {
  try {
    const updatedGroups = board.groups.filter(group => group.id !== groupId)
    board.groups = updatedGroups

    return await save(board)
  } catch (err) {
    console.log(err)
  }
}

async function getBoardById(boardId) {
  return await httpService.get(`board/${boardId}`)
}

async function boardQuery(loggedinUserId) {
  // const boards = await storageService.query(BOARD_KEY)

  // const filteredBoards = boards.filter(
  //   board =>
  //     board.createdBy._id === loggedinUserId ||
  //     board.members.some(member => member._id === loggedinUserId)
  // )

  return await httpService.get("board", { loggedinUserId })
}

async function getTaskById(boardId, groupId, taskId) {
  try {
    const board = await getBoardById(boardId)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return task
  } catch (err) {
    console.log(err)
  }
}

async function saveTask(task, groupId, boardId) {
  try {
    const board = await getBoardById(boardId)
    const group = board.groups.find(group => group.id === groupId)
    const taskIdx = group.tasks.findIndex(t => t.id === task.id)
    if (taskIdx !== -1) group.tasks.splice(taskIdx, 1, task)
    else group.tasks.push(task)
    saveGroup(group, boardId)
    return task
  } catch (err) {
    console.log(err)
  }
}

async function save(board) {
  var savedBoard
  if (board._id) {
    // savedBoard = await storageService.put(BOARD_KEY, board)
    savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    // savedBoard = await storageService.post(BOARD_KEY, board)
    board.createdBy = userService.getLoggedinUser()
    savedBoard = await httpService.post(`board`, board)
  }
  return savedBoard
}

async function removeBoard(boardId) {
  try {
    await httpService.delete(`board/${boardId}`)
  } catch (err) {
    console.log(err)
  }
}

function getEmptyGroup() {
  return {
    id: utilService.makeId(),
    tasks: [],
    title: "",
  }
}

async function getBoardLabels(boardId) {
  const board = await getBoardById(boardId)
  return board.labels
}

function getEmptyTask() {
  return {
    id: utilService.makeId(),
    title: "",
    isStarred: false,
    checklists: [],
    archivedAt: null,
    attachments: [],
    memberIds: [],
    labelIds: [],
    isDone: false,
  }
}

function getEmptyChecklist() {
  return {
    id: utilService.makeId(),
    title: "",
    todos: [],
  }
}

function getEmptyTodo() {
  return {
    id: utilService.makeId(),
    isDone: false,
    title: "",
  }
}

function getEmptyAttachment() {
  return {
    id: utilService.makeId(),
    createdAt: Date.now(),
    url: "",
    title: "Attachment Image",
  }
}

function getEmptyLabel() {
  return {
    id: utilService.makeId(),
    title: "",
    color: "",
  }
}
