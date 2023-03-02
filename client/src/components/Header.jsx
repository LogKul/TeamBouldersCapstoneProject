import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.scss'

function Header() {

    const user = useState("")

    return (
        <div className='header'>
            <div className='header-left'>
                <a href="/Home">
                    <img src="/Checkerboard.ico" alt="Checkers Logo" />
                </a>
            </div>
            <div className='header-right'>
                <Link to="/start">Play Game</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/recordings">Recording</Link>
                <Link to="/account">Account</Link>
                {sessionStorage.getItem("user", user) != null &&
                    <Link to="/login" onClick={() => { sessionStorage.clear() }}>LOGOUT</Link>
                }
                {sessionStorage.getItem("user", user) == null &&
                    <Link to="/login" onClick={() => { sessionStorage.clear() }}>LOGIN</Link>
                }
            </div>
        </div>
    )
}

export default Header
