import {
    movePiece, swapPiece,
    startActions, showSwappable,
    clearMoves
} from "../../redux/actions/game";

import { endMove } from "./endMove";
import { wrapBoard } from "./wrapBoard";
import { backwardsAction } from "./actions/backwardsAction";
import { forwardAction } from "./actions/forwardAction";
import { moveSafeAction } from "./actions/moveSafeAction";
import { safeBackAction } from "./actions/safeBackAction";

export default function PieceMove(move, moves, currColor, swapSelected, boardPieces, dispatch) {

    dispatch(clearMoves());

    let movingPiece;
    movingPiece = moves.find(piece => piece.move === move);

    if (typeof movingPiece === 'undefined') {
        movingPiece = moves.find(piece => piece.position === move);
    }

    let moveResult = movingPiece.move;
    let movePosition = movingPiece.position;

    const specialMoves = ['sorry', 'swap'];

    if (specialMoves.includes(moveResult) && !String(movePosition).includes(currColor)) {
        if (moveResult === 'sorry') {
            let swapColor = boardPieces.find(piece => piece.space === movingPiece.position);
            dispatch(swapPiece(movingPiece.position, currColor))
            dispatch(startActions(swapColor.color, 'in'));
            dispatch(startActions(currColor, 'sorry'));
            endMove(dispatch);
        } else if (moveResult === 'swap') {
            if (Object.entries(swapSelected).length === 0) {
                let swapPiece = boardPieces.find(piece => piece.space === movingPiece.position);
                let swapPieces = boardPieces.filter(piece => piece.color === currColor);
                dispatch(showSwappable(swapPiece, swapPieces));
            } else {
                dispatch(swapPiece(movingPiece.position, swapSelected.color));
                dispatch(swapPiece(swapSelected.space, currColor));
                endMove(dispatch);
            }
        }

    } else {
        if (typeof moveResult === 'string') {
            const diamonds = {
                red: 32,
                blue: 45,
                yellow: 4,
                green: 17
            }

            let block = diamonds[currColor];

            const moveSafeZone = (start, end) => {
                let safeSpaces = [`${currColor}Safe1`, `${currColor}Safe2`, `${currColor}Safe3`,
                `${currColor}Safe4`, `${currColor}Safe5`, `${currColor}Home`]
                let z = safeSpaces.findIndex(space => space === start);
                let endIndex = safeSpaces.findIndex(space => space === end);

                moveSafeAction(z, endIndex);
            }

            if (typeof movingPiece.position !== 'string') {
                const wrapStart = (block) => {
                    let blockWrap = movingPiece.position <= block;
                    if (!blockWrap) {
                        return block + 56
                    } else {
                        return block;
                    }
                }

                let wrapBlock = wrapStart(block - 1);

                if (movingPiece.position < wrapBlock) {
                    let s = movingPiece.position;

                    const moveAction = () => {
                        setTimeout(function () {
                            dispatch(movePiece(wrapBoard(s), wrapBoard(s + 1)))
                            s++;
                            if (s < wrapBlock) {
                                moveAction();
                            } else {
                                moveIntoSafe();
                            }
                        }, 1000)
                    }

                    moveAction();
                } else {
                    setTimeout(function () {
                        moveIntoSafe();
                    }, 1000)
                }

                const moveIntoSafe = () => {
                    let safeStart = `${currColor}Safe1`
                    setTimeout(function () { dispatch(movePiece(block - 1, safeStart)) }, 1000);

                    if (moveResult !== safeStart) {
                        setTimeout(function () { moveSafeZone(safeStart, moveResult) }, 1000);
                    } else {
                        endMove(dispatch)
                    }
                }

            } else {
                moveSafeZone(movingPiece.position, moveResult);
            }
        } else {
            if (typeof movingPiece.action === 'undefined') {
                let a = movingPiece.position;

                let forwardWrap = (position, moveResult) => {
                    let pieceWrap = position > 43 && moveResult >= 1 && moveResult < 12;
                    let wrapMove;
                    wrapMove = pieceWrap ? moveResult + 56 : moveResult;
                    return wrapMove;
                }

                let forward = forwardWrap(a, moveResult)

                forwardAction(a, forward, move, boardPieces, currColor, dispatch);
            } else {
                let b = movingPiece.position;

                if (typeof b === 'string') {
                    let safeSpaces = [`${currColor}Safe1`, `${currColor}Safe2`, `${currColor}Safe3`,
                    `${currColor}Safe4`, `${currColor}Safe5`];
                    let z = safeSpaces.findIndex(space => space === b);

                    safeBackAction(safeSpaces, z, movingPiece, currColor);
                }
                else {
                    let backwardWrap = (position, moveResult) => {
                        let pieceWrap = position < 12 && moveResult <= 56 && moveResult > 43;
                        let wrapMove;
                        wrapMove = pieceWrap ? moveResult - 56 : moveResult;
                        return wrapMove;
                    }

                    let backward = backwardWrap(b, moveResult)

                    backwardsAction(b, backward, move, boardPieces, currColor, dispatch);
                }
            }
        }
    }
}
