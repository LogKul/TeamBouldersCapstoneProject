import { checkersPiece } from "../Checkers"

export default class Logic {
    tileIsOccupied(x, y, boardState) {
        // console.log("Checking if tile is occupied...")

        const pieceDetected = boardState.find((p) => p.x === x && p.y === y)

        if (pieceDetected) {
            console.log("Tile is occupied")
            return true
        } else {
            return false
        }
    }

    isValidMove(px, py, nx, ny, color, king, currentTurn, boardState) {
        // console.log("Move is being validated...")
        // console.log("Current location: "+px+" "+py)
        // console.log("Want to move to: "+nx+" "+ny)
        // console.log("Color being moved: "+color)
        // console.log("Piece is a king: "+king)
        // console.log("Current Turn: "+currentTurn)

        if (color === currentTurn) {
            if (currentTurn === 0) {
                if (king) {
                    console.log("Is a king")
                } else {
                    if ((px === (nx + 1) && py === (ny - 1)) || (px === (nx + 1) && py === (ny + 1))) {
                        if (this.tileIsOccupied(nx, ny, boardState) === false) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
            } else {
                if (king) {
                    console.log("Is a king")
                } else {
                    if ((px === (nx - 1) && py === (ny - 1)) || (px === (nx - 1) && py === (ny + 1))) {
                        if (this.tileIsOccupied(nx, ny, boardState) === false) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
            }
        }
    }
}