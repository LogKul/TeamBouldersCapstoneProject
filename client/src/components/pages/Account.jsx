import React from 'react'
import { useRef, useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from "../../api/axios"
import Header from '../Header'
import Footer from '../Footer'
import Modal from '../Modal'
import '../../styles/account.scss'

const USER_URL = "/users/update?username=" + sessionStorage.getItem("user")
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Account = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const errRef = useRef()

    const [pwd, setPwd] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
    }, [pwd])

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
                        <h4>Password Updated!</h4>
                        <p>
                            <Link to={"/home"}><button>Home</button></Link>
                        </p>
                    </section>
                    : <section>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <h2>{sessionStorage.getItem("user")}'s Account</h2>
                        <h3>Your Stats:</h3>
                        <table className='table-account'>
                            <tr>
                                <th className='table-header'>MMR</th>
                                <th className='table-header'>Wins</th>
                                <th className='table-header'>Losses</th>
                                <th className='table-header-last'>W/L</th>
                            </tr>
                            <tr>
                                <td className='table-cell-content'>{sessionStorage.getItem("mmr")}</td>
                                <td className='table-cell-content'>{sessionStorage.getItem("wins")}</td>
                                <td className='table-cell-content'>{sessionStorage.getItem("losses")}</td>
                                {sessionStorage.getItem("losses") == 0
                                    ? <td className='table-cell-content-last'>Perfect</td>
                                    : <td className='table-cell-content-last'>{(sessionStorage.getItem("wins") / sessionStorage.getItem("losses")).toFixed(2)}</td>
                                }
                            </tr>
                        </table>

                        <Link to={"/recordings/" + sessionStorage.getItem("user")}><button>Your Game Recordings</button></Link>

                        <button onClick={() => openModal()}>Update Password</button>
                        <br />
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                            <h1>New Password</h1>
                            <form onSubmit={updateUserPassword}>
                                <label htmlFor="password">Change Password:
                                    <span className={validPwd ? "valid" : "hide"}>Valid</span>
                                    <span className={validPwd || !pwd ? "hide" : "invalid"}>Invalid</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <button>Submit</button>
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number, and a special character.<br />
                                    Allowed special characters: !@#$%
                                </p>
                            </form>
                        </Modal>
                    </section>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Account