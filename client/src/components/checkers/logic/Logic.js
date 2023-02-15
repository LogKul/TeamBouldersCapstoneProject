import { checkersPiece } from "../Checkers"

export default class Logic {
    getPieceColor(x, y, boardState) {
        const piece = boardState.find((p) => p.x === x && p.y === y)
        return piece.color
    }

    tileIsOccupied(x, y, boardState) {
        const piece = boardState.find((p) => p.x === x && p.y === y)

        if (piece) {
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

        // color 0 is red
        // color 1 is black
        if (color === currentTurn) {
            if (currentTurn === 0) {
                if (king) {
                    console.log("Is a king")
                } else {
                    if ((px === (nx + 1) && py === (ny - 1)) || (px === (nx + 1) && py === (ny + 1))) {
                        if (this.tileIsOccupied(nx, ny, boardState) === false) {
                            return true
                        }
                    } else if ((px === (nx + 2) && (py === (ny - 2)))) {
                        if (this.tileIsOccupied(px - 1, py + 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px - 1, py + 1, boardState) === 1) {
                                    return true
                                }
                            }
                        }
                    } else if (((px === (nx + 2) && py === (ny + 2)))) {
                        if (this.tileIsOccupied(px - 1, py - 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px - 1, py - 1, boardState) === 1) {
                                    return true
                                }
                            }
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
                        }
                    } else if ((px === (nx - 2) && (py === (ny - 2)))) {
                        if (this.tileIsOccupied(px + 1, py + 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px + 1, py + 1, boardState) === 0) {
                                    return true
                                }
                            }
                        }
                    } else if (((px === (nx - 2) && py === (ny + 2)))) {
                        if (this.tileIsOccupied(px + 1, py - 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px + 1, py - 1, boardState) === 0) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }
        return false
    }
}