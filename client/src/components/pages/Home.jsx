import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import '../../styles/home.scss'

const Home = () => {

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h2>Dashboard</h2>
                <a href="/play"><button className='large-button'>Play Game</button></a>
                <br/>
                <Link to={"/recordings/" + sessionStorage.getItem("user")}><button>Game History</button></Link>
                <a href="/account"><button>Your Account</button></a>
                <div className='flex-container'>
                    <div className='flex-child home-left-section'>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <h4>{sessionStorage.getItem("user")}'s Stats:</h4>
                    </div>
                    <div className='flex-child home-right-section'>
                        <p>MMR: {sessionStorage.getItem("mmr")}</p>
                        <p>Wins: {sessionStorage.getItem("wins")}</p>
                        <p>Losses: {sessionStorage.getItem("losses")}</p>
                        {sessionStorage.getItem("losses") == 0
                            ? <p>W/L Ratio: Perfect{"\n"}</p>
                            : <p>W/L Ratio: {(sessionStorage.getItem("wins") / sessionStorage.getItem("losses")).toFixed(2) + "\n"}</p>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home