import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { movePiece, swapPiece, startActions, showSwappable } from "../../redux/actions/game";

import GamePiece from "./elements/GamePiece";

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

        console.log(moves);

        for (let count = 0; count < moves.length; count++) {
            if (typeof moves[count].move === 'string') {
                occupiedSpaces.push(moves[count].position)
            } else {
                occupiedSpaces.push(moves[count].move)
            }
        }

        return occupiedSpaces;
    }

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
            } else if (movingPiece.move === 'swap') {
                if (Object.entries(swapSelected).length == 0) {
                    let swapPiece = boardPieces.find(piece => piece.space === movingPiece.position);
                    let swapPieces = boardPieces.filter(piece => piece.color === currColor);
                    dispatch(showSwappable(swapPiece, swapPieces))
                } else {
                    dispatch(swapPiece(movingPiece.position, swapSelected.color));
                    dispatch(swapPiece(swapSelected.space, currColor));
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

                const moveAction = () => {
                    setTimeout(function () {
                        dispatch(movePiece(wrapBoard(a), wrapBoard(a + 1)))
                        a++;
                        if (a < movingPiece.move || a === 56) {
                            moveAction();
                        } else if (a >= 57) {
                            a = a - 56;
                            moveAction();
                        }
                    }, 1000)
                }

                moveAction();
            } else {
                let b = movingPiece.position;

                const moveAction = () => {
                    setTimeout(function () {
                        dispatch(movePiece(wrapBoard(b), wrapBoard(b - 1)))
                        b--;
                        if (b > movingPiece.move || b === 1) {
                            moveAction();
                        } else if (b <= 0) {
                            b = b + 56;
                            moveAction();
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
                    onClick={action}
                    style={{
                        width: size,
                        height: 43,
                        backgroundColor: displayMoves(moves).includes(singlePoint) ? 'red' : 'transparent',
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
                        id={`box-${id}`}
                        onClick={action}
                        style={{
                            width: size, height: 43,
                            backgroundColor: displayMoves(moves).includes(id) ? 'red' : 'transparent',
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
                        id={`box-${id}`}
                        onClick={action}
                        style={{
                            width: size, height: 43,
                            backgroundColor: displayMoves(moves).includes(id) ? 'red' : 'transparent',
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
                    onClick={action}
                    style={{
                        width: size, height: 43,
                        backgroundColor: displayMoves(moves).includes(singlePoint) ? 'red' : 'transparent',
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