import React from "react"
import Header from '../Header'
import Footer from '../Footer'
import Checkers from "../checkers/Checkers"
import axios from "../../api/axios"

export default function Matchmaking() {
    const [searching, setSearching] = React.useState(true)
    const [gameData, setGameData] = React.useState(undefined)
    const [color, setColor] = React.useState(undefined)
    const [oppName, setOppName] = React.useState(undefined)
    const [oppUUID, setOppUUID] = React.useState(undefined)
    const [rerenderQuery, setRerenderQuery] = React.useState(0)
    const [rerenderFindGame, setRerenderFindGame] = React.useState(0)
    const [rerenderJoinGame, setRerenderJoinGame] = React.useState(0)

    // Set interval for query checking for opponenet --- 10000 = 10 seconds
    React.useEffect(() => {
        if (searching) {
            let interval = null
            interval = setInterval(() => {
                setRerenderQuery(rerenderQuery => rerenderQuery + 1)
        }, 10000)
        return () => clearInterval(interval)
        }
    }, [rerenderQuery])

    // Set interval after page loads to find a game --- 3000 = 3 second
    // This prevents the requests from submitting twice due to React.Strict
    React.useEffect(() => {
        if (rerenderFindGame < 1) {
            let interval = null
            interval = setInterval(() => {
                setRerenderFindGame(rerenderFindGame => rerenderFindGame + 1)
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [rerenderFindGame])

    // Set interval after page loads to join the game -- 3000 = 3 seconds
    // This prevents the requests from submitting twice due to React.Strict
    React.useEffect(() => {
        if (rerenderJoinGame < 1) {
            let interval = null
            interval = setInterval(() => {
                setRerenderJoinGame(rerenderJoinGame => rerenderJoinGame + 1)
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [rerenderJoinGame])

    // Find a game to join
    React.useEffect(() => {
        if (rerenderFindGame > 0) {
            const findGame = async () => {
                try {
                    const response = await axios.get("/games/findopengames",
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": sessionStorage.getItem("accessToken")
                            },
                            withCredentials: false
                        }
                    )
                    setGameData(response.data.games[0] !== undefined ? response.data.games[0] : response.data.games)
                } catch (err) {
                    console.log(err?.response)
                    setRerenderFindGame(0)
                }
            }
            findGame()
        }
    }, [rerenderFindGame])

    // Join a game
    React.useEffect(() => {
        if (rerenderJoinGame > 0) {
            const joinGame = async () => {
                try {
                    await axios.put("/games/joingame?gameid=" + gameData.id + "&playerid=" + sessionStorage.getItem("userID"),
                        { params: { gameid: gameData.id, playerid: sessionStorage.getItem("userID") } },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": sessionStorage.getItem("accessToken")
                            },
                            withCredentials: false
                        }
                    )
                } catch (err) {
                    console.log(err?.response)
                    setRerenderJoinGame(0)
                }
            }
            joinGame()
        }
    }, [rerenderJoinGame])

    // Query game to see if another player has joined yet
    React.useEffect(() => {
        if (gameData !== undefined && searching) {
            const queryGame = async () => {
                try {
                    const response = await axios.get("/games/read?gameid=" + gameData?.id,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": sessionStorage.getItem("accessToken")
                            },
                            withCredentials: false
                        }
                    )
                    setColor(response?.data.player1 === sessionStorage.getItem("userID") ? 0 : 1)
                    if (response?.data.player1 !== null && response?.data.player2 !== null) {
                        const oppUUID = response?.data.player1 === sessionStorage.getItem("userID") ? response?.data.player2 : response?.data.player1
                        setOppUUID(oppUUID)
                        try {
                            const response = await axios.get("/users/readid?playerid=" + oppUUID,
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                        "x-access-token": sessionStorage.getItem("accessToken")
                                    },
                                    withCredentials: false
                                }
                            )
                                setOppName(response?.data.username)
                                setSearching(false)
                        } catch (err) {
                            console.log(err?.response)
                        }
                    }
                } catch (err) {
                    console.log(err?.response)
                }
            }
            queryGame()
        }
    }, [rerenderQuery])

    // handle leaving the page
    async function leavingPageEvent() {
        try {
            await axios.delete("/games/cleanup?playerid=" + sessionStorage.getItem("userID"),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
            window.removeEventListener('beforeunload', leavingPageEvent)
        } catch (err) {
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


    // HTML to render on the page
    if (rerenderFindGame < 1) {
        return (
            <div>
                <Header />
                <div className='content-wrap'>
                    <br />
                    <br />
                    <br />
                    <div><h2>Searching For Game</h2></div>
                </div>
                <Footer />
            </div>
        )
    } else if (searching) {
        return (
            <div>
                <Header />
                <div className='content-wrap'>
                    <br />
                    <br />
                    <br />
                    <div><h2>Searching For Opponent</h2></div>
                    <div>Checking if someone is on the other end every 10 seconds. Checked {rerenderQuery} times.</div>
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Checkers gameMode={1} difficulty={0} gameID={gameData.id} color={color} oppUUID={oppUUID} />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}