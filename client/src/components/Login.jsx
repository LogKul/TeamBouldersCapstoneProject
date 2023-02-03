import { useRef, useState, useEffect, useContext } from "react"
import AuthContext from "../context/AuthProvider"
import axios from "../api/axios"

const LOGIN_URL = "/auth/login"

const Login = () => {
    const { setAuth } = useContext(AuthContext)
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
                { params: {username: user, password: pwd}},
                {
                    headers: {"Content-Type":"application/json"},
                    withCredentials: false
                }
            )
            console.log(JSON.stringify(response))
            const accessToken = response?.data?.accessToken

            setAuth({ user, pwd, accessToken })

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
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
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
                            <a href="#"><button className="small-button">Sign Up</button></a>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
}

export default Login