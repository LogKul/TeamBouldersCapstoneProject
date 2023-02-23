import Logic from "./Logic"

export default class AILogic {
    findPossibleMove(px, py, color, king, boardState) {
        const logic = new Logic()

        const pieceMoves = []

        if (king) {
            if (logic.isValidMove(px, py, px + 1, py + 1, color, king, color, boardState, false)) {
                pieceMoves.push([px + 1, py + 1])
            }
            if (logic.isValidMove(px, py, px + 1, py - 1, color, king, color, boardState, false)) {
                pieceMoves.push([px + 1, py - 1])
            }
            if (logic.isValidMove(px, py, px - 1, py + 1, color, king, color, boardState, false)) {
                pieceMoves.push([px - 1, py + 1])
            }
            if (logic.isValidMove(px, py, px - 1, py - 1, color, king, color, boardState, false)) {
                pieceMoves.push([px - 1, py - 1])
            }
            if (logic.isValidMove(px, py, px + 2, py + 2, color, king, color, boardState, false)) {
                pieceMoves.push([px + 2, py + 2])
            }
            if (logic.isValidMove(px, py, px + 2, py - 2, color, king, color, boardState, false)) {
                pieceMoves.push([px + 2, py - 2])
            }
            if (logic.isValidMove(px, py, px - 2, py + 2, color, king, color, boardState, false)) {
                pieceMoves.push([px - 2, py + 2])
            }
            if (logic.isValidMove(px, py, px - 2, py - 2, color, king, color, boardState, false)) {
                pieceMoves.push([px - 2, py - 2])
            }
        } else {
            if (color == 0) {
                if (logic.isValidMove(px, py, px - 1, py + 1, color, king, color, boardState, false)) {
                    pieceMoves.push([px - 1, py + 1])
                }
                if (logic.isValidMove(px, py, px - 1, py - 1, color, king, color, boardState, false)) {
                    pieceMoves.push([px - 1, py - 1])
                }
                if (logic.isValidMove(px, py, px - 2, py + 2, color, king, color, boardState, false)) {
                    pieceMoves.push([px - 2, py + 2])
                }
                if (logic.isValidMove(px, py, px - 2, py - 2, color, king, color, boardState, false)) {
                    pieceMoves.push([px - 2, py - 2])
                }
            } else {
                if (logic.isValidMove(px, py, px + 1, py + 1, color, king, color, boardState, false)) {
                    pieceMoves.push([px + 1, py + 1])
                }
                if (logic.isValidMove(px, py, px + 1, py - 1, color, king, color, boardState, false)) {
                    pieceMoves.push([px + 1, py - 1])
                }
                if (logic.isValidMove(px, py, px + 2, py + 2, color, king, color, boardState, false)) {
                    pieceMoves.push([px + 2, py + 2])
                }
                if (logic.isValidMove(px, py, px + 2, py - 2, color, king, color, boardState, false)) {
                    pieceMoves.push([px + 2, py - 2])
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