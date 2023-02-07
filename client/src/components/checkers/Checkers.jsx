import React from "react"
import "./checkers.css"

const vertAxis = [1, 2, 3, 4, 5, 6, 7, 8]
const horzAxis = [1, 2, 3, 4, 5, 6, 7, 8]

export default function Checkers() {
    let board = []

    for (let i = 0; i < horzAxis.length; i++) {
        for (let j = 0; j < vertAxis.length; j++) {
            const number = j + i + 2
            if (number % 2 === 0) {
                board.push(<span className="tile red-tile"></span>)
            } else {
                board.push(<span className="tile black-tile"></span>)
            }
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