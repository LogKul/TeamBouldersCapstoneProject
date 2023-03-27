import AI from "./AI"
import axios from "../../../api/axios"

export default class Opponent {
    generateResponse(difficulty, boardState, oppColor) {
        const ai = new AI()
        if (difficulty === 0) {
            try {
                return ai.aiEasyMove(boardState, oppColor)
            } catch (err) {
                return undefined
            }
        } else if (difficulty === 1) {
            console.log("difficulty is medium")
            return this.aiMediumMove(boardState, oppColor)
        } else {
            console.log("difficulty is hard")
            return this.aiHardMove(boardState, oppColor)
        }
    }

    async queryResponse(boardState, gameID) {
        try {
            const response = await axios.get("/games/read?gameid=" + gameID,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
            if (JSON.parse(response?.data?.gamestate) !== undefined) {
                return JSON.parse(response?.data?.gamestate)
            } else {
                return boardState
            }
        } catch (err) {
            return boardState
        }
    }

    async sendResponse(boardState, gameID) {
        try {
            await axios.put("/games/update?gameid=" + gameID,
                { gamestate: JSON.stringify(boardState) },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
        } catch (err) {
            console.log(err?.response)
        }
    }

    async updateWinner(gameID, uuid) {
        try {
            await axios.put("/games/update?gameid=" + gameID,
                { winner: uuid },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
        } catch (err) {
            console.log(err?.response)
        }

    }

    async forfeitGame(gameID, uuid) {
        try {
            const response = await axios.get("/games/read?gameid=" + gameID,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
            if (response?.data?.winner === null) {
                if (response?.data?.player1 === uuid) {
                    try {
                        await axios.put("/games/update?gameid=" + gameID,
                            { winner: response?.data?.player2 },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-access-token": sessionStorage.getItem("accessToken")
                                },
                                withCredentials: false
                            }
                        )
                    } catch (err) {
                        console.log(err?.response)
                    }
                } else {
                    try {
                        await axios.put("/games/update?gameid=" + gameID,
                            { winner: response?.data?.player1 },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-access-token": sessionStorage.getItem("accessToken")
                                },
                                withCredentials: false
                            }
                        )
                    } catch (err) {
                        console.log(err?.response)
                    }
                }
            }
        } catch (err) {
            console.log(err?.response)
        }
    }
}