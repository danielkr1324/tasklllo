export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  loadFromStorage,
  saveToStorage,
  animateCSS,
  getRandomImgBgColor,
  dueDateTimeFormat,
  dueDateFormat,
  timeSince,
  debounce,
}

function dueDateFormat(dueDate) {
  let strDate = ''
  strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
  strDate += `${new Date(dueDate).toLocaleString('en-US', { month: 'short' })}`
  return strDate
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000)

  var interval = seconds / 31536000

  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'a year ago'
    return Math.floor(interval) + ' years ago'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'a month ago'
    return Math.floor(interval) + ' months ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'a day ago'
    return Math.floor(interval) + ' days ago'
  }
  interval = seconds / 3600
  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'an hour ago'
    return Math.floor(interval) + ' hours ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'Just now'
    return Math.floor(interval) + ' minutes ago'
  }
  if (Math.floor(seconds) === 0) return 'Just now'
  return Math.floor(seconds) + ' seconds ago'
}

function dueDateTimeFormat(dueDate) {
  const currYear = new Date().getFullYear()
  const dueYear = new Date(dueDate).getFullYear()
  let strDate = ''
  strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
  strDate += `${new Date(dueDate).toLocaleString('en-US', {
    month: 'short',
  })} at `
  if (dueYear !== currYear) {
    strDate += `${dueYear} `
  }
  strDate += `${new Date(dueDate)
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .toLocaleUpperCase()}`
  return strDate
}

function makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min = 0, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function debounce(func, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}

function getRandomImgBgColor() {
  const colors = [
    '#9CB4CC',
    '#E0DECA',
    '#EFF8FF',
    '#F9F6F7',
    '#99A98F',
    '#BA94D1',
    '#354259',
  ]
  return colors[getRandomIntInclusive(0, colors.length)]
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function animateCSS(el, animation) {
  const prefix = 'animate__'
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`

    el.classList.add(`${prefix}animated`, animationName)

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation()
      el.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }
    el.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}
