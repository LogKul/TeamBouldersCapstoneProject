import { useRef, useState } from "react"
import Tile from "./tile/Tile"
import "./Checkers.css"
import Logic from "./logic/Logic"

const vertAxis = [1, 2, 3, 4, 5, 6, 7, 8]
const horzAxis = [1, 2, 3, 4, 5, 6, 7, 8]

const checkersPiece = {
    image: String,
    x: Number,
    y: Number
}

const initialBoardState = []

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if ((i + j + 1) % 2 === 0 && i < 3) {
            initialBoardState.push({...checkersPiece, image: "assets/checkers/black-checker.png", x: i, y: j })
        }
        if ((i + j + 1) % 2 === 0 && i > 4) {
            initialBoardState.push({...checkersPiece, image: "assets/checkers/red-checker.png", x: i, y: j })
        }
    }
}

export default function Checkers() {
    const [activePiece, setActivePiece] = useState(undefined)
    const [boardState, setBoardState] = useState(initialBoardState)
    const [gridX, setGridX] = useState()
    const [gridY, setGridY] = useState()
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
            element.style.left = x.toString()+'px'
            element.style.top = y.toString()+'px'

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
                activePiece.style.left = minX.toString()+"px"
            } else if (x > maxX) {
                activePiece.style.left = maxX.toString()+"px"
            } else {
                activePiece.style.left = x.toString()+"px"
            }

            if (y < minY) {
                activePiece.style.top = minY.toString()+"px"
            } else if (y > maxY) {
                activePiece.style.top = maxY.toString()+"px"
            } else {
                activePiece.style.top = y.toString()+"px"
            }
        }
    }

    const dropPiece = (e) => {
        e.preventDefault()

        const checkersBoard = checkersBoardRef.current

        if (activePiece && checkersBoard) {
            const y = Math.floor((e.clientX - checkersBoard.offsetLeft) / 100)
            const x = Math.floor((e.clientY - checkersBoard.offsetTop) / 100)

            logic.isValidMove()

            setBoardState((value) => {
                const newBoardState = value.map((p) => {
                    if (p.x === gridX && p.y === gridY) {
                        p.x = x
                        p.y = y
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