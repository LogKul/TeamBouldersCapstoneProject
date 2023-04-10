import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../styles/leaderboardrow.scss"

function LeaderboardRow({ user, index }) {

    const [cell_style, setClass] = useState( "odd-row" )
    useEffect(() => {
        if (index == 0) {
            setClass("first-place")
        }
        else if (index == 1) {
            setClass("second-place")
        }
        else if (index == 2) {
            setClass("third-place")
        }
        else if (index % 2 == 0) {
            setClass("even-row")
        }
        else {
            setClass("odd-row")
        }
    }, [])

    console.log(cell_style)

    return (
        <tr>
            <td className={`${cell_style}`}>{index + 1}</td>
            <td className={`${cell_style}`}><Link to={"/recordings/" + user.username}>{user.username}</Link></td>
            <td className={`${cell_style}`}>{user.mmr}</td>
            {user.losses == 0
                ? <td className={`${cell_style}`}>Perfect</td>
                : <td className={`${cell_style}`}>{(user.wins / user.losses).toFixed(2)}</td>
            }
            <td className={`${cell_style}`}>{user.wins}</td>
            <td className={`${cell_style}`}>{user.losses}</td>
        </tr>
    )
}

export default LeaderboardRow
