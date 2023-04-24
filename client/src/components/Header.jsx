import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.scss'
import { AiOutlineMenu } from "react-icons/ai"
import Modal from './Modal'

function Header() {

    const user = useState("")

    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    if (window.innerWidth <= 1024) {
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
                        <a href="/play"><button>Play Game</button></a><br/>
                        <a href="/leaderboard"><button>Leaderboard</button></a><br/>
                        <a href="/recordings"><button>Recordings</button></a><br/>
                        <a href="/account"><button>Account</button></a><br/>
                        {sessionStorage.getItem("user", user) != null &&
                            <a href="/" onClick={() => { sessionStorage.clear() }}><button>LOGOUT</button></a>
                        }
                        {sessionStorage.getItem("user", user) == null &&
                            <a href="/login" onClick={() => { sessionStorage.clear() }}><button>LOGIN</button></a>
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
