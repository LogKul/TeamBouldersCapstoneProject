import Logic from "./Logic"

export default class AILogic {
    findPossibleMove(px, py, color, king, boardState) {
        const logic = new Logic()

        const pieceMoves = []

        if (king) {
            console.log("piece is a king. looking for king moves")
        } else {
            if (color == 0) {
                console.log("piece is red. looking for possible red piece moves")
            } else {
                if (logic.isValidMove(px, py, px + 1, py + 1, color, king, color, boardState, false)) {
                    pieceMoves.push([px + 1, py + 1])
                }
                if (logic.isValidMove(px, py, px + 1, py - 1, color, king, color, boardState, false)) {
                    pieceMoves.push([px + 1, py - 1])
                }
            }
        }
        if (pieceMoves.length === 0) {
            return undefined
        } else {
            return [px, py, pieceMoves]
        }
    }
}