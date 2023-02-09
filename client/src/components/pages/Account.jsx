import React from 'react'
import TempNav from "../TempNav"
import { Link } from "react-router-dom"

const Account = () => {
    return (
        <div>
            <h1>This will be the Account page!</h1>
            <br></br>
            <br></br>
            <h2>This page will include links to:</h2>
            <ul>
                <Link to="/account/settings"><li>Settings</li></Link>
                <Link to="/recordings"><li>Game Recordings</li></Link>
            </ul>
            <br></br>
            <br></br>
            <TempNav />
        </div>
    )
}

export default Account