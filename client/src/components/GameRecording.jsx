import React from 'react'

function GameRecording({ game }) {
    return (
        <div>
            <p>GameID (remove later): {game.id}</p>
            <p>Red:   {game.player1}</p>
            <p>Black: {game.player2}</p>
            <br></br>
            <h3>Winner: {game.winner}</h3>
        </div>
    )
}

export default GameRecording