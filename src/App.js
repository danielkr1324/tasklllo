import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/main.scss'
import { HomePage } from './views/HomePage'
import { Board } from './views/Board'
import { TaskEdit } from './cmps//task/TaskEdit'
import { LoginSignup } from './views/LoginSignup'
import { Workspace } from './views/Workspace'
import { WorkspaceHeader } from './cmps/WorkspaceHeader'
import { useSelector } from 'react-redux'

function App() {
  const loggedinUser = useSelector(storeState => storeState.userModule.user)
  return (
    <Router>
      <div className="App">
        {loggedinUser && (
          <header>
            <WorkspaceHeader />
          </header>
        )}
        <main className="main-app">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/:status"
              element={<LoginSignup />}
            />
            <Route
              element={<Workspace />}
              path="/workspace"
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
