import React from 'react'

function Header() {
    return(
        <div className='header'>
            <div className='header-left'>
                <a href="/home">
                    <img src="Checkerboard.ico" alt="Checkers Logo" />
                </a>
            </div> 
            <div className='header-center'>
                {/* This is a placeholder section for future content. */}
            </div>
            <div className='header-right'>
                <a href="/home"> Home </a>
                <a href="#"> Checkers </a>
                <a href="#"> Leaderboard </a>
                <a href="#"> Profile </a>
            </div>
        </div>
    )
}

export default Header
