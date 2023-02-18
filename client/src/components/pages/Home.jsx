import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Refresh from '../Refresh'

const Home = () => {
    return (
        <div>
            <Refresh />
            <Header />
            <div className='content-wrap'>
                <p>This will be the homepage!</p>
            </div>
            <Footer />
        </div>
    )
}

export default Home