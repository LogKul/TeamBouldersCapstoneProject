import { useState } from "react"
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"

export default function Matchmaking() {
    const [searching, setSearching] = useState(false)

    if (searching) {
        // do some searching function here
        return (
            <div>
            <Header />
            <div className='content-wrap'>
                Searching for Opponent
            </div>
            <Footer />
            </div>
        )
    } else {
        // load the checkers engine with online props passed through
        return (
            <div>
            <Header />
            <div className='content-wrap'>
                <p>Playing Online</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Checkers gameMode={0} difficulty={0} gameID={0} color={0} />
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}