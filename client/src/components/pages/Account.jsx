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

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

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
                        <h4>Your Stats</h4>
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

                        <button onClick={() => openModal()}>Update Password</button>
                        <br />
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                            <h1>New Password</h1>
                            <form onSubmit={updateUserPassword}>
                                <label htmlFor="password">Change Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                                <button>Submit</button>
                            </form>
                        </Modal>
                        <Link to={"/recordings/" + sessionStorage.getItem("user")}><button>Your Game Recordings</button></Link>
                    </section>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Account