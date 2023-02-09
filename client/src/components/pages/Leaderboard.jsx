import React from 'react'
import TempNav from "../TempNav"
import { Link } from "react-router-dom"

const Leaderboard = () => {
    return (
        <div>
            <h1>This will be the Leaderboard page!</h1>
            <br></br>
            <br></br>
            <h2>This page will include links to:</h2>
            <ul>
                <Link to="/account"><li>Account for viewing a specific player's account</li></Link>
            </ul>
            <br></br>
            <br></br>
            <TempNav />
        </div>
    )
}

export default Leaderboard