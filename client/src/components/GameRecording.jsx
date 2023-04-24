import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const moment = require('moment')

function GameRecording({ game, index }) {

    const [cell_style, setClass] = useState("odd-row")
    useEffect(() => {
        if (index == 0) {
            setClass("first-place even-row")
        }
        else if (index == 1) {
            setClass("second-place odd-row")
        }
        else if (index == 2) {
            setClass("third-place even-row")
        }
        else if (index % 2 == 0) {
            setClass("even-row")
        }
        else {
            setClass("odd-row")
        }
    }, [])

    return (
        <tr className='row'>
            {(game.finishedTime != null)
                ? <td className={`${cell_style}`}>{moment(game.finishedTime).format('MM/DD/YYYY LTS')}</td>
                : <td className={`${cell_style}`}>no time</td>
            }
            {(game.winner == game.player1)
                ? <td className={`${cell_style}`}><Link to={"/recordings/" + game.player_1.username}>{game.player_1.username}</Link></td>
                : <td className={`${cell_style}`}><Link to={"/recordings/" + game.player_2.username}>{game.player_2.username}</Link></td>
            }
            <td className={`${cell_style}`}><Link to={"/recordings/" + game.player_1.username}>{game.player_1.username}</Link></td>
            <td className={`${cell_style}`}><Link to={"/recordings/" + game.player_2.username}>{game.player_2.username}</Link></td>
        </tr>
    )
}

export default GameRecording
