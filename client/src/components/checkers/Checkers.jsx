import Tile from "./tile/Tile"
import "./Checkers.css"
import ReactDOM from "react-dom"

const vertAxis = [1, 2, 3, 4, 5, 6, 7, 8]
const horzAxis = [1, 2, 3, 4, 5, 6, 7, 8]

const checkerPiece = {
    image: String,
    x: Number,
    y: Number
}

const pieces = []

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if ((i + j + 1) % 2 === 0 && i < 3) {
            pieces.push({...checkerPiece, image: "assets/checkers/black-checker.png", x: i, y: j })
        }
        if ((i + j + 1) % 2 === 0 && i > 4) {
            pieces.push({...checkerPiece, image: "assets/checkers/red-checker.png", x: i, y: j })
        }
    }
}

let activePiece = undefined

const grabPiece = (e) => {
    e.preventDefault()

    const element = e.target

    if (element.classList.contains("checkers-piece")) {

        const x = e.clientX - 25
        const y = e.clientY - 25

        element.style.position = "absolute"
        element.style.left = x.toString()+'px'
        element.style.top = y.toString()+'px'

        activePiece = element
    }
}

const movePiece = (e) => {
    e.preventDefault()

    if (activePiece) {

        const x = e.clientX - 25
        const y = e.clientY - 25

        activePiece.style.position = "absolute"
        activePiece.style.left = x.toString()+'px'
        activePiece.style.top = y.toString()+'px'
    }
}

const dropPiece = (e) => {
    e.preventDefault()

    if (activePiece) {
        activePiece = undefined
    }
}

export default function Checkers() {
    let board = []

    for (let i = 0; i < horzAxis.length; i++) {
        for (let j = 0; j < vertAxis.length; j++) {

            let image = undefined

            pieces.forEach(p => {
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
                id="board">
                    
                {board}
            </div>
        </>
    )
}