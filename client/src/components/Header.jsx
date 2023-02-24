import React, { useContext } from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import '../styles/header.scss'

function Header() {

    return (
        <div className='header'>
            <div className='header-left'>
                <a href="/">
                    <img src="/Checkerboard.ico" alt="Checkers Logo" />
                </a>
            </div>
            <div className='header-right'>
                <Link to="/play">Play</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/recordings">Recording</Link>
                <Link to="/account">Account</Link>
                <Link to="/login" onClick={() => { sessionStorage.clear() }}>LOGOUT</Link>
            </div>
        </div>
    )
}

export default Header
