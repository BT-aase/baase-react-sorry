import {
    movePiece, knockout,
    startActions, slideRemove,
} from "../../redux/actions/game";

export const checkForKnockout = (move, boardPieces, dispatch) => {
    let moveResult = boardPieces.find(piece => piece.space == move);
    if (moveResult) {
        setTimeout(function () {
            dispatch(knockout(move));
            dispatch(startActions(moveResult.color, 'in'));
        }, 500);
    }
}

export const checkForSlide = (move, boardPieces, currColor, dispatch) => {
    let slides = [];
    let currColorSlides = [];

    const red = [30, 37];
    const yellow = [2, 9];
    const blue = [43, 52];
    const green = [15, 24];

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