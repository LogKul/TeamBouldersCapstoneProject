import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import '../../styles/landing.scss'
import LeaderboardDisplay from '../LeaderboardDisplay'
import { FaRobot } from "react-icons/fa";
import { GiCrossedSwords, GiRank3 } from "react-icons/gi";
import { ImStatsDots } from "react-icons/im"

function Landing() {

    return (
        <div>
            <Header />
            <div className='content-wrap landing-page'>
                <h1>Welcome To Checkers!</h1>
                <p>Please create an account to access all functions on the site.</p>
                <Link to={"/register"}><button>Sign Up</button></Link>
                <Link to={"/login"}><button>Login</button></Link>
                <div className='flex-container'>
                    <div className='flex-child'>
                        <h4>Features:</h4>
                        <ul className='unordered-list'>
                            <li><FaRobot/> Play Vs. AI</li>
                            <li><GiCrossedSwords/> Play online via matchmaking.</li>
                            <li><GiRank3/> Track your account stats and matchmaking rank.</li>
                            <li><ImStatsDots/> Climb the leaderboard.</li>
                        </ul>
                        <br/>
                        <img src="/assets/demo-board.png" alt="Demo Checkers Board" />
                    </div>
                    <div className='flex-child'>
                        <h4>Current Leaderboard:</h4>
                        <LeaderboardDisplay />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Landing
