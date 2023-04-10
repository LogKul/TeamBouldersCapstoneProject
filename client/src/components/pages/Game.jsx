import React from 'react'
import { useParams } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"

const Game = () => {

    const { game_mode, difficulty, game_id, color } = useParams();

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <p>Game Mode: {game_mode}    Difficulty {difficulty}</p>
                <p>Color: {color}    Game ID: {game_id}</p>
                <Checkers gameMode={parseInt(game_mode)} difficulty={parseInt(difficulty)} gameID={game_id} color={parseInt(color)} />
            </div>
            <Footer />
        </div>
    )
}

export default Game