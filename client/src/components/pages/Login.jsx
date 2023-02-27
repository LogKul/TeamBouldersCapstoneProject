import { useRef, useState, useEffect } from "react"
import { Navigate } from 'react-router-dom'
import axios from "../../api/axios"
import { Link } from 'react-router-dom';

const LOGIN_URL = process.env.REACT_APP_API_URL + "/auth/login"

const Login = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get(LOGIN_URL,
                { params: { username: user, password: pwd } },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: false
                }
            )
            //console.log(JSON.stringify(response))
            const accessToken = response?.data?.accessToken

            sessionStorage.setItem("user", user)
            sessionStorage.setItem("accessToken", accessToken)
            console.log("Logged in")

            setUser("")
            setPwd("")
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response")
            } else if (err.response?.status === 401) {
                setErrMsg("Invalid Password")
            } else if (err.response?.status === 404) {
                setErrMsg("User Not Found")
            } else {
                setErrMsg("Login Failed")
            }
            console.log(err?.response)
            errRef.current.focus()
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <Navigate to="/" />
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <br />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />

                        <br />

                        <button>Sign In</button>

                        <p>
                            Need an Account?<br />
                            <Link to="/register"><button className="small-button">Sign Up</button></Link>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
}

export default Login