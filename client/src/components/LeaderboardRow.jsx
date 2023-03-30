import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function LeaderboardRow({ user, index }) {

    const [rank_style, setStyle] = useState({
        //border: "2px solid red",
        //width: "50%",
        //margin: "auto"
    })

    const [cell_style, setCell] = useState({ border: "1px ridge black" })

    useEffect(() => {
        if (index == 0) {
            setStyle({
                border: "1px ridge gold",
                //borderRadius: "20px",
                //width: "80%",
                //margin: "auto",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/gold_shine.jpg'})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "gold",
                backgroundSize: "cover"
            })
        }
        else if (index == 1) {
            setStyle({
                border: "1px ridge silver",
                //borderRadius: "20px",
                //width: "70%",
                //margin: "auto",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/silver_shine.jpg'})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "silver",
                backgroundSize: "cover"
            })
        }
        else if (index == 2) {
            setStyle({
                border: "1px ridge orange",
                //borderRadius: "20px",
                //width: "60%",
                //margin: "auto",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bronze_shine.jpg'})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "bronze",
                backgroundSize: "cover"
            })
        }
        else if (index % 2 == 1) {
            setCell({
                border: "1px solid black",
                backgroundColor: "lightgray",
            })
        }
        else {
            setCell({
                border: "1px solid black",
            })
        }
    }, [])

    return (
        <tr style={rank_style} >
            <td style={cell_style}>{index + 1}</td>
            <td style={cell_style}><Link to={"/recordings/" + user.username}>{user.username}</Link></td>
            <td style={cell_style}>{user.mmr}</td>
            {user.losses == 0
                ? <td style={cell_style}>Perfect</td>
                : <td style={cell_style}>{(user.wins / user.losses).toFixed(2)}</td>
            }
            <td style={cell_style}>{user.wins}</td>
            <td style={cell_style}>{user.losses}</td>
        </tr>
    )
}

export default LeaderboardRow