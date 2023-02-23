import Logic from "./Logic"
import AILogic from "./AILogic"

export default class AI {
    aiEasyMove(boardState, oppColor) {
        let pieceMove = undefined
        let checkMultiMove = true
        let newBoardState = undefined
        while (checkMultiMove) {
            pieceMove = this.getRandomMove(this.getMovablePieces(boardState, oppColor))
            newBoardState = this.movePiece(boardState, pieceMove, oppColor)
            checkMultiMove = false
        }
        return newBoardState
    }

    aiMediumMove(boardState) {

        console.log("choosing medium move")
        return boardState
    }

    aiHardMove(boardState) {

        console.log("choosing hard move")
        return boardState
    }

    getMovablePieces(boardState, oppColor) {
        const pieces = []
        boardState?.forEach(p => {
            if (p.color === oppColor) {
                const move = this.getPieceMoves(p.x, p.y, boardState, oppColor, p.king, false)
                if (move !== undefined) {
                    pieces.push(move)
                }
            }
        })
        return pieces
    }

    getPieceMoves(px, py, boardState, oppColor, king, continuedAttack) {
        const aiLogic = new AILogic()
        return aiLogic.findPossibleMove(px, py, oppColor, king, boardState, continuedAttack)
    }

    getRandomMove(movablePieces) {
        const randPiece = Math.floor(Math.random() * movablePieces.length)
        const randMove = Math.floor(Math.random() * movablePieces[randPiece][2].length)
        return [movablePieces[randPiece][0], movablePieces[randPiece][1], movablePieces[randPiece][2][randMove]]
    }

    movePiece(boardState, pieceMove, oppColor) {
        const logic = new Logic()

        const x = pieceMove[2][0]
        const y = pieceMove[2][1]

        let removeX = 0
        let removeY = 0
        let spliceVal = 0

        let newBoardState = undefined
        let newPiece = undefined

        newBoardState = boardState.map((p) => {
            if (p.x === pieceMove[0] && p.y === pieceMove[1]) {
                if (p.x + 2 === x) {
                    if (p.y + 2 === y) {
                        removeX = p.x + 1
                        removeY = p.y + 1
                        spliceVal = 1
                        console.log("ai took x: " + removeX + " y: " + removeY)
                    } else {
                        removeX = p.x + 1
                        removeY = p.y - 1
                        spliceVal = 1
                        console.log("ai took x: " + removeX + " y: " + removeY)
                    }
                } else if (p.x - 2 === x) {
                    if (p.y + 2 === y) {
                        removeX = p.x - 1
                        removeY = p.y + 1
                        spliceVal = 1
                        console.log("ai took x: " + removeX + " y: " + removeY)
                    } else {
                        removeX = p.x - 1
                        removeY = p.y - 1
                        spliceVal = 1
                        console.log("ai took x: " + removeX + " y: " + removeY)
                    }
                }
                if (p.color === 0) {
                    if (x === 0) {
                        p.image = "/assets/checkers/red-king.png"
                        p.king = true
                    }
                } else {
                    if (x === 7) {
                        p.image = "/assets/checkers/black-king.png"
                        p.king = true
                    }
                }
                p.x = x
                p.y = y
            }
            newPiece = p
            return p
        })
        const index = newBoardState.indexOf(newBoardState.find((p) => p.x === removeX && p.y === removeY))
        newBoardState.splice(index, spliceVal)
        if (pieceMove[0] === x - 2 || pieceMove[0] === x + 2) {
            if (logic.additionalMoveExists(x, y, pieceMove[0], pieceMove[1], oppColor, pieceMove[3], newBoardState)) {
                let newPieceMove = this.getPieceMoves(x, y, newBoardState, oppColor, newPiece[3], true)
                newPieceMove = [newPieceMove[0], newPieceMove[1], newPieceMove[2][0], newPieceMove[3]]
                newBoardState = this.movePiece(newBoardState, newPieceMove, oppColor)
            }
        }
        return newBoardState
    }
}