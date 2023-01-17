import React, { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'

function App() {

  // temp user details to validate against for form
  // once auth is built then can just confirm from auth
  const testUser = {
    email: "test@test.test",
    password: "testPassword"
  }

  // const to store user details and error message
  // needed to determine if user is logged in when first accessing site
  // token is currently unused
  const [user, setUser] = useState({ name: "", email: "", token: "" });
  const [error, setError] = useState("");


  // user details held for login verification
  // *** ONCE AUTH IS BUILT THIS NEEDS TO CHANGE TO VALIDATE WITH TOKEN
  const Login = details => {
    console.log(details)

    if (details.email == testUser.email && details.password == testUser.password) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      });
      setError("")
    } else {
      console.log("Details do not match")
      setError("Details do not match")
    }
  }

  // reset user details when logged out
  const Logout = () => {
    setUser({
      name: "",
      email: ""
    })
  }

  // backendData stuff?

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL)
    fetch(process.env.REACT_APP_API_URL + "/users/all").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  // return loading backendData

  // also return login form or temporary logged in page

  return (
    <div>
      {(typeof backendData === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.map((user, i) => (
          <p>id: {user.id},
            username: {user.username}</p>
        ))
      )},
      {(user.email != "") ? (

        // temp logged in page or login form
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  )
}

export default App