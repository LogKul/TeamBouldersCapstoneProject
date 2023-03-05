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
    const [color, setColor] = React.useState(undefined)
    const [oppName, setOppName] = React.useState(undefined)

    const delay = ms => new Promise(res => setTimeout(res, ms))

    React.useEffect(() => {
        if (gameData === undefined) {
            const getGameAndJoin = async () => {
                let localGameData = undefined
                try {
                    const response = await axios.get(FIND_GAME_URL,
                        {
                            headers: { "Content-Type": "application/json", 
                                    "x-access-token": sessionStorage.getItem("accessToken")},
                            withCredentials: false
                        }
                    )
                    console.log(response)
                    localGameData = response?.data?.games[0]
                    setGameData(localGameData)
                } catch(err) {
                    console.log(err?.response)
                }
                try {
                    const response = await axios.put(JOIN_GAME_URL + localGameData?.id + "&playerid=" + sessionStorage.getItem("userID"),
                        { params: { gameid: localGameData?.id, playerid: sessionStorage.getItem("userID") } },
                        {
                            headers: { "Content-Type": "application/json", 
                                    "x-access-token": sessionStorage.getItem("accessToken")},
                            withCredentials: false
                        }
                    )
                    console.log(response)
                } catch(err) {
                    console.log(err?.response)
                }
            }
            getGameAndJoin()
        }
    }, [])

    React.useEffect(() => {
        if (gameData !== undefined && searching) {
            const queryGame = async () => {
                let localGameData = undefined
                await delay(30000)
                try {
                    const response = await axios.get(QUERY_GAME_URL + gameData?.id,
                        {
                            headers: { "Content-Type": "application/json", 
                                    "x-access-token": sessionStorage.getItem("accessToken")},
                            withCredentials: false
                        }
                    )
                    localGameData = response?.data
                    setGameData(localGameData)
                } catch(err) {
                    console.log(err?.response)
                }
                if (localGameData.player1 === sessionStorage.getItem("userID")) {
                    setColor(0)
                    setOppName(localGameData.player2)
                } else {
                    setColor(1)
                    setOppName(localGameData.player1)
                }
            }
            queryGame()
            console.log("game query completed after 30 seconds")
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
                <p>Playing Online against {oppName}</p>
                <p>Game Id: {gameData.id}</p>
                <p>Your color: {color}</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Checkers gameMode={1} difficulty={0} gameID={gameData.id} color={color} />
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}