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

        const newBoardState = boardState.map((p) => {
            if (p.x === piecesMoves[randPiece][0] && p.y === piecesMoves[randPiece][1]) {
                p.x = piecesMoves[randPiece][2][randMove][0]
                p.y = piecesMoves[randPiece][2][randMove][1]
            }
            return p
        })

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