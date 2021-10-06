import {
    movePiece, swapPiece, startActions,
    showSwappable, slideRemove, endTurn
} from "../../redux/actions/game";

const checkForKnockout = (move, boardPieces, dispatch) => {
    let moveResult = boardPieces.find(piece => piece.space == move);
    if (moveResult) {
        setTimeout(function () {
            dispatch(swapPiece(move, currColor));
            dispatch(startActions(moveResult.color, 'in'));
        }, 500);
    }
}

const checkForSlide = (move, boardPieces, currColor, dispatch) => {
    let slides = [];
    let currColorSlides = [];

    let red = [30, 37];
    let yellow = [2, 9];
    let blue = [43, 52];
    let green = [15, 24];

    switch (currColor) {
        case 'red':
            currColorSlides = red;
            break;
        case 'yellow':
            currColorSlides = yellow;
            break;
        case 'blue':
            currColorSlides = blue;
            break;
        case 'green':
            currColorSlides = green;
            break;
        default:
            break;
    }

    slides = slides.concat(red, yellow, blue, green);

    if (slides.includes(move) && !currColorSlides.includes(move)) {

        let inSlidePieces = [];
        let slideStart = move;

        for (let m = slideStart; m < slideStart + 3; m++) {
            let slidePiece = boardPieces.find(piece => piece.space === m);
            if (slidePiece) {
                inSlidePieces.push(slidePiece);
            }
        }

        setTimeout(function () { dispatch(movePiece(move, move + 3)) }, 500);

        for (let n = 0; n < inSlidePieces.length; n++) {
            setTimeout(function () {
                dispatch(slideRemove(inSlidePieces[n].space));
                dispatch(startActions(inSlidePieces[n].color, 'in'))
            }, 1000);
        }
    }
}

const endMove = (dispatch) => {
    setTimeout(function () { dispatch(endTurn()) }, 1000);
};

export default function PieceMove(move, moves, currColor, swapSelected, boardPieces, dispatch) {

    let movingPiece;
    movingPiece = moves.find(piece => piece.move === move);

    if (typeof movingPiece === 'undefined') {
        movingPiece = moves.find(piece => piece.position === move);
    }

    let moveResult = movingPiece.move;

    if (typeof moveResult === 'string' && !moveResult.includes(currColor)) {
        if (moveResult === 'sorry') {
            let swapColor = boardPieces.find(piece => piece.space === movingPiece.position);
            dispatch(swapPiece(movingPiece.position, currColor))
            dispatch(startActions(swapColor.color, 'in'));
            dispatch(startActions(currColor, 'sorry'));
            endMove(dispatch);
        } else if (move === 'swap') {
            if (Object.entries(swapSelected).length == 0) {
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
        let wrapBoard = (move) => {
            if (move > 56) {
                return move - 56;
            } else if (move < 1) {
                return move + 56
            } else {
                return move;
            }
        }
        if (typeof moveResult === 'string') {

            let diamonds = {
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

                const moveAction = () => {
                    setTimeout(function () {
                        dispatch(movePiece(safeSpaces[z], safeSpaces[z + 1]))
                        z++;
                        if (safeSpaces[z] !== end) {
                            moveAction();
                        } else {
                            endMove(dispatch)
                        }
                    }, 1000)
                }

                moveAction();
            }

            if (typeof movingPiece.position !== 'string') {

                const wrapStart = (block) => {
                    let blockWrap = movingPiece.position < block - 1;
                    if (!blockWrap) {
                        return block + 56
                    } else {
                        return block;
                    }
                }


                if (movingPiece.position < wrapStart(block - 1)) {
                    let s = movingPiece.position;

                    const moveAction = () => {
                        setTimeout(function () {
                            dispatch(movePiece(wrapBoard(s), wrapBoard(s + 1)))
                            s++;
                            if (s < wrapStart(block - 1)) {
                                moveAction();
                            } else {
                                moveIntoSafe();
                            }
                        }, 1000)
                    }

                    moveAction();
                } else {
                    moveIntoSafe();
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

                const moveAction = () => {
                    setTimeout(function () {
                        dispatch(movePiece(wrapBoard(a), wrapBoard(a + 1)))
                        a++;
                        if (a < forward || a === 56 && moveAction !== 56) {
                            moveAction();
                        } else if (a === forward) {
                            checkForKnockout(move, boardPieces);
                            checkForSlide(move, boardPieces, currColor);
                            endMove(dispatch);
                        }
                    }, 1000)
                }

                moveAction();
            } else {
                let b = movingPiece.position;

                let backwardWrap = (position, moveResult) => {
                    let pieceWrap = position < 12 && moveResult <= 56 && moveResult > 43;
                    let wrapMove;
                    wrapMove = pieceWrap ? moveResult - 56 : moveResult;
                    return wrapMove;
                }

                let backward = backwardWrap(b, moveResult)

                const moveAction = () => {
                    setTimeout(function () {
                        dispatch(movePiece(wrapBoard(b), wrapBoard(b - 1)))
                        b--;
                        if (b > backward || b === 1 && moveResult !== 1) {
                            moveAction();
                        } else if (b === backward) {
                            checkForKnockout(move, boardPieces, dispatch);
                            checkForSlide(move, boardPieces, currColor, dispatch);
                            endMove(dispatch);
                        }
                    }, 1000)
                }

                moveAction();
            }
        }

    }
}
