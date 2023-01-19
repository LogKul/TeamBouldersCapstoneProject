import React, { useState } from "react"

function RegisterView({ Register, error, switchView }) {
    const [credentials, setCredentials] = useState({username: "", email: "", password: ""})

    const submitHandler = e => {
        e.preventDefault()

        Register(credentials)
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Register</h2>
                {(error != "") ? (<div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" onChange={e => setCredentials({...credentials, username: e.target.value})} value={credentials.username}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={e => setCredentials({...credentials, email: e.target.value})} value={credentials.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setCredentials({...credentials, password: e.target.value})} value={credentials.password}/>
                </div>
                <input type="submit" value="SUBMIT"/>
                <input type="button" onClick={() => switchView('login')} value="LOGIN"/>
            </div>
        </form>
    )
}

export default RegisterView