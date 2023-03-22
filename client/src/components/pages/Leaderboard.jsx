import React from 'react'
import { Link } from "react-router-dom"
import Header from '../Header'
import Footer from '../Footer'
import WSComponent from '../WSComponent'

const Leaderboard = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h1>This will be the Leaderboard page!</h1>
                <br></br>
                <br></br>
                <h2>This page will include links to:</h2>
                <ul>
                    <Link to="/account"><li>Account for viewing a specific player&apos;s account</li></Link>
                </ul>
            </div>
            <WSComponent />
            <Footer />
        </div>
    )
}

export default Leaderboard