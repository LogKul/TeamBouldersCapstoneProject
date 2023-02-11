export default class Logic {
    isValidMove(px, py, nx, ny, color, king, currentTurn) {
        console.log("Move is being validated...")
        console.log("Current location: "+px+" "+py)
        console.log("Want to move to: "+nx+" "+ny)
        console.log("Color being moved: "+color)
        console.log("Piece is a king: "+king)
        console.log("Current Turn: "+currentTurn)

        console.log(px === (nx-1))
        console.log(px)
        console.log(nx+1)

        if (color === currentTurn) {
            if (currentTurn === 0) {
                if (king) {
                    console.log("Is a king")
                } else {
                    console.log("Is not a king")
                    if ((px === (nx + 1) && py === (ny - 1)) || (px === (nx + 1) && py === (ny + 1))) {
                        console.log("Valid Move")
                        return true
                    }
                }
            } else {
                if (king) {
                    console.log("Is a king")
                } else {
                    console.log("Is not a king")
                    if ((px === (nx - 1) && py === (ny - 1)) || (px === (nx - 1) && py === (ny + 1))) {
                        console.log("Valid Move")
                        return true
                    }
                }
            }
        }
        console.log("Invalid Move")
    }
}