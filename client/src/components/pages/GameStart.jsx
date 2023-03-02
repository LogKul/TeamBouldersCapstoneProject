import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

function GameStart() {
    return(
        <div>
            <Header />
            <div className='content-wrap'>
                <a href="/Play"><button>Play Game</button></a>
            </div>
            <Footer />
        </div>
    )
}

export default GameStart