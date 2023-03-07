import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Modal from '../Modal'

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
                <p>This will be the homepage!</p>
                <a href="/start"><button>Play Game</button></a>
                <br />
                <button onClick={openModal}>Open Pop-Up</button>
                <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                    <h1>This is a pop-up!</h1>
                    <p>Pretty neat huh?</p>
                </Modal>
            </div>
            <Footer />
        </div>
    )
}

export default Home