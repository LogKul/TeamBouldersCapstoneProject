export default class Opponent {
    generateResponse(gameMode, difficulty, boardStateString) {
        if (gameMode === 0) {
            console.log("game mode is against the computer")
            if (difficulty === 0) {
                console.log("difficulty is easy")
                return this.encodeBoardState(this.aiEasyMove(this.decodeBoardState(boardStateString)))
            } else if (difficulty === 1) {
                console.log("difficulty is medium")
                return this.encodeBoardState(this.aiMediumMove(this.decodeBoardState(boardStateString)))
            } else {
                console.log("difficulty is hard")
                return this.encodeBoardState(this.aiHardMove(this.decodeBoardState(boardStateString)))
            }
        } else {
            console.log("game mode is online")
            console.log("sending boardState to opposing player")
        }
    }

    encodeBoardState(boardState) {
        console.log("encoding board state")
        // convert array of board state bojects to a board state string
        return "some string"
    }

    decodeBoardState(boardState) {
        console.log("decoding board state")
        // convert board state string to array of board state objects
        return ["game", "objects"]
    }

    aiEasyMove(boardState) {
        console.log("choosing easy move")
        return ["game", "objects"]
    }

    aiMediumMove(boardState) {
        console.log("choosing medium move")
        return ["game", "objects"]
    }

    aiHardMove(boardState) {
        console.log("choosing hard move")
        return ["game", "objects"]
    }
}