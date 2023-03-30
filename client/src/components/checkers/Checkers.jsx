import { useRef, useState, useEffect } from "react"
import Tile from "./tile/Tile"
import "./checkers.css"
import Logic from "./logic/Logic"
import Opponent from "./logic/Opponent"
import Modal from "../Modal"

export default function Checkers(props) {
    const initialBoardState = []

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j + 1) % 2 === 0 && i < 3) {
                initialBoardState.push({ image: "/assets/checkers/black-checker.svg", x: i, y: j, color: 1, king: false })
            }
            if ((i + j + 1) % 2 === 0 && i > 4) {
                initialBoardState.push({ image: "/assets/checkers/red-checker.svg", x: i, y: j, color: 0, king: false })
            }
        }
    }

<<<<<<< HEAD
    const [activePiece, setActivePiece] = useState(undefined)
    const [boardState, setBoardState] = useState(initialBoardState)
    const [gridX, setGridX] = useState()
    const [gridY, setGridY] = useState()
    const [continuedAttack, setContinuedAttack] = useState(false)
    const [currentTurn, setCurrentTurn] = useState(0)
    const [playerColor, setPlayerColor] = useState(1) // get from props
    const [oppColor, setOppColor] = useState(0) // get from props
    const [gameID, setGameID] = useState(0) // get from props if game is online
    const [gameOver, setGameOver] = useState(false)
    const checkersBoardRef = useRef(null)
=======
    const playerColor = props.color
    const oppColor = props.color === 1 ? 0 : 1

    const [activePiece, setActivePiece] = React.useState(undefined)
    const [boardState, setBoardState] = React.useState(initialBoardState)
    const [gridX, setGridX] = React.useState()
    const [gridY, setGridY] = React.useState()
    const [continuedAttack, setContinuedAttack] = React.useState(false)
    const [currentTurn, setCurrentTurn] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)
    const [rerender, setRerender] = React.useState(0)
    const [renderUnload, setRenderUnload] = React.useState(0)
    const [playerMoved, setPlayerMoved] = React.useState(false)
    const [oppMoved, setOppMoved] = React.useState(false)
    const [abandon, setAbandon] = React.useState(false)
    const [winner, setWinner] = React.useState(false)
    const [timeoutCounter, setTimeoutCounter] = React.useState(0)
    const [timeRemaining, setTimeRemaining] = React.useState(playerColor === 0 ? 60 : 600)
    const checkersBoardRef = React.useRef(null)
