import React from 'react'
import { Link } from 'react-router-dom'

function GameRecording({ game }) {
    return (
        <tr>
            <td>{game.time + " UTC"}</td>
            {(game.winner == game.player1)
                ? <Link to={"/recordings/" + game.player_1.username}><td>{game.player_1.username}</td></Link>
                : <Link to={"/recordings/" + game.player_2.username}><td>{game.player_2.username}</td></Link>
            }
            <Link to={"/recordings/" + game.player_1.username}><td>{game.player_1.username}</td></Link>
            <Link to={"/recordings/" + game.player_2.username}><td>{game.player_2.username}</td></Link>
        </tr>
    )
}

export default GameRecording