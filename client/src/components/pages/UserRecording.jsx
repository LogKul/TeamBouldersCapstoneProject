import { React, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import GameRecording from '../GameRecording'
import axios from "../../api/axios"

const UserRecording = () => {

    const [games, setGames] = useState([])

    useEffect(() => {
        getGames()
    }, [])

    const getGames = async () => {
        try {
            const response = await axios.get("/games/findusergames",
                { params: { playerid: sessionStorage.getItem("userID") } },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
            console.log(response)
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
                <h1>This will be the User&apos;s Game Recording page!</h1>
                <br></br>
                <br></br>
                <h2>This page will include links to:</h2>
                <ul>
                    <Link to="/account"><li>Accounts of both players</li></Link>
                </ul>

                <h1>Your Games</h1>
                <hr></hr>
                {games == []
                    ? games.map((game) => (
                        <GameRecording key={game.id} game={game} />
                    ))
                    : <p>No games recorded.</p>
                }
            </div>
            <Footer />
        </div>
    )
}

export default UserRecording