import { React, useState, useRef, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "../../api/axios"
import Header from '../Header'
import Footer from '../Footer'
import '../../styles/register.scss'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const REGISTER_URL = process.env.REACT_APP_API_URL + "/auth/signup"
const LOGIN_URL = process.env.REACT_APP_API_URL + "/auth/login"

const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState("")
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState("")
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user) && user.length <= 16
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        const v3 = (user.length <= 16)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }
        else if (!v3) {
            setErrMsg("Username must be 16 characters or less")
            return
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: false
                }
            )
            if (response.status === 200) {
                handleLogin()
            }
            console.log("Registered successfully")
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response")
            } else if (err.response?.status === 400) {
                setErrMsg("Username Taken")
            } else {
                setErrMsg("Registration Failed")
            }
            errRef.current.focus()
        }
    }

    const handleLogin = async () => {

        try {
            const response = await axios.get(LOGIN_URL,
                { params: { username: user, password: pwd } },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: false
                }
            )

            sessionStorage.setItem("user", user)
            sessionStorage.setItem("userID", response?.data?.id)
            sessionStorage.setItem("wins", response?.data?.wins)
            sessionStorage.setItem("losses", response?.data?.losses)
            sessionStorage.setItem("mmr", response?.data?.mmr)
            sessionStorage.setItem("deleted", response?.data?.deleted)
            sessionStorage.setItem("lightswitch", response?.data?.lightswitch)
            sessionStorage.setItem("theme", response?.data?.theme)
            sessionStorage.setItem("banned", response?.data?.banned)
            sessionStorage.setItem("hideschat", response?.data?.hideschat)
            sessionStorage.setItem("accessToken", response?.data?.accessToken)
            console.log("Logged in")

            setUser("")
            setPwd("")
            navigate("/Home")
            console.log("Navigating to home")
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
        <div>
            <Header />
            <div className="content-wrap">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                        <span className={validName ? "valid" : "hide"}>Valid</span>
                        <span className={validName || !user ? "hide" : "invalid"}>Invalid</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        4 to 16 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allows.
                    </p>

                    <br />

                    <label htmlFor="password">
                        Password:
                        <span className={validPwd ? "valid" : "hide"}>Valid</span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>Invalid</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character.<br />
                        Allowed special characters: !@#$%
                    </p>

                    <br />

                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>Valid</span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>Invalid</span>
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Must match the first password input field.
                    </p>

                    <br />

                    <button disabled={!validName || !validPwd || !validMatch ? true : false}>Submit</button>
                </form>

                <p>
                    Already registered?<br />
                    <Link to={"/login"}><button className="small-button">Sign In</button></Link>
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default Register
