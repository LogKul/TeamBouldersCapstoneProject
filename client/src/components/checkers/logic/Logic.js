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
        if (color === currentTurn) {
            if (currentTurn === 0) {
                if (king) {
                    if ((px === (nx + 1) && py === (ny - 1)) || (px === (nx + 1) && py === (ny + 1) || (px === (nx - 1) && py === (ny - 1)) || (px === (nx - 1) && py === (ny + 1)))) {
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
                    } else if ((px === (nx + 2) && py === (ny + 2))) {
                        if (this.tileIsOccupied(px - 1, py - 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px - 1, py - 1, boardState) === 1) {
                                    return true
                                }
                            }
                        }
                    } else if ((px === (nx - 2) && py === (ny + 2))) {
                        if (this.tileIsOccupied(px + 1, py - 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px + 1, py - 1, boardState) === 1) {
                                    return true
                                }
                            }
                        }
                    } else if ((px === (nx - 2) && py === (ny - 2))) {
                        if (this.tileIsOccupied(px + 1, py + 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px + 1, py + 1, boardState) === 1) {
                                    return true
                                }
                            }
                        }
                    }
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
                    } else if ((px === (nx + 2) && py === (ny + 2))) {
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
                    if ((px === (nx + 1) && py === (ny - 1)) || (px === (nx + 1) && py === (ny + 1) || (px === (nx - 1) && py === (ny - 1)) || (px === (nx - 1) && py === (ny + 1)))) {
                        if (this.tileIsOccupied(nx, ny, boardState) === false) {
                            return true
                        }
                    } else if ((px === (nx + 2) && (py === (ny - 2)))) {
                        if (this.tileIsOccupied(px - 1, py + 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px - 1, py + 1, boardState) === 0) {
                                    return true
                                }
                            }
                        }
                    } else if ((px === (nx + 2) && py === (ny + 2))) {
                        if (this.tileIsOccupied(px - 1, py - 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px - 1, py - 1, boardState) === 0) {
                                    return true
                                }
                            }
                        }
                    } else if ((px === (nx - 2) && py === (ny + 2))) {
                        if (this.tileIsOccupied(px + 1, py - 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px + 1, py - 1, boardState) === 0) {
                                    return true
                                }
                            }
                        }
                    } else if ((px === (nx - 2) && py === (ny - 2))) {
                        if (this.tileIsOccupied(px + 1, py + 1, boardState)) {
                            if (this.tileIsOccupied(nx, ny, boardState) === false) {
                                if (this.getPieceColor(px + 1, py + 1, boardState) === 0) {
                                    return true
                                }
                            }
                        }
                    }
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