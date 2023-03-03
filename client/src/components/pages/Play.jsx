import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const Play = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h2>P1 V.S. Computer</h2>
                <ul>
                    <li><Link to="/game/0/0/0/0">Easy</Link></li>
                    <li><Link to="/game/0/1/0/0">Medium</Link></li>
                    <li><Link to="/game/0/2/0/0">Hard</Link></li>
                </ul>

                <br></br>
                <br></br>
                <hr></hr>

                <Link to="/game/1/0/0/0"><h2>P1 V.S. P2 Local</h2></Link>

                <br></br>
                <br></br>
                <hr></hr>

                <Link to="/matchmaking"><h2>P1 V.S. P2 Online</h2></Link>

            </div>
            <Footer />
        </div>
    )
}

export default Play