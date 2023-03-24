import React from 'react'
import { Link } from 'react-router-dom'

function LeaderboardRow({ user, index }) {
    return (
        <div style={{ border: "2px solid red", width: "50%", margin: "auto" }} >
            <h3>{index + 1}.) <Link to={"/recordings/" + user.username}>{user.username}</Link></h3>
            {user.losses == 0
                ? <p>Winrate: Perfect</p>
                : <p>Winrate: {(user.wins / user.losses).toFixed(2)}</p>
            }
            <p>   Wins: {user.wins}</p>
            <p> Losses: {user.losses}</p>
            <br></br>
        </div>
    )
}

export default LeaderboardRow