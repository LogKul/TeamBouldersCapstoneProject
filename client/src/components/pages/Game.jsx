import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Modal from '../Modal'
import Checkers from "../checkers/Checkers"

const Game = () => {

    const [modalIsOpen, setModalIsOpen] = useState(true)

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const [color, setColor] = useState(undefined)

    function setColorRed() {
        setColor(0)
    }

    function setColorBlack() {
        setColor(1)
    }

    if (color === undefined) {
        return (
            <div>
                <Header />
                <div className='content-wrap'>
                    <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                        <h1> Choose Your Color</h1>
                        <button onClick={setColorRed}>Play as Red</button>
                        <button onClick={setColorBlack}>Play as Black</button>
                        <br/>
                    </Modal>
                    <button onClick={openModal}>Choose A Color</button>
                </div>
                <Footer />
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <div className='content-wrap'>
                    <p></p>
                    <p></p>
                    <Checkers gameMode={0} difficulty={0} gameID={'empty'} color={color} />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Game