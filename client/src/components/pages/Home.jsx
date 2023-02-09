import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import TempNav from "../TempNav"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <p>This will be the homepage!</p>
                <br></br>
                <br></br>
                <TempNav />
            </div>
            <Footer />
        </div>
    )
}

export default Home