import { React, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import LeaderboardRow from '../LeaderboardRow'
import axios from "../../api/axios"

const Leaderboard = () => {

    const [users, setUsers] = useState([])
    const [styles] = useState({
        table_css: {
            width: "60%",
            margin: "auto",
            border: "1px ridge black"
        },
        rank_css: {
            width: "10%",
            padding: "4px",
            border: "1px ridge black"
        },
        player_css: {
            width: "60%",
            padding: "4px",
            border: "1px ridge black"
        },
        winrate_css: {
            width: "10%",
            padding: "4px",
            border: "1px ridge black"
        },
        wins_css: {
            width: "10%",
            padding: "4px",
            border: "1px ridge black"
        },
        losses_css: {
            width: "10%",
            padding: "4px",
            border: "1px ridge black"
        }
    })

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
                <table style={styles.table_css}>
                    <tr style={styles.bordering}>
                        <th style={styles.rank_css}>Rank</th>
                        <th style={styles.player_css}>Player</th>
                        <th style={styles.winrate_css}>Winrate</th>
                        <th style={styles.wins_css}>Wins</th>
                        <th style={styles.losses_css}>Losses</th>
                    </tr>
                    {users
                        ? users.map((user, index) => (
                            <LeaderboardRow key={index} user={user} index={index} />
                        ))
                        : <p>Loading...</p>
                    }
                </table>

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