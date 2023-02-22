import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Home = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <p>This will be the homepage!</p>
            </div>
            <Footer />
        </div>
    )
}

export default Home