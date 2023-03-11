import AI from "./AI"
import axios from "../../../api/axios"

export default class Opponent {
    async generateResponse(gameMode, difficulty, boardState, oppColor, gameID) {
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
<<<<<<< HEAD
        } else {
            console.log("game mode is online")
            console.log("sending boardState to opposing player via api")
            return boardState
=======
        } else if (gameMode === 1) {
            try {
                const response = await axios.get("/games/read?id=" + gameID,
                    {
                        headers: { "Content-Type": "application/json", 
                                "x-access-token": sessionStorage.getItem("accessToken")},
                        withCredentials: false
                    }
                )
                if (JSON.parse(response?.data?.gamestate) !== undefined) {
                    console.log("returned parsed data")
                    return JSON.parse(response?.data?.gamestate)
                } else {
                    console.log("returned default board because board was undefined")
                    return boardState
                }
            } catch(err) {
                console.log(err?.response)
                return boardState
            }
>>>>>>> 77edc9824c8146e8d6f12eb0617a13278f0e8786
        }
    }

    async sendResponse(boardState, gameID) {
        try {
            await axios.put("/games/update?id=" + gameID,
                { gamestate: JSON.stringify(boardState) },
                {
                    headers: { "Content-Type": "application/json", 
                            "x-access-token": sessionStorage.getItem("accessToken")},
                    withCredentials: false
                }
            )
        } catch(err) {
            console.log(err?.response)
        }
    }

    async updateWinner(gameID, uuid) {
        try {
            await axios.put("/games/update?id=" + gameID,
                { winner: uuid },
                {
                    headers: { "Content-Type": "application/json", 
                            "x-access-token": sessionStorage.getItem("accessToken")},
                    withCredentials: false
                }
            )
        } catch(err) {
            console.log(err?.response)
        }
        
    }
}