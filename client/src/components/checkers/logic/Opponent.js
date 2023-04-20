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
            const response = await axios.get("/games/read?gameid=" + gameID,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": sessionStorage.getItem("accessToken")
                    },
                    withCredentials: false
                }
            )
            if (response?.data?.winner !== null || response?.data?.gamestate === "abandon") {
                return
            } else {
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
            }
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

    async updateMMR(opp_data, win) {
        try {

            const wins = parseInt(sessionStorage.getItem("wins"))
            const losses = parseInt(sessionStorage.getItem("losses"))
            const mmr = parseInt(sessionStorage.getItem("mmr"))

            const player_transformed = Math.pow(10, (mmr / 400))
            const opp_transformed = Math.pow(10, (opp_data.mmr / 400))
            const expected_score_player = player_transformed / (player_transformed + opp_transformed)

            let s = 0
            win == true ? s = 1 : s = 0
            const k = 32

            const newmmr = Math.round(mmr + k * (s - expected_score_player))
            sessionStorage.setItem("mmr", newmmr)

            if (win === true) {

                await axios.put("/users/updaterank?username=" + sessionStorage.getItem("user"),
                    {
                        won: true,
                        opp_mmr: opp_data.mmr
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": sessionStorage.getItem("accessToken")
                        },
                        withCredentials: false
                    }
                ).then(() => {
                    sessionStorage.setItem("wins", wins + 1)
                })
                console.log("updated mmr win")
            }
            else if (win === false) {

                await axios.put("/users/updaterank?username=" + sessionStorage.getItem("user"),
                    {
                        won: false,
                        opp_mmr: opp_data.mmr
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": sessionStorage.getItem("accessToken")
                        },
                        withCredentials: false
                    }
                ).then(() => {
                    sessionStorage.setItem("losses", losses + 1)
                })
                console.log("updated mmr loss")
            }
        } catch (err) {
            console.log(err?.response)
        }

    }

    async forfeitGame(gameID, opp_data, gameOver) {
        console.log(gameOver)
        if (gameOver === false) {
            try {
                await axios.put("/games/update?gameid=" + gameID,
                    { winner: opp_data.id },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": sessionStorage.getItem("accessToken")
                        },
                        withCredentials: false
                    }
                )
                this.updateMMR(opp_data, false)
                console.log("ran update mmr")
            } catch (err) {
                console.log(err?.response)
            }
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