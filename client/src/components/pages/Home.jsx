import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Home = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <p>This will be the homepage!</p>
                <a href="/start"><button>Play Game</button></a>
            </div>
            <Footer />
        </div>
    )
}

export default Home