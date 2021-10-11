import {
    movePiece, knockout, swapPiece,
    startActions, showSwappable, slideRemove,
    endTurn, moveToHome, clearMoves
} from "../../redux/actions/game";

const checkForKnockout = (move, boardPieces, currColor, dispatch) => {
    let moveResult = boardPieces.find(piece => piece.space == move);
    if (moveResult) {
        setTimeout(function () {
            dispatch(knockout(move));
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

        for (let m = slideStart; m < slideStart + 4; m++) {
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

    dispatch(clearMoves());

    let movingPiece;
    movingPiece = moves.find(piece => piece.move === move);

    if (typeof movingPiece === 'undefined') {
        movingPiece = moves.find(piece => piece.position === move);
    }

    let moveResult = movingPiece.move;
    let movePosition = movingPiece.position;

    let specialMoves = ['sorry', 'swap'];

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
                let endIndex = safeSpaces.findIndex(space => space === end);

                const moveSafeAction = () => {
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

                moveSafeAction();
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

                const forwardAction = () => {
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

                forwardAction();
            } else {
                let b = movingPiece.position;

                if (typeof b === 'string') {
                    let safeSpaces = [`${currColor}Safe1`, `${currColor}Safe2`, `${currColor}Safe3`,
                    `${currColor}Safe4`, `${currColor}Safe5`];
                    let z = safeSpaces.findIndex(space => space === b);

                    let safeEnters = {
                        red: 31,
                        blue: 44,
                        yellow: 3,
                        green: 16
                    }

                    const furtherBackAction = (start) => {
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

                    const safeBackAction = () => {
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



                    safeBackAction();
                }
                else {
                    let backwardWrap = (position, moveResult) => {
                        let pieceWrap = position < 12 && moveResult <= 56 && moveResult > 43;
                        let wrapMove;
                        wrapMove = pieceWrap ? moveResult - 56 : moveResult;
                        return wrapMove;
                    }

                    let backward = backwardWrap(b, moveResult)

                    const backwardsAction = () => {
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

                    backwardsAction();
                }
            }
        }

    }
}
