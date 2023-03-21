import React from "react"
import PropTypes from "prop-types"
import Tile from "./tile/Tile"
import "./checkers.css"
import Logic from "./logic/Logic"
import Opponent from "./logic/Opponent"

export default function Checkers(props) {
    const initialBoardState = []

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j + 1) % 2 === 0 && i < 3) {
                initialBoardState.push({ image: "/assets/checkers/black-checker.png", x: i, y: j, color: 1, king: false })
            }
            if ((i + j + 1) % 2 === 0 && i > 4) {
                initialBoardState.push({ image: "/assets/checkers/red-checker.png", x: i, y: j, color: 0, king: false })
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
    const [currentTurn, setCurrentTurn] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)
    const [rerender, setRerender] = React.useState(0)
    const checkersBoardRef = React.useRef(null)
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
                                    }
                                } else {
                                    if (x === 7) {
                                        p.image = "/assets/checkers/black-king.png"
                                        p.king = true
                                    }
                                }
                                p.x = x
                                p.y = y
                                if (gridX === (x + 2) || gridX === (x - 2)) {
                                    if (logic.additionalMoveExists(x, y, gridX, gridY, p.color, p.king, value)) {
                                        setContinuedAttack(true)
                                    } else {
                                        setContinuedAttack(false)
                                        if (currentTurn === 0) {
                                            setCurrentTurn(1)
                                        } else {
                                            setCurrentTurn(0)
                                        }
                                    }
                                } else {
                                    if (currentTurn === 0) {
                                        setCurrentTurn(1)
                                    } else {
                                        setCurrentTurn(0)
                                    }
                                }
                                moved = true
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
                        //setRerender(rerender === 0 ? 1 : 0)
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

    // check to see if there are any pieces left on the board
    React.useEffect(() => {
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
            
            if (playerColor === 0 && props.gameMode === 1) {
                if (bCount === 0) {
                    opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                }
            } else {
                if (rCount === 0 && props.gameMode === 1) {
                    opponent.updateWinner(props.gameID, sessionStorage.getItem("userID"))
                }
            }
            setGameOver(true)
        }
    })


    const delay = ms => new Promise(res => setTimeout(res, ms))

    
    // get response from ai or other player only if 5 seconds have passed
    React.useEffect(() => {
        if (currentTurn !== playerColor && gameOver === false && props.gameMode === 1) {
            const getResponse = async () => {
                await delay(5000)
                const oppBoardState = await opponent.queryResponse(boardState, props.gameID)
                if (JSON.stringify(oppBoardState) !== JSON.stringify(boardState)) {
                    setBoardState(oppBoardState)
                    setCurrentTurn(playerColor)
                } else {
                    setRerender(rerender === 0 ? 1 : 0)
                }
            }
            getResponse()
        } else if (currentTurn !== playerColor && gameOver === false && props.gameMode === 0) {
            const oppBoardState = opponent.generateResponse(props.difficulty, boardState, oppColor)
            setBoardState(oppBoardState)
            setCurrentTurn(playerColor)
        }
    }, [rerender])

    // build the board to be rendered with images and tiles
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

    // handle cleanup if game is closed
    function leavingPageEvent() {
        console.log("leaving page event being handled...")
    }

    const links = document.getElementsByTagName("a")

    // apply leavingPageEvent event to all links on page or if page closes/reloads/changes site
    React.useEffect(() => {
        for (let link of links) {
            link.addEventListener('click', leavingPageEvent, false)
        }
        window.addEventListener('beforeunload', leavingPageEvent)
    }, [])

    if (gameOver) {
        return (
            <>
            <div>
                Game Over!
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
}

Checkers.propTypes = {
    gameMode: PropTypes.number,
    difficulty: PropTypes.number,
    gameID: PropTypes.string,
    color: PropTypes.number
}