import { React, useEffect, useState } from 'react'
//import { Link } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import GameRecording from '../GameRecording'
import axios from "../../api/axios"

const Recording = () => {

    const [games, setGames] = useState([])

    useEffect(() => {
        getGames()
    }, [])

    const getGames = async () => {
        try {
            const response = await axios.get("/games/findcompletedgames",
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

                <h1>Global Game History</h1>
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

export default Recording