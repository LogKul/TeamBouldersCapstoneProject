import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function LeaderboardRow({ user, index }) {

    const [rank_style, setStyle] = useState({
        border: "2px solid red",
        width: "50%",
        margin: "auto"
    })

    useEffect(() => {
        if (index == 0) {
            setStyle({
                border: "16px ridge gold",
                borderRadius: "20px",
                width: "80%",
                margin: "auto",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/gold_shine.jpg'})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "gold",
                backgroundSize: "cover"
            })
        }
        else if (index == 1) {
            setStyle({
                border: "12px ridge silver",
                borderRadius: "20px",
                width: "70%",
                margin: "auto",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/silver_shine.jpg'})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "gold",
                backgroundSize: "cover"
            })
        }
        else if (index == 2) {
            setStyle({
                border: "8px ridge orange",
                borderRadius: "20px",
                width: "60%",
                margin: "auto",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bronze_shine.jpg'})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "gold",
                backgroundSize: "cover"
            })
        }
        else {
            setStyle({
                border: "2px solid red",
                borderRadius: "20px",
                width: "50%",
                margin: "auto"
            })
        }
    }, [])

    return (
        <div style={rank_style} >
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