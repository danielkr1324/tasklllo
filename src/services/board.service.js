import { utilService } from './util.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

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

_createBoards()

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
  let boards = await storageService.query(BOARD_KEY)
  boards = boards.filter(board => board.createdBy._id === loggedinUserId)

  return boards
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
    byMember: {},
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

function _createBoards() {
  let board = utilService.loadFromStorage(BOARD_KEY)

  if (!board || !board.length) {
    const labels = []
    const labelColors = [
      '#4bce97',
      '#e2b203',
      '#faa53d',
      '#f87462',
      '#9f8fef',
      '#579dff',
    ]

    for (let i = 0; i < labelColors.length; i++) {
      labels.push({
        id: utilService.makeId(),
        title: '',
        color: labelColors[i],
      })
    }

    board = [
      {
        _id: 'b101',
        title: 'Demo',
        isStarred: true,
        archivedAt: null,
        createdBy: {
          _id: 'u101',
          fullname: 'Batel K',
          imgUrl: 'http://batel-img',
        },
        style: {
          background:
            'https://images.unsplash.com/photo-1672676515299-3a378e32463e?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
          thumbnail:
            'https://images.unsplash.com/photo-1672676515299-3a378e32463e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
          backgroundColor: '#595959',
        },
        labels,
        members: [
          {
            _id: 'u101',
            fullname: 'Batel K',
            username: 'batelkat',
            imgUrl:
              'https://trello-members.s3.amazonaws.com/63c43e4080db3d01989c046e/e4e3a604db36af75f239332f98d75263/170.png',
          },
          {
            _id: 'u102',
            fullname: 'Beta S',
            username: 'betash',
            imgUrl:
              'https://trello-members.s3.amazonaws.com/63bab30b6ce00501cc0c3600/ec3da514a24f9d24a3a7f418838ebc0d/170.png',
          },
          {
            _id: 'u103',
            fullname: 'Dror K',
            username: 'drorka',
            imgUrl:
              'https://trello-members.s3.amazonaws.com/63bab33d151c0c01befa37ef/619d7095c4aabefc9291f818fd1852cc/170.png',
          },
        ],
        groups: [
          {
            id: 'g101',
            title: 'Backlog-client',
            tasks: [
              {
                id: 'c101',
                title: 'Basic CRUDL',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674837381,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: [],
                attachments: [],
                comments: [
                  {
                    id: 'cm101',
                    txt: 'this is a comment',
                    createdAt: 1673973381,
                    byMember: {
                      _id: 'u103',
                      fullname: 'Dror K',
                      imgUrl: 'http://dror-img',
                    },
                  },
                ],
                isDone: false,
              },
              {
                id: 'c102',
                title: 'Build app footer',
                description: 'description',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674664581,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: [],
                attachments: [],
                style: {
                  backgroundColor: '#FFAF3F',
                },
                isDone: false,
              },
              {
                id: 'c103',
                title: 'Build http service',
                description: 'description',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674664581,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: [],
                attachments: [],
                style: {
                  backgroundColor: '#5BA4CF',
                },
                isDone: false,
              },
              {
                id: 'c104',
                title: 'SEO',
                description: 'We need to call the agency for bid',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674664581,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: [],
                attachments: [],
                style: {
                  backgroundColor: '#172B4D',
                },
                isDone: false,
              },
            ],
          },
          {
            id: 'g102',
            title: 'Backlog-server',
            tasks: [
              {
                id: 'c105',
                title: 'User authentication',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674491781,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: [],
                attachments: [],
                style: {
                  backgroundColor: '#F5DD29',
                },
                isDone: false,
              },
              {
                id: 'c106',
                title: 'Create services',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674578181,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [
                  {
                    id: 'cl101',
                    title: 'Checklist',
                    todos: [
                      {
                        id: 'td101',
                        title: 'Board',
                        isDone: false,
                      },
                      {
                        id: 'td102',
                        title: 'User',
                        isDone: false,
                      },
                      {
                        id: 'td103',
                        title: 'Task',
                        isDone: false,
                      },
                    ],
                  },
                ],
                memberIds: [],
                attachments: [],
                isDone: false,
              },
              {
                id: 'c107',
                title: 'Add npm modules',
                description: "Don't forget to use Roni's files",
                archivedAt: null,
                labelIds: [],
                dueDate: 1674578181,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: [],
                attachments: [],
                isDone: false,
              },
              {
                id: 'c109',
                title: 'REST API',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674578181,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: [],
                attachments: [],
                isDone: false,
              },
              {
                id: 'c110',
                title: 'Build server.js',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674578181,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: [],
                attachments: [],
                isDone: false,
              },
            ],
          },
          {
            id: 'g103',
            title: 'In development',
            tasks: [
              {
                id: 'c111',
                title: 'Support sockets',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674664581,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                attachments: [],
                memberIds: ['u101', 'u102'],
                isDone: false,
              },
              {
                id: 'c112',
                description:
                  'Use the same header as we used in the "Boxing" project',
                title: 'Build app header',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674664581,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                attachments: [],
                style: {
                  backgroundColor: '#29CCE5',
                },
                memberIds: ['u101', 'u103'],
                isDone: false,
              },
            ],
          },
          {
            id: 'g104',
            title: 'QA',
            tasks: [
              {
                id: 'c113',
                title: 'Database implementation',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674837381,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: ['u101'],
                isDone: false,
              },
              {
                id: 'c114',
                title: 'PWA',
                description: 'Sent to another opinion to Lili',
                archivedAt: null,
                labelIds: [],
                dueDate: 1675010181,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                memberIds: ['u102', 'u103'],
                attachments: [],
                isDone: false,
              },
            ],
          },
          {
            id: 'g105',
            title: 'Done',
            tasks: [
              {
                id: 'c115',
                title: 'Login system',
                archivedAt: null,
                labelIds: [],
                dueDate: 1674146181,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                attachments: [],
                memberIds: ['u102', 'u103'],
                style: {
                  backgroundColor: '#7BC86C',
                },
                isDone: false,
              },
              {
                id: 'c116',
                title: 'Add node.js modules',
                archivedAt: null,
                labelIds: [],
                dueDate: 1675010181,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                memberIds: ['u101', 'u102', 'u103'],
                attachments: [],
                checklists: [
                  {
                    id: 'cl102',
                    title: 'Checklist1',
                    todos: [
                      {
                        id: 'td104',
                        title: 'item in checklist 1',
                        isDone: true,
                      },
                      {
                        id: 'td105',
                        title: 'another item in checklist 1',
                        isDone: true,
                      },
                    ],
                  },
                  {
                    id: 'cl103',
                    title: 'Checklist2',
                    todos: [
                      {
                        id: 'td104',
                        title: 'item in checklist 2',
                        isDone: true,
                      },
                    ],
                  },
                ],
                isDone: false,
              },
              {
                id: 'c117',
                title: 'SASS archtecture',
                archivedAt: null,
                labelIds: [],
                dueDate: 1675010181,
                byMember: {
                  _id: 'u103',
                  username: 'Dror',
                  fullname: 'Dror K',
                  imgUrl: 'http://dror-img',
                },
                checklists: [],
                attachments: [],
                memberIds: ['u101', 'u102'],
                isDone: false,
              },
            ],
          },
          {
            id: 'g106',
            title: 'Ready for production',
            tasks: [],
            labelIds: [],
          },
        ],
      },
    ]
    utilService.saveToStorage(BOARD_KEY, board)
  }
}
