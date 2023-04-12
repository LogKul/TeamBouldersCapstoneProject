import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import Modal from '../Modal'
import '../../styles/home.scss'

const Home = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h1>Dashboard</h1>
                <div className='flex-container-outer-home'>
                    <div className='flex-container-vertical-home'>
                        <div className='flex-child-home-25'>
                            <h3 className='underline'>Your MMR</h3>
                            <h2>{sessionStorage.getItem("mmr")}</h2>
                        </div>
                        <div className='flex-child-home-25'>
                            <h4>Wins: {sessionStorage.getItem("wins") + "\n"}</h4>
                            <h4>Losses: {sessionStorage.getItem("losses") + "\n"}</h4>
                            {sessionStorage.getItem("losses") == 0
                                ? <h4>W/L: Perfect{"\n"}</h4>
                                : <h4>W/L: {(sessionStorage.getItem("wins") / sessionStorage.getItem("losses")).toFixed(2) + "\n"}</h4>
                            }
                        </div>
                    </div>
                    <div className='flex-child-home-50'>
                        <a href="/play"><button>Play Game</button></a>
                        <br />
                        <button onClick={openModal}>Open Pop-Up</button>
                        <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                            <h1>This is a pop-up!</h1>
                            <p>Pretty neat huh?</p>
                        </Modal>
                    </div>
                    <div className='flex-container-vertical-home'>
                        <div className='flex-child-home-25'>
                            <Link to={"/recordings/" + sessionStorage.getItem("user")}><h3>Game History</h3></Link>
                        </div>
                        <div className='flex-child-home-25'>
                            <Link to={"/account"}><h3>Your Account</h3></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home