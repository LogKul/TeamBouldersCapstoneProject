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
                        <Link to={"/home"}>
                            <img src="/Checkerboard.ico" alt="Checkers Logo" />
                        </Link>
                    }
                    {sessionStorage.getItem("user", user) == null &&
                        <Link to={"/"}>
                            <img src="/Checkerboard.ico" alt="Checkers Logo" />
                        </Link>
                    }
                </div>
                <div className='header-right'>
                    <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                        <h4>Menu</h4>
                        <Link to={"/play"}><button className='small-button'>Play Game</button></Link><br/>
                        <Link to={"/leaderboard"}><button className='small-button'>Leaderboard</button></Link><br/>
                        <Link to={"/recordings"}><button className='small-button'>Game History</button></Link><br/>
                        <Link to={"/account"}><button className='small-button'>Account</button></Link><br/>
                        {sessionStorage.getItem("user", user) != null &&
                            <Link to={"/"} onClick={() => { sessionStorage.clear() }}><button className='small-button'>LOGOUT</button></Link>
                        }
                        {sessionStorage.getItem("user", user) == null &&
                            <Link to={"/login"} onClick={() => { sessionStorage.clear() }}><button className='small-button'>LOGIN</button></Link>
                        }
                    </Modal>
                    <Link to={"#"} onClick={openModal}><AiOutlineMenu /></Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='header'>
                <div className='header-left'>
                    {sessionStorage.getItem("user", user) != null &&
                        <Link to={"/home"}>
                            <img src="/Checkerboard.ico" alt="Checkers Logo" />
                        </Link>
                    }
                    {sessionStorage.getItem("user", user) == null &&
                        <Link to={"/"}>
                            <img src="/Checkerboard.ico" alt="Checkers Logo" />
                        </Link>
                    }
                </div>
                <div className='header-right'>
                    <Link to="/play">Play Game</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                    <Link to="/recordings">Game History</Link>
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
