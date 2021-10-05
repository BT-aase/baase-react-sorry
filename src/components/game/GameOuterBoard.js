import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    movePiece, swapPiece, startActions,
    showSwappable, slideRemove, endTurn
} from "../../redux/actions/game";

import GamePiece from "./elements/GamePiece";
import colors from "../colors";

const GameOuterBoard = () => {

    const dispatch = useDispatch();

    let currColor = useSelector((state) => state.game.gameSide);
    let movesPossible = useSelector((state) => state.game.possibleMoves);
    let boardPieces = useSelector((state) => state.game.piecesInPlay);
    let swapSelected = useSelector((state) => state.game.swapSelected);

    const displayPiece = (id) => {
        let pieceinPlay = boardPieces.find(({ space }) => space === id);

        if (typeof pieceinPlay !== 'undefined') {
            return <GamePiece color={pieceinPlay.color} />
        }
    };

    const displayMoves = (moves) => {
        let occupiedSpaces = [];

        for (let count = 0; count < moves.length; count++) {
            let move = moves[count].move;
            if (typeof move === 'string') {
                let safeHome = move.includes(`${currColor}Safe`) && move.includes(`${currColor}Home`);
                console.log(safeHome)
                if (!safeHome) {
                    occupiedSpaces.push(moves[count].position)
                }
            } else {
                occupiedSpaces.push(move)
            }
        }

        return occupiedSpaces;
    }

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

    const pieceMove = (move, moves) => {
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

    const spaceGenerator = (direction, width, outlier, orientation) => {
        let row = [];
        let size = typeof (width) === 'undefined' ? 47 : width;
        let singlePoint;
        const moves = movesPossible;

        if (outlier === 'start' && orientation === 'normal') {
            singlePoint = 1;
        }
        else if (outlier === 'start' && orientation === 'flipped') {
            singlePoint = 42
        }
        else if (outlier === 'end' && orientation === 'normal') {
            singlePoint = 28;
        }
        else {
            singlePoint = 43;
        }

        if (direction === 'horizontal') {
            let action = displayMoves(moves).includes(singlePoint) ? () => pieceMove(singlePoint, moves) : () => { };

            row.push(
                <div
                    id={`box-${singlePoint}`}
                    key={singlePoint}
                    onClick={action}
                    style={{
                        width: size,
                        height: 43,
                        backgroundColor: displayMoves(moves).includes(singlePoint) ? colors[currColor] : 'transparent',
                        border: displayMoves(moves).includes(singlePoint) ? '2px solid black' : 'transparent'
                    }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                        {displayPiece(singlePoint)}
                    </div>
                </div>
            )
        }

        for (let i = 1; i < 14; i++) {
            let id = orientation === 'flipped' ? 42 - i : i + 1;
            let action = displayMoves(moves).includes(id) ? () => pieceMove(id, moves) : () => { };

            if (direction === 'horizontal') {
                row.push(
                    <div
                        key={id}
                        id={`box-${id}`}
                        onClick={action}
                        style={{
                            width: size, height: 43,
                            backgroundColor: displayMoves(moves).includes(id) ? colors[currColor] : 'transparent',
                            border: displayMoves(moves).includes(id) ? '2px solid black' : 'transparent'
                        }}>
                        <div style={{ marginTop: 7, marginLeft: 7 }}>
                            {displayPiece(id)}
                        </div>
                    </div>
                )
            } else {
                let id = orientation === 'flipped' ? 57 - i : i + 14
                let action = displayMoves(moves).includes(id) ? () => pieceMove(id, moves) : () => { };

                row.push(
                    <div
                        key={id}
                        id={`box-${id}`}
                        onClick={action}
                        style={{
                            width: size, height: 43,
                            backgroundColor: displayMoves(moves).includes(id) ? colors[currColor] : 'transparent',
                            border: displayMoves(moves).includes(id) ? '2px solid black' : 'transparent'
                        }}>
                        <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                            {displayPiece(id)}
                        </div>
                    </div>
                )
            }
        }


        if (direction === 'vertical') {
            let action = displayMoves(moves).includes(singlePoint) ? () => pieceMove(singlePoint, moves) : () => { };

            row.push(
                <div
                    id={`box-${singlePoint}`}
                    key={singlePoint}
                    onClick={action}
                    style={{
                        width: size, height: 43,
                        backgroundColor: displayMoves(moves).includes(singlePoint) ? colors[currColor] : 'transparent',
                        border: displayMoves(moves).includes(singlePoint) ? '2px solid black' : 'transparent'
                    }}>
                    <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                        {displayPiece(singlePoint)}
                    </div>
                </div>
            )
        }

        return row;
    }


    return (
        <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start',
            width: '100%', height: '100%', position: 'absolute', border: '5px solid transparent'
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: 650 }}>
                {spaceGenerator('horizontal', undefined, 'start', 'normal')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: 47 }}>
                {spaceGenerator('vertical', undefined, 'end', 'flipped')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: 49 }}>
                {spaceGenerator('vertical', 49, 'end', 'normal')}

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: 650 }}>
                {spaceGenerator('horizontal', undefined, 'start', 'flipped')}
            </div>
        </div>
    );
};

export default GameOuterBoard;