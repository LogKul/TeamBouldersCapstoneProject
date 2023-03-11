import React from 'react'
import { useParams } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"

const Game = () => {

    const { game_mode, difficulty } = useParams();

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <p>Game Mode: {game_mode}</p>
                <p>Difficulty: {difficulty}</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
<<<<<<< HEAD
                    <Checkers gameMode={parseInt(game_mode)} difficulty={parseInt(difficulty)} />
=======
                    <Checkers gameMode={parseInt(game_mode)} difficulty={parseInt(difficulty)} gameID={game_id} color={parseInt(color)} />
>>>>>>> 77edc9824c8146e8d6f12eb0617a13278f0e8786
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Game