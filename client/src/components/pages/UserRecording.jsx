import { React, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import GameRecording from '../GameRecording'
import axios from "../../api/axios"
import { GiQueenCrown } from "react-icons/gi"
import { FaClock } from "react-icons/fa"

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
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                {(sessionStorage.getItem("user") == username)
                    ? <h2>Your Games</h2>
                    : <h2>{username}&apos;s Games</h2>
                }
                <table className='table'>
                    <tbody>
                        <tr className='row'>
                            <th className='column'><FaClock /> Time Finished <FaClock /></th>
                            <th className='column'><GiQueenCrown /> Winner <GiQueenCrown /></th>
                            <th className='column'>Red Player:</th>
                            <th className='column'>Black Player:</th>
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