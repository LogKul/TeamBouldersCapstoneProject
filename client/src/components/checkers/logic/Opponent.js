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

    async queryResponse(boardState, gameID, uuid) {
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
            if (response?.data?.winner !== null) {
                if (response?.data?.winner === uuid) {
                    return "winner"
                } else {
                    return "loser"
                }
            }
            if (response?.data?.gamestate === "") {
                return boardState
            } else if (response?.data?.gamestate === "abandon") {
                //console.log(response?.data?.gamestate)
                return response?.data?.gamestate
            } else {
                return JSON.parse(response?.data?.gamestate)
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

    async updateMMR(opponent_uuid, win) {
        try {
            const response = await axios.get("/users/readid",
                { params: { playerid: opponent_uuid } },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )

            const opp_data = response?.data
            console.log("OPP_DATA: " + opp_data.mmr)

            const mmr = parseInt(sessionStorage.getItem("mmr"))
            const wins = parseInt(sessionStorage.getItem("wins"))
            const losses = parseInt(sessionStorage.getItem("losses"))

            const player_transformed = Math.pow(10, (mmr / 400))
            const opp_transformed = Math.pow(10, (opp_data.mmr / 400))

            const expected_score_player = player_transformed / (player_transformed + opp_transformed)
            //const expected_score_opp = opp_transformed / (player_transformed + opp_transformed)

            let s = 0
            win === true ? s = 1 : s = 0
            const k = 32

            console.log("About to update MMR...")

            if (win === true) {
                await axios.put("/users/update?username=" + sessionStorage.getItem("username"),
                    {
                        wins: wins + 1,
                        mmr: mmr + k * (s - expected_score_player)
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": sessionStorage.getItem("accessToken")
                        },
                        withCredentials: false
                    }
                )
                console.log("Updating player MMR...")
            }
            else if (win === false) {
                await axios.put("/users/update?username=" + sessionStorage.getItem("username"),
                    {
                        losses: losses + 1,
                        mmr: (opp_data.mmr + 400 * (wins - losses - 1)) / (wins + losses + 1)
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": sessionStorage.getItem("accessToken")
                        },
                        withCredentials: false
                    }
                )
                console.log("Updating player MMR...")
            }
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
                        return true
                    } catch (err) {
                        console.log(err?.response)
                    }
                }
            }
        } catch (err) {
            console.log(err?.response)
            return false
        }
    }

    async abandonGame(gameID) {
        try {
            await axios.put("/games/update?gameid=" + gameID,
                { gamestate: "abandon" },
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