>>>>>>> 77edc9824c8146e8d6f12eb0617a13278f0e8786
    const logic = new Logic()
    const opponent = new Opponent()

    const grabPiece = (e) => {

        const element = e.target
        const checkersBoard = checkersBoardRef.current

        if (element.classList.contains("checkers-piece") && checkersBoard) {
            if (playerColor === 0) {
                setGridX(Math.floor((e.clientY - checkersBoard.offsetTop) / 100))
                setGridY(Math.floor((e.clientX - checkersBoard.offsetLeft) / 100))
            } else {
                setGridX(7 - (Math.floor((e.clientY - checkersBoard.offsetTop) / 100)))
                setGridY(7 - (Math.floor((e.clientX - checkersBoard.offsetLeft) / 100)))
            }

            const x = e.clientX - 25
            const y = e.clientY - 25

            element.style.position = "absolute"
            element.style.left = x + 'px'
            element.style.top = y + 'px'

            setActivePiece(element)
        }
    }

    const movePiece = (e) => {

        const checkersBoard = checkersBoardRef.current

        if (activePiece && checkersBoard) {
            const minX = checkersBoard.offsetLeft
            const minY = checkersBoard.offsetTop
            const maxX = checkersBoard.offsetLeft + checkersBoard.clientWidth - 50
            const maxY = checkersBoard.offsetTop + checkersBoard.clientHeight - 50
            const x = e.clientX - 25
            const y = e.clientY - 25

            activePiece.style.position = "absolute"

            if (x < minX) {
                activePiece.style.left = minX + "px"
            } else if (x > maxX) {
                activePiece.style.left = maxX + "px"
            } else {
                activePiece.style.left = x + "px"
            }

            if (y < minY) {
                activePiece.style.top = minY + "px"
            } else if (y > maxY) {
                activePiece.style.top = maxY + "px"
            } else {
                activePiece.style.top = y + "px"
            }
        }
    }

    const dropPiece = (e) => {

        const checkersBoard = checkersBoardRef.current

        if (activePiece && checkersBoard) {
            let x = Math.floor((e.clientY - checkersBoard.offsetTop) / 100)
            let y = Math.floor((e.clientX - checkersBoard.offsetLeft) / 100)

            if (playerColor === 1) {
                x = 7 - x
                y = 7 - y
            }

            if (currentTurn === playerColor) {
                var removeX = 0
                var removeY = 0
                var spliceVal = 0
                var moved = false
                var allowMove = true


                setBoardState((value) => {
                    const newBoardState = value.map((p) => {
                        if (p.x === gridX && p.y === gridY) {
                            if (logic.isValidMove(gridX, gridY, x, y, p.color, p.king, currentTurn, value, continuedAttack)) {
                                if (gridX === (x + 2)) {
                                    if (gridY === (y + 2)) {
                                        removeX = x + 1
                                        removeY = y + 1
                                        spliceVal = 1
                                    } else {
                                        removeX = x + 1
                                        removeY = y - 1
                                        spliceVal = 1
                                    }
                                } else if (gridX === (x - 2)) {
                                    if (gridY === (y + 2)) {
                                        removeX = x - 1
                                        removeY = y + 1
                                        spliceVal = 1
                                    } else {
                                        removeX = x - 1
                                        removeY = y - 1
                                        spliceVal = 1
                                    }
                                }
                                if (p.color === 0) {
                                    if (x === 0) {
                                        p.image = "/assets/checkers/red-king.png"
                                        p.king = true
                                        allowMove = false
                                    }
                                } else {
                                    if (x === 7) {
                                        p.image = "/assets/checkers/black-king.png"
                                        p.king = true
                                        allowMove = false
                                    }
                                }
                                p.x = x
                                p.y = y
                                if (gridX === (x + 2) || gridX === (x - 2)) {
                                    if (logic.additionalMoveExists(x, y, gridX, gridY, p.color, p.king, value) && allowMove) {
                                        setContinuedAttack(true)
                                    } else {
                                        setContinuedAttack(false)
                                        moved = true
                                        if (currentTurn === 0) {
                                            setCurrentTurn(1)
                                        } else {
                                            setCurrentTurn(0)
                                        }
                                    }
                                } else {
                                    if (currentTurn === 0) {
                                        setCurrentTurn(1)
                                        moved = true
                                    } else {
                                        setCurrentTurn(0)
                                        moved = true
                                    }
                                }
                            } else {
                                activePiece.style.position = "relative"
                                activePiece.style.removeProperty("top")
                                activePiece.style.removeProperty("left")
                            }
                        }
                        return p
                    })
                    const index = newBoardState.indexOf(newBoardState.find((p) => p.x === removeX && p.y === removeY))
                    newBoardState.splice(index, spliceVal)
                    if (props.gameMode === 1 && moved) {
                        opponent.sendResponse(newBoardState, props.gameID)
                        setPlayerMoved(true)
                        setTimeRemaining(600)
                        if (playerMoved && oppMoved && renderUnload !== 2) {
                            setRenderUnload(2)
                        }
                    }
                    setRerender(rerender === 0 ? 1 : 0)
                    return newBoardState
                })
            } else {
                activePiece.style.position = "relative"
                activePiece.style.removeProperty("top")
                activePiece.style.removeProperty("left")
            }
            setActivePiece(undefined)
        }
    }

    let board = []

    const [seconds, setSeconds] = useState(0)
    var timer

    // timer to be used for preventing a move from ai to occur every 5 seconds
    // can be changed to async and await
    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1)
        }, 1000)
        return () => clearInterval(timer)
    })

    //time left to make a move before forfeiting
    React.useEffect(() => {
        let interval = null
        if (timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(timeRemaining => timeRemaining - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timeRemaining])

    // GAMEOVER CHECK: check to see if there are any pieces left on the board
    // NEED TO ADD: check to see if there are any moves left for player
    React.useEffect(() => {
        if (gameOver === false) {
            let bCount = 0
            let rCount = 0

            boardState?.forEach(p => {
                if (p.color === 0) {
                    rCount += 1
                }
                if (p.color === 1) {
                    bCount += 1
                }
            })

            if (bCount === 0 || rCount === 0) {
                if (playerColor === 0) {
                    if (bCount === 0) {
                        if (props.gameMode === 1) {
                            opponent.updateMMR(props.oppData, true)
                            opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                        }
                        setWinner(true)
                    } else {
                        opponent.updateMMR(props.oppData, false)
                    }
                } else {
                    if (rCount === 0) {
                        if (props.gameMode === 1) {
                            opponent.updateMMR(props.oppData, true)
                            opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                        }
                        setWinner(true)
                    } else {
                        opponent.updateMMR(props.oppData, false)
                    }
                }
                setModalIsOpen(true)
                setGameOver(true)
            }
        }
        if (props.gameMode === 1 && timeRemaining === 0 && gameOver === false) {
            opponent.updateMMR(props.oppData, false)
            opponent.forfeitGame(props.gameID, sessionStorage.getItem("userID"))
            setModalIsOpen(true)
            setGameOver(true)
        }
    })

<<<<<<< HEAD
    // get response from ai or other player only if 5 seconds have passed
    // should be changed to async and await
    useEffect(() => {
        if (currentTurn !== playerColor && gameOver === false) {
            if (seconds >= 5) {
                setSeconds(0)
                setBoardState(opponent.generateResponse(props.gameMode, props.difficulty, boardState, oppColor))
                setCurrentTurn(playerColor)
            }
=======

    const delay = ms => new Promise(res => setTimeout(res, ms))

    
    // get response from ai or other player only if 5 seconds have passed
    React.useEffect(() => {
        if (currentTurn !== playerColor && gameOver === false && props.gameMode === 1) {
            //opponent has 5*5 seconds to make a move or game will be forfeit/abandon
            if (timeoutCounter > 20) {
                if (playerMoved === false || oppMoved === false) {
                    setModalIsOpen(true)
                    setAbandon(true)
                } else {
                    opponent.updateMMR(props.oppData, true)
                    opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                    setWinner(true)
                    setModalIsOpen(true)
                    setGameOver(true)
                }
            }
            const getResponse = async () => {
                await delay(5000)
                const oppBoardState = await opponent.queryResponse(boardState, props.gameID, sessionStorage.getItem("userID"))
                if (oppBoardState === "abandon") {
                    setModalIsOpen(true)
                    setAbandon(true)
                } else if (oppBoardState === "winner") {
                    opponent.updateMMR(props.oppData, true)
                    setModalIsOpen(true)
                    setWinner(true)
                    setGameOver(true)
                } else if (oppBoardState === "loser") {
                    opponent.updateMMR(props.oppData, false)
                    setModalIsOpen(true)
                    setGameOver(true)
                } else if (oppBoardState !== "") {
                    if (JSON.stringify(oppBoardState) !== JSON.stringify(boardState)) {
                        setOppMoved(true)
                        setTimeRemaining(60)
                        if (playerMoved && oppMoved && renderUnload !== 2) {
                            setRenderUnload(2)
                        }
                        setBoardState(oppBoardState)
                        setCurrentTurn(playerColor)
                        setTimeoutCounter(0)
                    } else {
                        setRerender(rerender === 0 ? 1 : 0)
                        setTimeoutCounter(timeoutCounter + 1)
                    }
                } else {
                    setRerender(rerender === 0 ? 1 : 0)
                    setTimeoutCounter(timeoutCounter + 1)
                }
            }
            getResponse()
        } else if (currentTurn !== playerColor && gameOver === false && props.gameMode === 0) {
            const oppBoardState = opponent.generateResponse(props.difficulty, boardState, oppColor)
            if (oppBoardState !== undefined) {
                setBoardState(oppBoardState)
                setCurrentTurn(playerColor)
            } else {
                setGameOver(true)
            }
        }
    }, [rerender])

    // build the board to be rendered with images and tiles
    // player color determines which direction to render the board
    if (playerColor === 0) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                let image = undefined

                boardState?.forEach(p => {
                    if (p.x === i && p.y === j) {
                        image = p.image
                    }
                })

                board.push(<Tile key={i.toString() + j.toString() + "propkey"} number={i + j + 1} piece={image} />)
            }
        }
    } else {
        for (let i = 7; i >= 0; i--) {
            for (let j = 7; j >= 0; j--) {

                let image = undefined

                boardState?.forEach(p => {
                    if (p.x === i && p.y === j) {
                        image = p.image
                    }
                })

                board.push(<Tile key={i.toString() + j.toString() + "propkey"} number={i + j + 1} piece={image} />)
            }
        }
    }

    //wait 1 second until after page loads to set beforeunload event listener to prevent duplicates
    React.useEffect(() => {
        let interval = null
        if (renderUnload < 1) {
            interval = setInterval(() => {
                setRenderUnload(1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [renderUnload])

    // handle cleanup if game is closed
    function internalNavigation(event) {
        //opponent.forfeitGame(props.gameID, sessionStorage.getItem("userID"))
        window.location = event.target.getAttribute('href')
    }

    async function externalNaviEarly() {
        await opponent.abandonGame(props.gameID)
        await delay(1000)
    }

    async function externalNaviLate() {
        await opponent.updateMMR(props.oppData, false)
        await opponent.forfeitGame(props.gameID, sessionStorage.getItem("userID"))
        await delay(1000)
    }

    // apply leavingPageEvent event to all links on page or if page closes/reloads/changes site
    React.useEffect(() => {
        if (renderUnload > 0 && props.gameMode === 1) {
            if (playerMoved === false || oppMoved === false) {
                const links = document.getElementsByTagName("a")
                
                for (let link of links) {
                    link.addEventListener('click', internalNavigation)
                }
                window.addEventListener('beforeunload', externalNaviEarly)
            } else {
                window.removeEventListener('beforeunload', externalNaviEarly)
                window.addEventListener('beforeunload', externalNaviLate)
            }
        }
        return () => window.removeEventListener('beforeunload', externalNaviEarly)
    }, [renderUnload])

    const [modalIsOpen, setModalIsOpen] = React.useState(false)

    function closeModal() {
        setModalIsOpen(false);
    }

    if (gameOver && winner) {
        return (
            <>
            <div>
                <h1>You won!</h1>
                <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                    <h1>You won!</h1>
                    <br/>
                    <a href="/Play"><button>Play Another</button></a>
                    <a href="/Home"><button>Return Home</button></a>
                </Modal>
            </div>
        </>
        )
    } else if (gameOver) {
        return (
            <>
            <div>
                <h1>You lost.</h1>
                <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                    <h1>You lost.</h1>
                    <br/>
                    <a href="/Play"><button>Play Another</button></a>
                    <a href="/Home"><button>Return Home</button></a>
                </Modal>
            </div>
        </>
        )
    } else if (abandon) {
        return (
            <>
            <div>
                <h3>Your Opponent Left. Try Playing Another!</h3>
                <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                    <h3>Your Opponent Left. Try Playing Another!</h3>
                    <br/>
                    <a href="/Play"><button>Play Another</button></a>
                    <a href="/Home"><button>Return Home</button></a>
                </Modal>
            </div>
        </>
        )
    } else if (props.gameMode === 1 && currentTurn === playerColor) {
        return (
            <>
                <div>Time Remaining to Move: {timeRemaining}</div>
                <div
                    onMouseMove={e => movePiece(e)}
                    onMouseDown={e => grabPiece(e)}
                    onMouseUp={e => dropPiece(e)}
                    id="board"
                    ref={checkersBoardRef}>
                    {board}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div
                    onMouseMove={e => movePiece(e)}
                    onMouseDown={e => grabPiece(e)}
                    onMouseUp={e => dropPiece(e)}
                    id="board"
                    ref={checkersBoardRef}>
                    {board}
                </div>
            </>
        )
    }
<<<<<<< HEAD
=======
}

Checkers.propTypes = {
    gameMode: PropTypes.number,
    difficulty: PropTypes.number,
    gameID: PropTypes.string,
    color: PropTypes.number
>>>>>>> 77edc9824c8146e8d6f12eb0617a13278f0e8786
}