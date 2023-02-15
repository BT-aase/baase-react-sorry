import { movePiece } from "../../../redux/actions/game";
import { checkForKnockout, checkForSlide } from "../CheckFor";
import { endMove } from "../endMove";
import { wrapBoard } from "../wrapBoard";

export const furtherBackAction = (start) => {
    let f = start;
    let backResult = moveResult === 56 ? 0 : moveResult;

    if (backResult === f) {
        endMove(dispatch);
    } else {
        setTimeout(function () {
            dispatch(movePiece(f, wrapBoard(f - 1)))
            f--;
            if (f > backResult || f === 1 && backResult !== 1) {
                furtherBackAction(f);
            } else {
                checkForKnockout(move, boardPieces, currColor, dispatch);
                checkForSlide(move, boardPieces, currColor, dispatch);
                endMove(dispatch);
            }
        }, 1000)
    }
}