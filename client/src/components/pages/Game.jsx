import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"

const Game = () => {

    const [color, setColor] = React.useState(undefined)

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
                    <button onClick={setColorRed}>Play as Red</button>
                    <button onClick={setColorBlack}>Play as Black</button>
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