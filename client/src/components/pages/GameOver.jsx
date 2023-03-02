import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

function GameOver() {
    return(
        <div>
            <Header />
            <div className='content-wrap'>
                <a href="/Play"><button>Play Again</button></a>
                <a href="/"><button>Back To Home</button></a>
            </div>
            <Footer />
        </div>
    )
}

export default GameOver