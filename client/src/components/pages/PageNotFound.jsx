import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom'

function PageNotFound() {

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h2>404</h2>
                <h4>Page Not Found.</h4>
                <Link to={"/home"}><button>Home</button></Link>
                <Link to={"/account"}><button>Account</button></Link>
            </div>
            <Footer />
        </div>
    )
}

export default PageNotFound
