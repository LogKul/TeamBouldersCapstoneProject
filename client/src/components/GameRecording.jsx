import React from 'react'
import { Link } from 'react-router-dom'
const moment = require('moment')

function GameRecording({ game }) {

    return (
        <tr>
            {(game.finishedTime != null)
                ? <td>{moment(game.finishedTime).format('MM/DD/YYYY LTS')}</td>
                : <td>no time</td>
            }
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

//<td>{momenttz.tz(game.finishedTime).format("MM/DD/YYYY LTS")}</td>