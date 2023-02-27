import AI from "./AI"

export default class Opponent {
    generateResponse(gameMode, difficulty, boardState, oppColor) {
        if (gameMode === 0) {
            const ai = new AI()
            if (difficulty === 0) {
                return ai.aiEasyMove(boardState, oppColor)
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
}