import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

function Landing() {

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h1>Welcome To Checkers!</h1>
                <a href="/Login"><button>Login</button></a>
            </div>
            <Footer />
        </div>
    )
}

export default Landing
