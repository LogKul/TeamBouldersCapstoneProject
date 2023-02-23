import { useRef, useState, useEffect } from "react"
import Tile from "./tile/Tile"
import "./checkers.css"
import Logic from "./logic/Logic"
import Opponent from "./logic/Opponent"

export default function Checkers(props) {
    const initialBoardState = []

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j + 1) % 2 === 0 && i < 3) {
                initialBoardState.push({ image: "assets/checkers/black-checker.png", x: i, y: j, color: 1, king: false })
            }
            if ((i + j + 1) % 2 === 0 && i > 4) {
                initialBoardState.push({ image: "assets/checkers/red-checker.png", x: i, y: j, color: 0, king: false })
            }
        }
    }

    const [activePiece, setActivePiece] = useState(undefined)
    const [boardState, setBoardState] = useState(initialBoardState)
    const [gridX, setGridX] = useState()
    const [gridY, setGridY] = useState()
    const [continuedAttack, setContinuedAttack] = useState(false)
    const [currentTurn, setCurrentTurn] = useState(0)
    const [playerColor, setPlayerColor] = useState(0)
    const [running, setRunning] = useState(true)
    const checkersBoardRef = useRef(null)
    const logic = new Logic()
    const opponent = new Opponent()

    const grabPiece = (e) => {

        const element = e.target
        const checkersBoard = checkersBoardRef.current

        if (element.classList.contains("checkers-piece") && checkersBoard) {
            setGridX(Math.floor((e.clientY - checkersBoard.offsetTop) / 100))
            setGridY(Math.floor((e.clientX - checkersBoard.offsetLeft) / 100))

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
            const x = Math.floor((e.clientY - checkersBoard.offsetTop) / 100)
            const y = Math.floor((e.clientX - checkersBoard.offsetLeft) / 100)

            if (currentTurn === playerColor) {
                var removeX = 0
                var removeY = 0
                var spliceVal = 0


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
                                        p.image = "assets/checkers/red-king.png"
                                        p.king = true
                                    }
                                } else {
                                    if (x === 7) {
                                        p.image = "assets/checkers/black-king.png"
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
    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1)
        }, 1000)
        return () => clearInterval(timer)
    })

    useEffect(() => {
        if (currentTurn !== playerColor) {
            if (seconds >= 5) {
                setSeconds(0)
                setBoardState(opponent.generateResponse(props.gameMode, props.difficulty, boardState, 1))
                setCurrentTurn(playerColor)
            }
        }
    })

    if (running) {
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
        console.log("Game is over")
    }

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