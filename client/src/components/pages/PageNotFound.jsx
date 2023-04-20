import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

function PageNotFound() {

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1>404</h1>
                <h3>Page Not Found.</h3>
            </div>
            <Footer />
        </div>
    )
}

export default PageNotFound
