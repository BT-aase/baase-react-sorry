import { movePiece } from "../../../redux/actions/game";
import { endMove } from "../endMove";

export const moveSafeAction = (z, endIndex) => {
    setTimeout(function () {
        if (z < endIndex) {
            dispatch(movePiece(safeSpaces[z], safeSpaces[z + 1]))
            z++;
            if (safeSpaces[z] !== end) {
                moveSafeAction();
            } else {
                if (end === `${currColor}Home`) {
                    dispatch(moveToHome(currColor));
                }
                endMove(dispatch)
            }
        } else {
            dispatch(movePiece(safeSpaces[z], safeSpaces[z - 1]))
            z--;
            if (safeSpaces[z] !== end) {
                moveSafeAction();
            } else {
                endMove(dispatch)
            }
        }
    }, 1000)
}