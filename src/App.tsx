import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignInPage from "./pages/SignInPage"
import ApplicationPage from "./pages/ApplicationPage"
import DashboardPage from "./pages/DashboardPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
