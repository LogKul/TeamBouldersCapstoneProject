import React from 'react'
import TempNav from "../TempNav"
import { Link } from "react-router-dom"

const Recording = () => {
    return (
        <div>
            <h1>This will be the Game Recording page!</h1>
            <br></br>
            <br></br>
            <h2>This page will include links to:</h2>
            <ul>
                <Link to="/account"><li>Accounts of both players</li></Link>
            </ul>
            <br></br>
            <br></br>
            <TempNav />
        </div>
    )
}

export default Recording