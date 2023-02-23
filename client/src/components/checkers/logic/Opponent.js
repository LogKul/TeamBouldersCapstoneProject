import AILogic from "./AILogic"

export default class Opponent {
    generateResponse(gameMode, difficulty, boardState, oppColor) {
        if (gameMode === 0) {
            if (difficulty === 0) {
                return this.aiEasyMove(boardState, oppColor)
            } else if (difficulty === 1) {
                console.log("difficulty is medium")
                return this.aiMediumMove(boardState, oppColor)
            } else {
                console.log("difficulty is hard")
                return this.aiHardMove(boardState, oppColor)
            }
        } else {
            console.log("game mode is online")
            console.log("sending boardState to opposing player via api")
            return boardState
        }
    }

    aiEasyMove(boardState, oppColor) {
        const aiLogic = new AILogic()

        const piecesMoves = []

        boardState?.forEach(p => {
                    if (p.color === oppColor) {
                        const move = aiLogic.findPossibleMove(p.x, p.y, p.color, p.king, boardState)
                        if (move !== undefined) {
                            piecesMoves.push(move)
                        }
                    }
                })

        const randPiece = Math.floor(Math.random() * piecesMoves.length)
        const randMove = Math.floor(Math.random() * piecesMoves[randPiece][2].length)

        const x = piecesMoves[randPiece][2][randMove][0]
        const y = piecesMoves[randPiece][2][randMove][1]

        var removeX = 0
        var removeY = 0
        var spliceVal = 0

        console.log(x)
        console.log(y)

        const newBoardState = boardState.map((p) => {
            if (p.x === piecesMoves[randPiece][0] && p.y === piecesMoves[randPiece][1]) {
                if (p.x + 2 === x) {
                    if (p.y + 2 === y) {
                        removeX = p.x + 1
                        removeY = p.y + 1
                        spliceVal = 1
                    } else {
                        removeX = p.x + 1
                        removeY = p.y - 1
                        spliceVal = 1
                    }
                } else if (p.x - 2 === x) {
                    if (p.y + 2 === y) {
                        removeX = p.x - 1
                        removeY = p.y + 1
                        spliceVal = 1
                    } else {
                        removeX = p.x - 1
                        removeY = p.y - 1
                        spliceVal = 1
                    }
                }
                if (p.color === 0) {
                    if (x === 0) {
                        p.image = "assets/checkers/red-king.png"
                        p.king = true
                    }
                } else {
                    if (x === 7) {
                        p.image = "assets/checkers/black-king.png"
                        p.king = true
                    }
                }
                p.x = x
                p.y = y
            }
            return p
        })
        const index = newBoardState.indexOf(newBoardState.find((p) => p.x === removeX && p.y === removeY))
        newBoardState.splice(index, spliceVal)
        return newBoardState
    }

    aiMediumMove(boardState) {
        const aiLogic = new AILogic()

        console.log("choosing medium move")
        return boardState
    }

    aiHardMove(boardState) {
        const aiLogic = new AILogic()

        console.log("choosing hard move")
        return boardState
    }
}