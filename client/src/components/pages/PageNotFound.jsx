import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

function PageNotFound() {

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h1>404</h1>
                <h3>Page Not Found.</h3>
                <a href="home"><button>Home</button></a>
                <a href="account"><button>Account</button></a>
            </div>
            <Footer />
        </div>
    )
}

export default PageNotFound
