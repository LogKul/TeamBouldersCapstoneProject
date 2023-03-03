import React from "react"
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"
import axios from "../../api/axios"

export default function Matchmaking() {
    const [searching, setSearching] = React.useState(false)

    const REQUEST_URL = process.env.REACT_APP_API_URL + "/games/findopengames"

    const getGames = async () => {
        try {
            const response = await axios.get(REQUEST_URL,
                {
                    headers: { "Content-Type": "application/json", 
                               "x-access-token": sessionStorage.getItem("accessToken"),},
                    withCredentials: false
                }
            )
            console.log(response)
        } catch(err) {
            console.log(err?.response)
        }
    }

    React.useEffect(() => {
        getGames()
        setSearching(false)
    }, [])

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