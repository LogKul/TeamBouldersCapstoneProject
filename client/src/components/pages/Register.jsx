import React from "react"
import axios from "../../api/axios"
import { Link } from 'react-router-dom';
import Header from '../Header'
import Footer from '../Footer'
import '../../styles/register.scss'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const REGISTER_URL = process.env.REACT_APP_API_URL + "/auth/signup"

const Register = () => {
    const userRef = React.useRef()
    const errRef = React.useRef()

    const [user, setUser] = React.useState("")
    const [validName, setValidName] = React.useState(false)
    const [userFocus, setUserFocus] = React.useState(false)

    const [pwd, setPwd] = React.useState("")
    const [validPwd, setValidPwd] = React.useState(false)
    const [pwdFocus, setPwdFocus] = React.useState(false)

    const [matchPwd, setMatchPwd] = React.useState("")
    const [validMatch, setValidMatch] = React.useState(false)
    const [matchFocus, setMatchFocus] = React.useState(false)

    const [errMsg, setErrMsg] = React.useState("")
    const [success, setSuccess] = React.useState(false)

    React.useEffect(() => {
        userRef.current.focus()
    }, [])

    React.useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])

    React.useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    React.useEffect(() => {
        setErrMsg("")
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
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
                setSuccess(true)
            }
            // console.log(JSON.stringify(response))
            console.log("Registered successfully")
            // clear input fields?
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

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
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
                                4 to 24 characters.<br />
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
                            <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                    <Footer />
                </section>
            )}
        </>
    )
}

export default Register