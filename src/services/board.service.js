import { utilService } from './util.service'
import { storageService } from './async-storage.service'

const BOARD_KEY = 'boardDB'

export const boardService = {
  boardQuery,
  getBoardById,
  save,
  removeGroup,
  saveGroup,
  getTaskById,
  getGroupById,
  getEmptyGroup,
  getEmptyTask,
  getEmptyChecklist,
  getEmptyTodo,
  getEmptyLabel,
  getBoardLabels,
  saveTask,
  getEmptyBoard,
}

window.cs = boardService

function getEmptyBoard() {
  return {
    title: '',
    isStarred: false,
    archivedAt: null,
    createdBy: {},
    style: {
      background: '',
      thumbnail: '',
      backgroundColor: '',
    },
    labels: [
      {
        id: 'l101',
        title: 'UI',
        color: '#4bce97',
      },
      {
        id: 'l102',
        title: 'Low priority',
        color: '#e2b203',
      },
      {
        id: 'l103',
        title: 'Medium priority',
        color: '#faa53d',
      },
      {
        id: 'l104',
        title: 'High priority',
        color: '#f87462',
      },
      {
        id: 'l105',
        title: 'Bug',
        color: '#9f8fef',
      },
      {
        id: 'l106',
        title: '',
        color: '#579dff',
      },
    ],
    members: [],
    groups: [],
    activities: [],
  }
}

async function saveGroup(group, boardId) {
  const board = await getBoardById(boardId)

  if (!group.id) {
    group.id = utilService.makeId()
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

async function removeGroup(groupId, boardId) {
  try {
    const board = await getBoardById(boardId)
    const updatedGroups = board.groups.filter(group => group.id !== groupId)
    board.groups = updatedGroups
    return save(board)
  } catch (err) {
    console.log(err)
  }
}

async function getBoardById(boardId) {
  return await storageService.get(BOARD_KEY, boardId)
}

async function boardQuery(loggedinUserId, filterBy = {}) {
  const boards = await storageService.query(BOARD_KEY)

  const filteredBoards = boards.filter(
    board =>
      board.createdBy._id === loggedinUserId ||
      board.members.some(member => member._id === loggedinUserId)
  )

  return filteredBoards
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
    savedBoard = await storageService.put(BOARD_KEY, board)
  } else {
    savedBoard = await storageService.post(BOARD_KEY, board)
  }
  return savedBoard
}

function getEmptyGroup() {
  return {
    id: '',
    tasks: [],
    title: '',
  }
}

async function getBoardLabels(boardId) {
  const board = await getBoardById(boardId)
  return board.labels
}

function getEmptyTask() {
  return {
    id: utilService.makeId(),
    title: '',
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
    title: '',
    todos: [],
  }
}

function getEmptyTodo() {
  return {
    id: utilService.makeId(),
    isDone: false,
    title: '',
  }
}

function getEmptyLabel() {
  return {
    id: utilService.makeId(),
    title: '',
    color: '',
  }
}
