import { React, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import GameRecording from '../GameRecording'
import axios from "../../api/axios"

const UserRecording = () => {

    const [games, setGames] = useState([])
    const { username } = useParams()

    useEffect(() => {
        getGames()
    }, [username])

    const getGames = async () => {
        try {
            console.log(username)
            const response = await axios.get("/games/findusergames?username=" + username,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
            const localGameData = response?.data?.games
            setGames(localGameData)
        } catch (err) {
            console.log(err?.response)
        }
    }

    return (
        <div>
            <Header />
            <div className='content-wrap'>

                {(sessionStorage.getItem("user") == username)
                    ? <h1>Your Games</h1>
                    : <h1>{username + "'s Games"}</h1>
                }
                <hr></hr>
                <table>
                    <tbody>
                        <tr>
                            <th>Time Finished</th>
                            <th>Winner</th>
                            <th>Red</th>
                            <th>Black</th>
                        </tr>
                        {games
                            ? games.map((game, index) => (
                                <GameRecording key={game.id} game={game} index={index} />
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

export default UserRecording