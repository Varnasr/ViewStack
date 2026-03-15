import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import States from './pages/States'
import StateDetail from './pages/StateDetail'
import Schemes from './pages/Schemes'
import SchemeDetail from './pages/SchemeDetail'
import Indicators from './pages/Indicators'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo">ViewStack</NavLink>
          <nav className="nav">
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/states">States</NavLink>
            <NavLink to="/schemes">Schemes</NavLink>
            <NavLink to="/indicators">Indicators</NavLink>
          </nav>
        </div>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/states" element={<States />} />
          <Route path="/states/:stateId" element={<StateDetail />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/schemes/:schemeId" element={<SchemeDetail />} />
          <Route path="/indicators" element={<Indicators />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>
          Part of <a href="https://openstacks.dev">OpenStacks for Change</a> |{' '}
          <a href="https://github.com/Varnasr/ViewStack">GitHub</a>
        </p>
      </footer>
    </div>
  )
}

export default App
