export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  loadFromStorage,
  saveToStorage,
  animateCSS,
  getRandomColor,
  dueDateTimeFormat,
  dueDateFormat,
}

function dueDateFormat(dueDate) {
  let strDate = ''
  strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
  strDate += `${new Date(dueDate).toLocaleString('en-US', { month: 'short' })}`
  return strDate
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
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

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
