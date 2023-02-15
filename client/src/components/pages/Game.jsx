import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Refresh from '../Refresh'
import Checkers from "../checkers/Checkers"

const Game = () => {
    return (
        <div>
            <Refresh />
            <Header />
            <div className='content-wrap'>
                <Checkers />
            </div>
            <Footer />
        </div>
    )
}

export default Game