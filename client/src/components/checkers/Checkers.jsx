import { useRef, useState } from "react"
import Tile from "./tile/Tile"
import "./Checkers.css"
import Logic from "./logic/Logic"

const vertAxis = [1, 2, 3, 4, 5, 6, 7, 8]
const horzAxis = [1, 2, 3, 4, 5, 6, 7, 8]

export const checkersPiece = {
    image: String,
    x: Number,
    y: Number,
    color: Number,
    king: Boolean
}

const initialBoardState = []

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if ((i + j + 1) % 2 === 0 && i < 3) {
            initialBoardState.push({...checkersPiece, image: "assets/checkers/black-checker.png", x: i, y: j, color: 1, king: false })
        }
        if ((i + j + 1) % 2 === 0 && i > 4) {
            initialBoardState.push({...checkersPiece, image: "assets/checkers/red-checker.png", x: i, y: j, color: 0, king: false })
        }
    }
}

export default function Checkers() {
    const [activePiece, setActivePiece] = useState(undefined)
    const [boardState, setBoardState] = useState(initialBoardState)
    const [gridX, setGridX] = useState()
    const [gridY, setGridY] = useState()
    const [currentTurn, setCurrentTurn] = useState(0)
    const checkersBoardRef = useRef(null)
    const logic = new Logic()

    const grabPiece = (e) => {
        e.preventDefault()

        const element = e.target
        const checkersBoard = checkersBoardRef.current

        if (element.classList.contains("checkers-piece") && checkersBoard) {
            setGridX(Math.floor((e.clientY - checkersBoard.offsetTop) / 100))
            setGridY(Math.floor((e.clientX - checkersBoard.offsetLeft) / 100))

            const x = e.clientX - 25
            const y = e.clientY - 25

            element.style.position = "absolute"
            element.style.left = x+'px'
            element.style.top = y+'px'

            setActivePiece(element)
        }
    }

    const movePiece = (e) => {
        e.preventDefault()

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
                activePiece.style.left = minX+"px"
            } else if (x > maxX) {
                activePiece.style.left = maxX+"px"
            } else {
                activePiece.style.left = x+"px"
            }

            if (y < minY) {
                activePiece.style.top = minY+"px"
            } else if (y > maxY) {
                activePiece.style.top = maxY+"px"
            } else {
                activePiece.style.top = y+"px"
            }
        }
    }

    const dropPiece = (e) => {
        e.preventDefault()

        const checkersBoard = checkersBoardRef.current

        if (activePiece && checkersBoard) {
            const x = Math.floor((e.clientY - checkersBoard.offsetTop) / 100)
            const y = Math.floor((e.clientX - checkersBoard.offsetLeft) / 100)

            setBoardState((value) => {
                const newBoardState = value.map((p) => {
                    if (p.x === gridX && p.y === gridY) {
                        if (logic.isValidMove(gridX, gridY, x, y, p.color, p.king, currentTurn, value)) {
                            p.x = x
                            p.y = y
                            if (currentTurn === 0) {
                                setCurrentTurn(1)
                            } else {
                                setCurrentTurn(0)
                            }
                        } else {
                            activePiece.style.position = "relative"
                            activePiece.style.removeProperty("top")
                            activePiece.style.removeProperty("left")
                        }
                    }
                    return p
                })
                return newBoardState
            })
            setActivePiece(undefined)
        }
    }

    let board = []

    for (let i = 0; i < horzAxis.length; i++) {
        for (let j = 0; j < vertAxis.length; j++) {

            let image = undefined

            boardState?.forEach(p => {
                if(p.x === i && p.y === j) {
                    image = p.image
                }
            })

            board.push(<Tile key={i.toString()+j.toString()+"propkey"} number={i + j + 1} piece={image} />)
        }
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