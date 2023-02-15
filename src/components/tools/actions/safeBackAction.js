import { movePiece } from "../../../redux/actions/game";
import { endMove } from "../endMove";

export const safeBackAction = (safeSpaces, z, movingPiece, currColor) => {
    const safeEnters = {
        red: 31,
        blue: 44,
        yellow: 3,
        green: 16
    }

    setTimeout(function () {
        if (safeSpaces[z] === `${currColor}Safe1`) {
            setTimeout(function () { dispatch(movePiece(`${currColor}Safe1`, safeEnters[currColor])) }, 1000);
            setTimeout(function () { furtherBackAction(safeEnters[currColor]) }, 1000);
        } else {
            dispatch(movePiece(safeSpaces[z], safeSpaces[z - 1]))
            z--;
            if (safeSpaces[z] !== `${currColor}Safe1`) {
                safeBackAction();
            } else {
                setTimeout(function () { dispatch(movePiece(`${currColor}Safe1`, safeEnters[currColor])) }, 1000);
                if (movingPiece.move !== safeEnters[currColor]) {
                    setTimeout(function () { furtherBackAction(safeEnters[currColor]) }, 1000);
                }
                endMove(dispatch);
            }
        }
    }, 1000)
}