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
                <Checkers gameMode={parseInt(game_mode)} difficulty={parseInt(difficulty)} />
            </div>
            <Footer />
        </div>
    )
}

export default Game