import React, { useEffect, useState } from 'react'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import LoggedInView from './components/LoggedInView'
import Register from './components/Register'

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
    <div>
      <Register />

    </div>
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