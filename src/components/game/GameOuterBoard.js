import React from "react";
import { useSelector } from "react-redux";

import GamePiece from "./elements/GamePiece";

const displayPiece = (id) => {
    let boardPieces = useSelector((state) => state.game.piecesInPlay);
    let pieceinPlay = boardPieces.find(({ space }) => space === id);

    if (typeof pieceinPlay !== 'undefined') {
        return <GamePiece color={pieceinPlay.color} />
    }
};

const displayMoves = () => {
    let occupiedSpaces = [];

    let moveSpaces = useSelector((state) => state.game.possibleMoves);
    for (let count = 0; count < moveSpaces.length; count++) {
        occupiedSpaces.push(moveSpaces[count].move)
    }

    return occupiedSpaces;
}

const spaceGenerator = (direction, width, outlier, orientation) => {
    let row = [];
    let size = typeof (width) === 'undefined' ? 47 : width;
    let singlePoint;


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
        row.push(
            <div
                id={`box-${singlePoint}`}
                style={{
                    width: size,
                    height: 43,
                    backgroundColor: displayMoves().includes(singlePoint) ? 'red' : 'transparent',
                    border: displayMoves().includes(singlePoint) ? '2px solid black' : 'transparent'
                }}>
                <div style={{ marginTop: 7, marginLeft: 7 }}>
                    {displayPiece(singlePoint)}
                </div>
            </div>
        )
    }

    for (let i = 1; i < 14; i++) {
        let id = orientation === 'flipped' ? 42 - i : i + 1;
        if (direction === 'horizontal') {
            row.push(
                <div
                    id={`box-${id}`}
                    style={{
                        width: size, height: 43,
                        backgroundColor: displayMoves().includes(id) ? 'red' : 'transparent',
                        border: displayMoves().includes(id) ? '2px solid black' : 'transparent'
                    }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                        {displayPiece(id)}
                    </div>
                </div>
            )
        } else {
            let id = orientation === 'flipped' ? 57 - i : i + 14
            row.push(
                <div id={`box-${id}`}
                    style={{
                        width: size, height: 43,
                        backgroundColor: displayMoves().includes(id) ? 'red' : 'transparent',
                        border: displayMoves().includes(id) ? '2px solid black' : 'transparent'
                    }}>
                    <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                        {displayPiece(id)}
                    </div>
                </div>
            )
        }
    }


    if (direction === 'vertical') {
        row.push(
            <div
                id={`box-${singlePoint}`}
                style={{
                    width: size, height: 43,
                    backgroundColor: displayMoves().includes(singlePoint) ? 'red' : 'transparent',
                    border: displayMoves().includes(singlePoint) ? '2px solid black' : 'transparent'
                }}>
                <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                    {displayPiece(singlePoint)}
                </div>
            </div>
        )
    }

    return row;
}

const GameOuterBoard = () => {
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