import { movePiece } from "../../../redux/actions/game";
import { checkForKnockout, checkForSlide } from "../CheckFor";
import { endMove } from "../endMove";
import { wrapBoard } from "../wrapBoard";

export const backwardsAction = (b, backward, move, boardPieces, currColor, dispatch) => {
    setTimeout(function () {
        dispatch(movePiece(wrapBoard(b), wrapBoard(b - 1)))
        b--;
        if (b > backward || b === 1 && moveResult !== 1) {
            backwardsAction();
        } else if (b === backward) {
            checkForKnockout(move, boardPieces, currColor, dispatch);
            checkForSlide(move, boardPieces, currColor, dispatch);
            endMove(dispatch);
        }
    }, 1000)
}