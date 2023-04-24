import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.scss'
import { AiOutlineMenu } from "react-icons/ai"
import Modal from './Modal'

function Header() {

    const user = useState("")

    const [width, setWidth]   = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    if (width <= 1235) {
        return (
            <div className='header'>
                <div className='header-left'>
                    {sessionStorage.getItem("user", user) != null &&
                        <a href="/Home">
                            <img src="/Checkerboard.ico" alt="Checkers Logo" />
                        </a>
                    }
                    {sessionStorage.getItem("user", user) == null &&
                        <a href="/">
                            <img src="/Checkerboard.ico" alt="Checkers Logo" />
                        </a>
                    }
                </div>
                <div className='header-right'>
                    <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                        <h4>Menu</h4>
                        <a href="/play"><button className='small-button'>Play Game</button></a><br/>
                        <a href="/leaderboard"><button className='small-button'>Leaderboard</button></a><br/>
                        <a href="/recordings"><button className='small-button'>Recordings</button></a><br/>
                        <a href="/account"><button className='small-button'>Account</button></a><br/>
                        {sessionStorage.getItem("user", user) != null &&
                            <a href="/" onClick={() => { sessionStorage.clear() }}><button className='small-button'>LOGOUT</button></a>
                        }
                        {sessionStorage.getItem("user", user) == null &&
                            <a href="/login" onClick={() => { sessionStorage.clear() }}><button className='small-button'>LOGIN</button></a>
                        }
                    </Modal>
                    <a href="#" onClick={openModal}><AiOutlineMenu /></a>
                </div>
            </div>
        )
    } else {
        return (
            <div className='header'>
                <div className='header-left'>
                    {sessionStorage.getItem("user", user) != null &&
                        <a href="/Home">
                            <img src="/Checkerboard.ico" alt="Checkers Logo" />
                        </a>
                    }
                    {sessionStorage.getItem("user", user) == null &&
                        <a href="/">
                            <img src="/Checkerboard.ico" alt="Checkers Logo" />
                        </a>
                    }
                </div>
                <div className='header-right'>
                    <Link to="/play">Play Game</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                    <Link to="/recordings">Recording</Link>
                    <Link to="/account">Account</Link>
                    {sessionStorage.getItem("user", user) != null &&
                        <Link to="/" onClick={() => { sessionStorage.clear() }}>LOGOUT</Link>
                    }
                    {sessionStorage.getItem("user", user) == null &&
                        <Link to="/login" onClick={() => { sessionStorage.clear() }}>LOGIN</Link>
                    }
                </div>
            </div>
        )
    }
}

export default Header
