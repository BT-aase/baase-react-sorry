import { movePiece } from "../../../redux/actions/game";
import { checkForKnockout, checkForSlide } from "../CheckFor";
import { endMove } from "../endMove";
import { wrapBoard } from "../wrapBoard";

export default function forwardAction (a, forward, move, boardPieces, currColor, dispatch) {
    
    setTimeout(function () {
        dispatch(movePiece(wrapBoard(a), wrapBoard(a + 1)))
        a++;
        if (a < forward || a === 56 && forward !== 56) {
            forwardAction();
        } else if (a === forward) {
            checkForKnockout(move, boardPieces, currColor, dispatch);
            checkForSlide(move, boardPieces, currColor, dispatch);
            endMove(dispatch);
        }
    }, 1000)
}