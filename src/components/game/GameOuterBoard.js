import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { movePiece } from "../../redux/actions/game";

import GamePiece from "./elements/GamePiece";

const GameOuterBoard = () => {

    const dispatch = useDispatch();

    const moveSpaces = () => {
        return useSelector((state) => state.game.possibleMoves);
    }

    const displayPiece = (id) => {
        let boardPieces = useSelector((state) => state.game.piecesInPlay);
        let pieceinPlay = boardPieces.find(({ space }) => space === id);

        if (typeof pieceinPlay !== 'undefined') {
            return <GamePiece color={pieceinPlay.color} />
        }
    };

    const displayMoves = (moves) => {
        let occupiedSpaces = [];

        for (let count = 0; count < moves.length; count++) {
            occupiedSpaces.push(moves[count].move)
        }

        return occupiedSpaces;
    }

    const pieceMove = (move, moves) => {

        let movingPiece = moves.find(piece => piece.move === move);
        
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

    const spaceGenerator = (direction, width, outlier, orientation) => {
        let row = [];
        let size = typeof (width) === 'undefined' ? 47 : width;
        let singlePoint;
        const moves = moveSpaces();

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