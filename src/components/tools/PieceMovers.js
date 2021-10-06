import {
    movePiece, swapPiece, startActions,
    showSwappable, slideRemove, endTurn
} from "../../redux/actions/game";

    const checkForKnockout = (move) => {
        let moveResult = boardPieces.find(piece => piece.space == move);
        if (moveResult) {
            setTimeout(function () {
                dispatch(swapPiece(move, currColor))
                dispatch(startActions(moveResult.color, 'in'));
            }, 500);
        }
    }

    const checkForSlide = (move) => {
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

    const endMove = () => {
        setTimeout(function () { dispatch(endTurn()) }, 1000);
    };

    export function PieceMove (move, moves, currColor, swapSelected, dispatch) {

        let movingPiece;
        movingPiece = moves.find(piece => piece.move === move);

        if (typeof movingPiece === 'undefined') {
            movingPiece = moves.find(piece => piece.position === move);
        }

        if (typeof movingPiece.move === 'string') {
            if (movingPiece.move === 'sorry') {
                let swapColor = boardPieces.find(piece => piece.space === movingPiece.position);
                dispatch(swapPiece(movingPiece.position, currColor))
                dispatch(startActions(swapColor.color, 'in'));
                dispatch(startActions(currColor, 'sorry'));
                endMove();
            } else if (movingPiece.move === 'swap') {
                if (Object.entries(swapSelected).length == 0) {
                    let swapPiece = boardPieces.find(piece => piece.space === movingPiece.position);
                    let swapPieces = boardPieces.filter(piece => piece.color === currColor);
                    dispatch(showSwappable(swapPiece, swapPieces));
                } else {
                    dispatch(swapPiece(movingPiece.position, swapSelected.color));
                    dispatch(swapPiece(swapSelected.space, currColor));
                    endMove();
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

            if (typeof movingPiece.action === 'undefined') {
                let a = movingPiece.position;

                let forwardWrap = (position, move) => {
                    let pieceWrap = position > 43 && move >= 1 && move < 12;
                    let wrapMove;
                    wrapMove = pieceWrap ? move + 56 : move;
                    return wrapMove;
                }

                let forward = forwardWrap(a, movingPiece.move)

                const moveAction = () => {
                    setTimeout(function () {
                        dispatch(movePiece(wrapBoard(a), wrapBoard(a + 1)))
                        a++;
                        if (a < forward || a === 56 && movingPiece.move !== 56) {
                            moveAction();
                        } else if (a === forward) {
                            checkForKnockout(movingPiece.move);
                            checkForSlide(movingPiece.move);
                            endMove();
                        }
                    }, 1000)
                }

                moveAction();
            } else {
                let b = movingPiece.position;

                let backwardWrap = (position, move) => {
                    let pieceWrap = position < 12 && move <= 56 && move > 43;
                    let wrapMove;
                    wrapMove = pieceWrap ? move - 56 : move;
                    return wrapMove;
                }

                let backward = backwardWrap(b, movingPiece.move)

                const moveAction = () => {
                    setTimeout(function () {
                        dispatch(movePiece(wrapBoard(b), wrapBoard(b - 1)))
                        b--;
                        if (b > backward || b === 1 && movingPiece.move !== 1) {
                            moveAction();
                        } else if (b === backward) {
                            checkForKnockout(movingPiece.move);
                            checkForSlide(movingPiece.move);
                            endMove();
                        }
                    }, 1000)
                }

                moveAction();
            }
        }
    }
