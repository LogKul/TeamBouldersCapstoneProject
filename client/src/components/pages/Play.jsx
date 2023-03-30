import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import '../../styles/play.scss'

const Play = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                {/* <h2>P1 V.S. Computer</h2>
                <ul>
                    <li><Link to="/game/0/0/0/0">Easy</Link></li>
                    <li><Link to="/game/0/1/0/0">Medium</Link></li>
                    <li><Link to="/game/0/2/0/0">Hard</Link></li>
                </ul> */}

                {/* <Link to="/game/1/0/0/0"><h2>P1 V.S. P2 Local</h2></Link> */}

                {/* <Link to="/matchmaking"><h2>P1 V.S. P2 Online</h2></Link> */}
                <h1>Choose Your Opponent</h1>
                <div className='flex-container'>
                    <div className='flex-child'>
                        <a href="/game/0/0/0/0"><button className='large-button'>Versus Computer</button></a>
                    </div>
                    <div className='flex-child'>
                        <a href="/matchmaking"><button className='large-button'>Online Versus</button></a>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Play