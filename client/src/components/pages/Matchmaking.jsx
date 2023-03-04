import React from "react"
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"
import axios from "../../api/axios"

export default function Matchmaking() {
    const FIND_GAME_URL = process.env.REACT_APP_API_URL + "/games/findopengames"
    const QUERY_GAME_URL = process.env.REACT_APP_API_URL + "/games/read?id="
    const JOIN_GAME_URL = process.env.REACT_APP_API_URL + "/games/joingame?gameid="
    const DELETE_GAME_URL = process.env.REACT_APP_API_URL + "/games/cleanup?id="

    const [searching, setSearching] = React.useState(true)
    const [gameData, setGameData] = React.useState(undefined)

    const delay = ms => new Promise(res => setTimeout(res, ms))

    React.useEffect(() => {
        async function getGameAndJoin() {
            let localGameData = undefined
            try {
                const response = await axios.get(FIND_GAME_URL,
                    {
                        headers: { "Content-Type": "application/json", 
                                "x-access-token": sessionStorage.getItem("accessToken")},
                        withCredentials: false
                    }
                )
                localGameData = response?.data?.games[0]
                setGameData(localGameData)
            } catch(err) {
                console.log(err?.response)
            }
            try {
                await axios.put(JOIN_GAME_URL + localGameData?.id + "&playerid=" + sessionStorage.getItem("userID"),
                    { params: { gameid: localGameData?.id, playerid: sessionStorage.getItem("userID") } },
                    {
                        headers: { "Content-Type": "application/json", 
                                   "x-access-token": sessionStorage.getItem("accessToken")},
                        withCredentials: false
                    }
                )
            } catch(err) {
                console.log(err?.response)
            }
        }
        getGameAndJoin()
    }, [])

    React.useEffect(() => {
        if (gameData !== undefined && searching) {
            const queryGame = async () => {
                console.log("will query game in 30 seconds")
                await delay(30000)
                try {
                    const response = await axios.get(QUERY_GAME_URL + gameData?.id,
                        {
                            headers: { "Content-Type": "application/json", 
                                    "x-access-token": sessionStorage.getItem("accessToken")},
                            withCredentials: false
                        }
                    )
                    setGameData(response?.data)
                } catch(err) {
                    console.log(err?.response)
                }
            }
            queryGame()
            console.log("game query complete")
            if (gameData.player1 !== null && gameData.player2 !== null) {
                setSearching(false)
            }
        }
    })


    // handle leaving the page
    async function leavingPageEvent() {
        try {
            await axios.delete(DELETE_GAME_URL + sessionStorage.getItem("userID"),
                {
                    headers: { "Content-Type": "application/json", 
                               "x-access-token": sessionStorage.getItem("accessToken")},
                    withCredentials: false
                }
            )
        } catch(err) {
            console.log(err?.response)
        }
    }

    const links = document.getElementsByTagName("a")

    React.useEffect(() => {
        for (let link of links) {
            link.addEventListener('click', leavingPageEvent, false)
        }
        window.addEventListener('beforeunload', leavingPageEvent)
    }, [])



    if (searching) {
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