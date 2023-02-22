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

        const possibleMoves = []
        // [px, py, [[nx, ny],[nx, ny]]]

        boardState?.forEach(p => {
                    if (p.color === oppColor) {
                        possibleMoves.push(aiLogic.findPossibleMove(p.x, p.y, p.color, p.king, boardState))
                    }
                })

        console.log(possibleMoves)

        return boardState
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