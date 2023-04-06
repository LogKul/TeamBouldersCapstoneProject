import React from 'react'

function GameRecording({ game }) {
    return (
        <tr>
            <td>{game.time + " UTC"}</td>
            <td>{game.player1}</td>
            <td>{game.player2}</td>
            <td>{game.winner}</td>
        </tr>
    )
}

export default GameRecording