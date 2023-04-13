import { React, useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeaderboardRow from '../LeaderboardRow'
import axios from "../../api/axios"
import "../../styles/leaderboard.scss"

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
                <h1>Leaderboard</h1>
                <br></br>
                <br></br>
                <table className='table'>
                    <tbody>
                        <tr className='bordering'>
                            <th className='rank'>Rank</th>
                            <th className='player'>Player</th>
                            <th className='mmr'>MMR</th>
                            <th className='winrate'>Winrate</th>
                            <th className='wins'>Wins</th>
                            <th className='losses'>Losses</th>
                        </tr>
                        {users
                            ? users.map((user, index) => (
                                <LeaderboardRow key={index} user={user} index={index} />
                            ))
                            : <p>Loading...</p>
                        }
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    )
}

export default Leaderboard
