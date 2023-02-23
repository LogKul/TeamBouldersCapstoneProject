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

    isValidMove(px, py, nx, ny, color, king, currentTurn, boardState, continuedAttack) {
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                if (color === currentTurn) {
                    if (king) {
                        if (continuedAttack === false && 
                            ((px === (nx + 1) && py === (ny - 1)) || 
                            (px === (nx + 1) && py === (ny + 1)) || 
                            (px === (nx - 1) && py === (ny - 1)) || 
                            (px === (nx - 1) && py === (ny + 1)))) {
                            return true
                        } else if ((px === (nx + 2) && (py === (ny - 2)))) {
                            // console.log("bottom left to top right")
                            if (this.tileIsOccupied(px - 1, py + 1, boardState)) {
                                if (this.getPieceColor(px - 1, py + 1, boardState) !== color) {
                                    return true
                                }
                            }
                        } else if ((px === (nx + 2) && py === (ny + 2))) {
                            // console.log("bottom right to top left")
                            if (this.tileIsOccupied(px - 1, py - 1, boardState)) {
                                if (this.getPieceColor(px - 1, py - 1, boardState) !== color) {
                                    return true
                                }
                            }
                        } else if ((px === (nx - 2) && py === (ny + 2))) {
                            // console.log("top right to bottom left")
                            if (this.tileIsOccupied(px + 1, py - 1, boardState)) {
                                if (this.getPieceColor(px + 1, py - 1, boardState) !== color) {
                                    return true
                                }
                            }
                        } else if ((px === (nx - 2) && py === (ny - 2))) {
                            // console.log("top left to bottom right")
                            if (this.tileIsOccupied(px + 1, py + 1, boardState)) {
                                if (this.getPieceColor(px + 1, py + 1, boardState) !== color) {
                                    return true
                                }
                            }
                        }
                    } else {
                        if (currentTurn === 0) {
                            if (continuedAttack === false && ((px === (nx + 1) && py === (ny - 1)) || (px === (nx + 1) && py === (ny + 1)))) {
                                return true
                            } else if ((px === (nx + 2) && (py === (ny - 2)))) {
                                if (this.tileIsOccupied(px - 1, py + 1, boardState)) {
                                    if (this.getPieceColor(px - 1, py + 1, boardState) === 1) {
                                        return true
                                    }
                                }
                            } else if ((px === (nx + 2) && py === (ny + 2))) {
                                if (this.tileIsOccupied(px - 1, py - 1, boardState)) {
                                    if (this.getPieceColor(px - 1, py - 1, boardState) === 1) {
                                        return true
                                    }
                                }
                            }
                        } else {
                            if (continuedAttack === false && ( (px === (nx - 1) && py === (ny - 1)) || (px === (nx - 1) && py === (ny + 1)))) {
                                return true
                            } else if ((px === (nx - 2) && (py === (ny - 2)))) {
                                if (this.tileIsOccupied(px + 1, py + 1, boardState)) {
                                    if (this.getPieceColor(px + 1, py + 1, boardState) === 0) {
                                        return true
                                    }
                                }
                            } else if (((px === (nx - 2) && py === (ny + 2)))) {
                                if (this.tileIsOccupied(px + 1, py - 1, boardState)) {
                                    if (this.getPieceColor(px + 1, py - 1, boardState) === 0) {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false
    }
    additionalMoveExists(px, py, ox, oy, color, king, boardState) {

        if (king) {
            if (this.tileIsOccupied(px + 2, py + 2, boardState) === false && (px + 2 !== ox || py + 2 !== oy) && px + 2 < 8 && py + 2 < 8) {
                if (this.tileIsOccupied(px + 1, py + 1, boardState)) {
                    if (this.getPieceColor(px + 1, py + 1, boardState) !== color) {
                        console.log("additional move exists")
                        return true
                    }
                }
            }
            if (this.tileIsOccupied(px + 2, py - 2, boardState) === false && (px + 2 !== ox || py - 2 !== oy) && px + 2 < 8 && py - 2 >= 0) {
                if (this.tileIsOccupied(px + 1, py - 1, boardState)) {
                    if (this.getPieceColor(px + 1, py - 1, boardState) !== color) {
                        console.log("additional move exists")
                        return true
                    }
                }
            }
            if (this.tileIsOccupied(px - 2, py - 2, boardState) === false && (px - 2 !== ox || py - 2 !== oy) && px - 2 >= 0 && py - 2 >= 0) {
                if (this.tileIsOccupied(px - 1, py - 1, boardState)) {
                    if (this.getPieceColor(px - 1, py - 1, boardState) !== color) {
                        console.log("additional move exists")
                        return true
                    }
                }
            }
            if (this.tileIsOccupied(px - 2, py + 2, boardState) === false && (px - 2 !== ox || py + 2 !== oy) && px - 2 >= 0 && py + 2 < 8) {
                if (this.tileIsOccupied(px - 1, py + 1, boardState)) {
                    if (this.getPieceColor(px - 1, py + 1, boardState) !== color) {
                        console.log("additional move exists")
                        return true
                    }
                }
            }
        } else {
            if (color === 0) {
                if (this.tileIsOccupied(px - 2, py + 2, boardState) === false && px - 2 >= 0 && py + 2 < 8) {
                    if (this.tileIsOccupied(px - 1, py + 1, boardState)) {
                        if (this.getPieceColor(px - 1, py + 1, boardState) !== color) {
                            return true
                        }
                    }
                }
                if (this.tileIsOccupied(px - 2, py - 2, boardState) === false && px - 2 >= 0 && py - 2 >= 0) {
                    if (this.tileIsOccupied(px - 1, py - 1, boardState)) {
                        if (this.getPieceColor(px - 1, py - 1, boardState) !== color) {
                            return true
                        }
                    }
                }
            } else {
                if (this.tileIsOccupied(px + 2, py + 2, boardState) === false && px + 2 < 8 && py + 2 < 8) {
                    if (this.tileIsOccupied(px + 1, py + 1, boardState)) {
                        if (this.getPieceColor(px + 1, py + 1, boardState) !== color) {
                            return true
                        }
                    }
                }
                if (this.tileIsOccupied(px + 2, py - 2, boardState) === false && px + 2 < 8 && py - 2 >= 0) {
                    if (this.tileIsOccupied(px + 1, py - 1, boardState)) {
                        if (this.getPieceColor(px + 1, py - 1, boardState) !== color) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
}