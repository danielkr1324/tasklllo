import './App.css'
import { Route, HashRouter as Router, Routes, Switch } from 'react-router-dom'
import './assets/scss/main.scss'
import { HomePage } from './views/HomePage'
import { Board } from './views/Board'
import { TaskEdit } from './cmps//task/TaskEdit'

function App() {
  return (
    <Router>
      <div className="App">
        <main className="main-app">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/board/:boardId"
              element={<Board />}
            >
              <Route
                path="/board/:boardId/:groupId/:taskId"
                element={<TaskEdit />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
