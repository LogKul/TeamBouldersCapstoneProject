import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"

const Game = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <Checkers />
            </div>
            <Footer />
        </div>
    )
}

export default Game