import './App.css'
import './assets/scss/main.scss'
import { Route, HashRouter as Router, Routes, Switch } from 'react-router-dom'
import { Board } from './views/Board'

function App() {
  return (
    <div className="App">
      <main className="main-app">
        <Board />
      </main>
    </div>
  )
}

export default App
