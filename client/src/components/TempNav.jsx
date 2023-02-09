import React, { useContext } from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'


const TempNav = () => {
    let { auth, logout } = useContext(AuthContext)

    return (
        <div>
            <p>============================</p>
            <p>=     TEMP NAV             =</p>
            <p>============================</p>
            <Link to="/"><p>-Home</p></Link>
            <Link to="/account"><p>-Account Page</p></Link>
            <Link to="/games"><p>-Game</p></Link>
            <Link to="/leaderboard"><p>-Leaderboard</p></Link>
            <Link to="/recordings"><p>-Recording</p></Link>
            <Link to="/login"><p onClick={logout}>LOGOUT</p></Link>
        </div>
    )
}

export default TempNav