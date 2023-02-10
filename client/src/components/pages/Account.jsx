import React from 'react'
import { Link } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'

const Account = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h1>This will be the Account page!</h1>
                <br></br>
                <br></br>
                <h2>This page will include links to:</h2>
                <ul>
                    <Link to="/account/settings"><li>Settings</li></Link>
                    <Link to="/recordings"><li>Game Recordings</li></Link>
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default Account