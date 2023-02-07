import React, { useEffect, useState } from "react"
import { Router, Routes, Route } from 'react-router-dom';

import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import Checkers from "./components/checkers/Checkers"
import PrivateRoutes from './components/util/PrivateRoutes'

import { AuthProvider } from './context/AuthProvider'

function App() {

  /*const [currentView, setCurrentView] = useState("login")

  const switchView = (viewName) => {
    setCurrentView(viewName)
  }

  const [currentUser, setCurrentUser] = useState({ username: "", email: "", password: "" })

  const [error, setError] = useState("")

  const [testUser, setTestUser] = useState({ username: "testUser", email: "test@test.test", password: "testPassword" })

  const Register = credentials => {
    console.log(testUser)
    setTestUser(credentials)
  }

  const Login = credentials => {
    console.log(credentials)

    if (credentials.email == testUser.email && credentials.password == testUser.password) {
      setCurrentUser({username: credentials.username, email: credentials.email, password: credentials.password})
      setCurrentView('loggedin')
      setError("")
    } else {
      console.log("Invalid Credentials")
      setError("Invalid Credentials")
    }
  }

  const Logout = () => {
    setCurrentUser({username: '', email: '', password: ''})
    setCurrentView('login')
  }

  const [backendData, setBackendData] = useState([{}])*/

  /*useEffect(() => {
    console.log(process.env.REACT_APP_API_URL)
    fetch(process.env.REACT_APP_API_URL + "/users/all").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])*/

  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} exact />
        </Route>
      </Routes>
    </main>
  )
}

export default App

/*

      {(typeof backendData === 'undefined') ? (
          <p>Loading...</p>
        ) : (
        backendData.map((user, i) => (
          <p>id: {user.id},
            username: {user.username}</p>
        ))
      )}


      {currentView === "login" ? <LoginView Login={Login} error={error} switchView={switchView} /> : 
      currentView === "register" ? <RegisterView Register={Register} error={error} switchView={switchView} /> : 
      <LoggedInView Logout={Logout} error={error} />}
*/