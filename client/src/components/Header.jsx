import React, { useContext } from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import '../styles/header.scss'

function Header() {
    let { auth, logout } = useContext(AuthContext)

    return(
        <div className='header'>
            <div className='header-left'>
                <a href="/home">
                    <img src="Checkerboard.ico" alt="Checkers Logo" />
                </a>
            </div>
            <div className='header-right'>
                <Link to="/">Home</Link>
                <Link to="/account">Account</Link>
                <Link to="/games">Game</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/recordings">Recording</Link>
                <Link to="/login" onClick={logout}>LOGOUT</Link>
            </div>
        </div>
    )
}

export default Header
