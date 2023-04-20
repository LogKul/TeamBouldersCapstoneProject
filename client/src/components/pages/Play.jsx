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
                <h1 className>Choose Your Opponent</h1>
                <div className='flex-container'>
                    <div className='flex-child'>
                        <a href="/game"><button className='large-button'>Versus <FaRobot/> Computer</button></a>
                    </div>
                    <div className='flex-child'>
                        <a href="/matchmaking"><button className='large-button'>PVP <GiCrossedSwords/> Online</button></a>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Play