import React from 'react'
import { useParams } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"

const Game = () => {

    const { game_mode, difficulty, color } = useParams();

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <p>Game Mode: {game_mode}</p>
                <p>Difficulty: {difficulty}</p>
                <p>Color: {color}</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Checkers gameMode={parseInt(game_mode)} difficulty={parseInt(difficulty)} color={parseInt(color)} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Game