import Tile from "./tile/Tile"
import "./Checkers.css"

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

            board.push(<Tile number={i + j + 1} piece={image} />)
        }
    }

    return (
        <>
            <div id="board">
                {board}
            </div>
        </>
    )
}