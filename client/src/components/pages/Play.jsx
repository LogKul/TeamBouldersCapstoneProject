import React from 'react'
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
                        <a href="/game"><button className='large-button'><FaRobot/> Offline Against AI <FaRobot/></button></a>
                        <ul className='unordered-list'>
                            <li>No time limit.</li>
                            <li>Stats are not saved.</li>
                            <li>No penalty for leaving game.</li>
                        </ul>
                    </div>
                    <div className='flex-child'>
                        <a href="/matchmaking"><button className='large-button'>PVP <GiCrossedSwords/> Online</button></a>
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