import React, { useState } from 'react'
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
                <div className='flex-container'>
                    <div className='flex-child'>
                        <h3>Your MMR</h3>
                    </div>
                    <div className='flex-child'>
                        <a href="/play"><button>Play Game</button></a>
                        <br />
                        <button onClick={openModal}>Open Pop-Up</button>
                        <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                            <h1>This is a pop-up!</h1>
                            <p>Pretty neat huh?</p>
                        </Modal>
                    </div>
                    <div className='flex-child'>
                        <h3>Your Wins:     0</h3>
                        <h3>Your Losses:   0</h3>
                        <h3>Your W/L:      0</h3>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home