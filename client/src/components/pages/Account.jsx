import React from 'react'
import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "../../api/axios"
import Header from '../Header'
import Footer from '../Footer'

const USER_URL = process.env.REACT_APP_API_URL + "/users/update?username=" + sessionStorage.getItem("user")
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Account = () => {

    const errRef = useRef()

    const user = useState("")
    const [pwd, setPwd] = useState("")

    const [errMsg, setErrMsg] = useState("")
    const setSuccess = useState(false)

    const [showUpdateField, setShowUpdateField] = useState(false)

    useEffect(() => {
        setErrMsg("")
    }, [pwd])

    const updateUserPassword = async (e) => {
        e.preventDefault()
        const v2 = PWD_REGEX.test(pwd)
        if (!v2) {
            setErrMsg("Invalid Entry")
            return
        }

        try {
            const response = await axios.put(USER_URL,
                { password: pwd },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken"),
                    },
                    withCredentials: false
                }
            )
            console.log(response)
            console.log("Password Updated Successfully")
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response")
            } else if (err.response?.status === 401) {
                setErrMsg("Invalid Password")
            } else if (err.response?.status === 404) {
                setErrMsg("User Not Found")
            } else {
                setErrMsg("General Failure")
            }
            console.log(err?.response)
            errRef.current.focus()
        }
    }

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h1>Welcome {sessionStorage.getItem("user", user)}!</h1>
                <button onClick={() => setShowUpdateField(true)}>Update Password</button>
                <br />
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                {showUpdateField == true &&
                    <form onSubmit={updateUserPassword}>
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        {showUpdateField == true &&
                            <button>Submit</button>
                        }
                    </form>
                }
                <br />
                <h4>Page Links:</h4>
                <Link to="/account/settings">Settings</Link>
                <br />
                <Link to={"/recordings/" + sessionStorage.getItem("userID")}>Your Game Recordings</Link>
            </div>
            <Footer />
        </div>
    )
}

export default Account