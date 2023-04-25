import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../Header'
import Footer from '../Footer'
import { GiCrossedSwords } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";

const Play = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h2>Choose Your Opponent</h2>
                <div className='flex-container'>
                    <div className='flex-child'>
                        <Link to={"/game"}><button className='large-button'><FaRobot/> Offline Against AI <FaRobot/></button></Link>
                        <ul className='unordered-list'>
                            <li>No time limit.</li>
                            <li>Stats are not saved.</li>
                            <li>No penalty for leaving game.</li>
                        </ul>
                    </div>
                    <div className='flex-child'>
                        <Link to={"/matchmaking"}><button className='large-button'>PVP <GiCrossedSwords/> Online</button></Link>
                        <ul className='unordered-list'>
                            <li>Automatic matchmaking</li>
                            <li>Timed games.</li>
                            <li>Stats are saved.</li>
                            <li>Taking too long to play forfeits.</li>
                            <li>Leaving the game forfeits.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Play
