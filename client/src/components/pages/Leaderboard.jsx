import { React, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import LeaderboardRow from '../LeaderboardRow'
import axios from "../../api/axios"

const Leaderboard = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const response = await axios.get("/users/rankings",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
            console.log(response)
            const localUserData = response?.data?.users
            setUsers(localUserData)
        } catch (err) {
            console.log(err?.response)
        }
    }

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h1>Leaderboards</h1>
                <br></br>
                <br></br>
                {users
                    ? users.map((user, index) => (
                        <div key={index}>
                            <LeaderboardRow key={index} user={user} index={index} />
                            <br></br>
                        </div>
                    ))
                    : <p>Loading...</p>
                }
                <br></br>
                <br></br>
                <h2>This page will include links to:</h2>
                <ul>
                    <Link to="/account"><li>Account for viewing a specific player&apos;s account</li></Link>
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default Leaderboard