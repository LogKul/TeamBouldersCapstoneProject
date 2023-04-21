import React from 'react'
import { useRef, useState, useEffect } from "react"
import axios from "../../api/axios"
import Header from '../Header'
import Footer from '../Footer'
import '../../styles/account.scss'

const USER_URL = "/users/update?username=" + sessionStorage.getItem("user")
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Account = () => {

    const errRef = useRef()

    const [pwd, setPwd] = useState("")

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

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
            console.log(success)
        } catch (err) {
            console.log(err)
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
                {success
                    ? <section>
                        <h1>Password Updated!</h1>
                        <p>
                            <a href="/home">Home</a>
                        </p>
                    </section>
                    : <section>
                        <h2>Your Stats</h2>
                        <table className='table-account'>
                            <tr>
                                <th className='mmr-account'>MMR</th>
                                <th className='wins-account'>Wins</th>
                                <th className='losses-account'>Losses</th>
                                <th className='winrate-account'>W/L</th>
                            </tr>
                            <tr>
                                <td>{sessionStorage.getItem("mmr")}</td>
                                <td>{sessionStorage.getItem("wins")}</td>
                                <td>{sessionStorage.getItem("losses")}</td>
                                {sessionStorage.getItem("losses") == 0
                                    ? <td>Perfect</td>
                                    : <td>{(sessionStorage.getItem("wins") / sessionStorage.getItem("losses")).toFixed(2)}</td>
                                }
                            </tr>
                        </table>

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
                        <a href={"/recordings/" + sessionStorage.getItem("user")}><button>Your Game Recordings</button></a>
                    </section>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Account