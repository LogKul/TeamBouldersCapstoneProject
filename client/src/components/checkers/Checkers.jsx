import React from "react"
import PropTypes from "prop-types"
import Tile from "./tile/Tile"
import "./Checkers.scss"
import Logic from "./logic/Logic"
import Opponent from "./logic/Opponent"
import Modal from "../Modal"
import AILogic from "./logic/AILogic"
import useSound from "use-sound"
import grabSFX from "../../sfx/pickup.mp3"
import dropSFX from "../../sfx/put-down.mp3"
import captureSFX from "../../sfx/capture.mp3"
import enemySFX from "../../sfx/enemy.mp3"
import crownSFX from "../../sfx/crown.mp3"
import victorySFX from "../../sfx/victory.mp3"
import gameOverSFX from "../../sfx/game-over.mp3"

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

    const playerColor = props.color
    const oppColor = props.color === 1 ? 0 : 1

    const [activePiece, setActivePiece] = React.useState(undefined)
    const [boardState, setBoardState] = React.useState(initialBoardState)
    const [gridX, setGridX] = React.useState()
    const [gridY, setGridY] = React.useState()
    const [continuedAttack, setContinuedAttack] = React.useState(false)
    const [moveAgainText, setMoveAgainText] = React.useState("---")
    const [currentTurn, setCurrentTurn] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)
    const gameOverRef = React.useRef()
    gameOverRef.current = gameOver
    const [rerender, setRerender] = React.useState(0)
    const [renderUnload, setRenderUnload] = React.useState(0)
    const [playerMoved, setPlayerMoved] = React.useState(false)
    const [oppMoved, setOppMoved] = React.useState(false)
    const [abandon, setAbandon] = React.useState(false)
    const abandonRef = React.useRef()
    abandonRef.current = abandon
    const [winner, setWinner] = React.useState(false)
    const [gameOverCondition, setGameOverCondition] = React.useState("")
    const [timeoutCounter, setTimeoutCounter] = React.useState(0)
    const [timeRemaining, setTimeRemaining] = React.useState(playerColor === 0 ? 60 : 600)
    const [moveCounter, setMoveCounter] = React.useState(0)
    const [turnDisplay, setTurnDisplay] = React.useState("Red")
    const checkersBoardRef = React.useRef(null)
    const logic = new Logic()
    const opponent = new Opponent()

    //SFX
    const [playPickupSFX] = useSound(
        grabSFX
    )

    const [playDropSFX] = useSound(
        dropSFX
    )

    const [playCaptureSFX] = useSound(
        captureSFX
    )

    const [playEnemySFX] = useSound(
        enemySFX,
        { volume: 0.4 }
    )

    const [playCrownSFX] = useSound(
        crownSFX
    )

    const [playVictorySFX] = useSound(
        victorySFX,
        { volume: 0.75 }
    )

    const [playGameOverSFX] = useSound(
        gameOverSFX,
        { volume: 0.75 }
    )

    const grabPiece = (e) => {

        const element = e.target
        const checkersBoard = checkersBoardRef.current

        if (element.classList.contains("checkers-piece") && checkersBoard) {

            if (playerColor === 0) {
                setGridX(Math.floor((e.clientY - checkersBoard.offsetTop + window.scrollY) / ((1/8) * checkersBoard.offsetHeight)))
                setGridY(Math.floor((e.clientX - checkersBoard.offsetLeft + window.scrollX) / ((1/8) * checkersBoard.offsetWidth)))
            } else {
                setGridX(7 - (Math.floor((e.clientY - checkersBoard.offsetTop + window.scrollY) / ((1/8) * checkersBoard.offsetHeight))))
                setGridY(7 - (Math.floor((e.clientX - checkersBoard.offsetLeft + window.scrollX) / ((1/8) * checkersBoard.offsetWidth))))
            }

            const x = e.clientX + window.scrollX - ((1/16) * checkersBoard.offsetWidth)
            const y = e.clientY + window.scrollY - ((1/16) * checkersBoard.offsetHeight)

            element.style.position = "absolute"
            element.style.left = x + 'px'
            element.style.top = y + 'px'

            setActivePiece(element)
            playPickupSFX()
        }
    }

    const movePiece = (e) => {

        const checkersBoard = checkersBoardRef.current

        if (activePiece && checkersBoard) {
            const minX = checkersBoard.offsetLeft - ((1/32) * checkersBoard.offsetWidth)
            const minY = checkersBoard.offsetTop - ((1/32) * checkersBoard.offsetHeight)
            const maxX = checkersBoard.offsetLeft + checkersBoard.offsetWidth - ((1/10) * checkersBoard.offsetWidth)
            const maxY = checkersBoard.offsetTop + checkersBoard.offsetHeight - ((1/10) * checkersBoard.offsetHeight)

            const x = e.clientX + window.scrollX - ((1/16) * checkersBoard.offsetWidth)
            const y = e.clientY + window.scrollY - ((1/16) * checkersBoard.offsetHeight)

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

            let x = Math.floor((e.clientY - checkersBoard.offsetTop + window.scrollY) / ((1/8) * checkersBoard.offsetHeight))
            let y = Math.floor((e.clientX - checkersBoard.offsetLeft + window.scrollX) / ((1/8) * checkersBoard.offsetWidth))

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
                                setMoveCounter(moveCounter + 1)
                                if (gridX === (x + 2)) {
                                    if (gridY === (y + 2)) {
                                        removeX = x + 1
                                        removeY = y + 1
                                        spliceVal = 1
                                        playCaptureSFX()
                                    } else {
                                        removeX = x + 1
                                        removeY = y - 1
                                        spliceVal = 1
                                        playCaptureSFX()
                                    }
                                } else if (gridX === (x - 2)) {
                                    if (gridY === (y + 2)) {
                                        removeX = x - 1
                                        removeY = y + 1
                                        spliceVal = 1
                                        playCaptureSFX()
                                    } else {
                                        removeX = x - 1
                                        removeY = y - 1
                                        spliceVal = 1
                                        playCaptureSFX()
                                    }
                                }
                                if (p.color === 0) {
                                    if (x === 0) {
                                        if (p.king === false) {
                                            p.image = "/assets/checkers/red-king.svg"
                                            p.king = true 
                                            playCrownSFX()
                                        }
                                        allowMove = false
                                    }
                                } else {
                                    if (x === 7) {
                                        if (p.king === false) {
                                            p.image = "/assets/checkers/black-king.svg"
                                            p.king = true
                                            playCrownSFX()
                                        }
                                        allowMove = false
                                    }
                                }
                                p.x = x
                                p.y = y
                                if ((gridX === (x + 2) || gridX === (x - 2)) && logic.additionalMoveExists(x, y, gridX, gridY, p.color, p.king, value) && allowMove) {
                                    setContinuedAttack(true)
                                    setMoveAgainText("**You must jump the next piece.**")
                                } else {
                                    setContinuedAttack(false)
                                    setMoveAgainText("---")
                                    playerColor === 0 ? setTurnDisplay("Black") : setTurnDisplay("Red")
                                    setCurrentTurn(currentTurn === 0 ? 1 : 0)
                                    moved = true
                                }
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
            }
            setActivePiece(undefined)
            playDropSFX()
        }
    }

    // handle piece position when mouse button is released
    // KNOWN BUG: after removing top and left property sometimes the property does not come back to the element causing the piece to not be able to be moved
    var activeElement = undefined

    React.useEffect(() => {
        document.body.onmousedown = function(e) {
            activeElement = e.target
        }
        document.body.onmouseup = function() {
            setActivePiece(undefined)
            if (activeElement.className === "checkers-piece") {
                activeElement.style.position = "absolute"
                activeElement.style.removeProperty("top")
                activeElement.style.removeProperty("left")
            }
        }
    }, [])

    let board = []

    //count down time left to make a move before forfeiting
    React.useEffect(() => {
        let interval = null
        if (timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(timeRemaining => timeRemaining - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
        if (timeRemaining === 0) {
            setMoveCounter(moveCounter + 1)
        }
    }, [timeRemaining])

    // GAMEOVER CHECK: check to see if there are any pieces left on the board or that a player can move a piece
    React.useEffect(() => {
        if (gameOver === false) {
            let bCount = 0
            let rCount = 0
            let possiblePlayerMoves = []
            let possibleOpponentMoves = []
            const aiLogic = new AILogic()

            boardState?.forEach(p => {
                if (p.color === 0) {
                    rCount += 1
                }
                if (p.color === 1) {
                    bCount += 1
                }
                if (p.color === playerColor) {
                    const playerMove = aiLogic.findPossibleMove(p.x, p.y, playerColor, p.king, boardState, continuedAttack)
                    if (playerMove !== undefined) {
                        possiblePlayerMoves.push(playerMove)
                    }
                } else {
                    const oppMove = aiLogic.findPossibleMove(p.x, p.y, p.color, p.king, boardState, false)
                    if (oppMove !== undefined) {
                        possibleOpponentMoves.push(oppMove)
                    }
                }
            })
            if (possiblePlayerMoves.length === 0 && bCount > 0 && rCount > 0) {
                setGameOverTrue(false)
                setModalIsOpen(true)
                setGameOver(true)
                playGameOverSFX()
                setGameOverCondition("You have no remaining moves.")
                if (props.gameMode === 1) {
                    opponent.updateMMR(props.oppData, false)
                }
            }
            if (possibleOpponentMoves.length === 0 && bCount > 0 && rCount > 0) {
                setGameOverTrue(true)
                setModalIsOpen(true)
                setGameOver(true)
                playVictorySFX()
                setGameOverCondition("Your opponent has no remaining moves.")
                if (props.gameMode === 1) {
                    opponent.updateMMR(props.oppData, true)
                    opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                }
            }

            if (bCount === 0 || rCount === 0) {
                if (playerColor === 0) {
                    if (bCount === 0) {
                        if (props.gameMode === 1) {
                            opponent.updateMMR(props.oppData, true)
                            opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                        }
                        setGameOverCondition("Your opponent has no remaining pieces.")
                        setGameOverTrue(true)
                        setWinner(true)
                        playVictorySFX()
                    } else {
                        if (props.gameMode === 1) {
                            opponent.updateMMR(props.oppData, false)
                        }
                        setGameOverCondition("You have no remaining pieces.")
                        setGameOverTrue(false)
                        playGameOverSFX()
                    }
                } else {
                    if (rCount === 0) {
                        if (props.gameMode === 1) {
                            opponent.updateMMR(props.oppData, true)
                            opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                        }
                        setGameOverCondition("Your opponent has no remaining pieces.")
                        setGameOverTrue(true)
                        setWinner(true)
                        playVictorySFX()
                    } else {
                        if (props.gameMode === 1) {
                            opponent.updateMMR(props.oppData, false)
                        }
                        setGameOverCondition("You have no remaining pieces.")
                        setGameOverTrue(false)
                        playGameOverSFX()
                    }
                }
            }
        }
        if (props.gameMode === 1 && timeRemaining === 0 && gameOver === false) {
            opponent.forfeitGame(props.gameID, props.oppData)
            setGameOverCondition("You did not play a move in time.")
            setGameOverTrue(false)
        }
    }, [moveCounter])

    const delay = ms => new Promise(res => setTimeout(res, ms))
    
    // get response from other player only if 5 seconds have passed OR get response from ai if 1 second has passed
    React.useEffect(() => {
        if (currentTurn !== playerColor && gameOver === false && props.gameMode === 1 && renderUnload > 0) {
            if (timeoutCounter > 30) {
                if (playerMoved === false || oppMoved === false) {
                    setModalIsOpen(true)
                    setAbandon(true)
                } else {
                    opponent.updateMMR(props.oppData, true)
                    opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                    setGameOverCondition("Your opponent forfeited the game.")
                    setGameOverTrue(true)
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
                    setGameOverCondition("Your opponent forfeited the game.")
                    setGameOverTrue(true)
                } else if (oppBoardState === "loser") {
                    opponent.updateMMR(props.oppData, false)
                    setGameOverTrue(false)
                } else if (oppBoardState !== "") {
                    if (JSON.stringify(oppBoardState) !== JSON.stringify(boardState)) {
                        setOppMoved(true)
                        playEnemySFX()
                        playerColor === 0 ? setTurnDisplay("Red") : setTurnDisplay("Black")
                        setTimeRemaining(60)
                        setMoveCounter(moveCounter + 1)
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
        } else if (currentTurn !== playerColor && gameOver === false && props.gameMode === 0 && renderUnload > 0) {
            const getAIMove = async () => {
                await delay(1000)
                const oppBoardState = opponent.generateResponse(props.difficulty, boardState, oppColor)
                if (oppBoardState !== undefined) {
                    setMoveCounter(moveCounter + 1)
                    setBoardState(oppBoardState)
                    setCurrentTurn(playerColor)
                    playerColor === 0 ? setTurnDisplay("Red") : setTurnDisplay("Black")
                    playEnemySFX()
                } else {
                    setGameOverTrue(true)
                }
            }
            getAIMove()
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
                setRerender(1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [renderUnload])

    // handle cleanup if game is closed
    function internalNavigation(event) {
        window.location = event.target.getAttribute('href')
    }

    async function externalNaviEarly() {
        if (gameOverRef.current === false && abandonRef.current === false) {
            await opponent.abandonGame(props.gameID)
        }
    }

    async function externalNaviLate() {
        if (gameOverRef.current === false && abandonRef.current === false) {
            await opponent.forfeitGame(props.gameID, props.oppData)
            setGameOverCondition("You forfeited the game.")
            setGameOverTrue(false)
        }
    }

    function setGameOverTrue(winner) {
        setWinner(winner)
        setModalIsOpen(true)
        setGameOver(true)
    }

    // apply leavingPageEvent event to all links on page or if page closes/reloads/changes site
    //KNOWN BUG: cleanup code to does apply a loss to someone who leaves consistently
    React.useEffect(() => {
        if (renderUnload > 0 && props.gameMode === 1 && gameOver === false) {
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
                    <h4>{gameOverCondition}</h4>
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
                    <h4>{gameOverCondition}</h4>
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
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h4 style={{paddingBottom: 0 + 'px', paddingTop: 0 + 'px'}}>{turnDisplay}&apos;s Turn</h4>
                <h5 style={{paddingBottom: 0 + 'px', paddingTop: 0 + 'px'}}>{moveAgainText}</h5>
                <h5 style={{paddingBottom: 0 + 'px', paddingTop: 0 + 'px'}}>Time Remaining to Move: {timeRemaining}</h5>
                <div
                    onMouseMove={e => movePiece(e)}
                    onMouseDown={e => grabPiece(e)}
                    onMouseUp={e => dropPiece(e)}
                    id="board"
                    ref={checkersBoardRef}>
                    {board}
                </div>
                <button onClick={externalNaviLate}>Forfeit</button>
            </>
        )
    } else if (props.gameMode === 1 && currentTurn !== playerColor) {
        return (
            <>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h4 style={{paddingBottom: 0 + 'px', paddingTop: 0 + 'px'}}>{turnDisplay}&apos;s Turn</h4>
                <h5 style={{paddingBottom: 0 + 'px', paddingTop: 0 + 'px'}}>{moveAgainText}</h5>
                <h5 style={{paddingBottom: 0 + 'px', paddingTop: 0 + 'px'}}>Waiting for your opponent to move.</h5>
                <div
                    onMouseMove={e => movePiece(e)}
                    onMouseDown={e => grabPiece(e)}
                    onMouseUp={e => dropPiece(e)}
                    id="board"
                    ref={checkersBoardRef}>
                    {board}
                </div>
                <button onClick={externalNaviLate}>Forfeit</button>
            </>
        )
    } else {
        return (
            <>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h4 style={{paddingBottom: 0 + 'px', paddingTop: 0 + 'px'}}>{turnDisplay}&apos;s Turn</h4>
                <h5 style={{paddingBottom: 0 + 'px', paddingTop: 0 + 'px'}}>{moveAgainText}</h5>
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
}

Checkers.propTypes = {
    gameMode: PropTypes.number,
    difficulty: PropTypes.number,
    gameID: PropTypes.string,
    color: PropTypes.number
}