import React from "react";
import GamePiece from "./elements/GamePiece";

const spaceGenerator = (direction, width) => {
    let row = [];
    let size = typeof (width) === 'undefined' ? 47 : width;

    if (direction === 'horizontal') {
        row.push(
            <div style={{ width: size, height: 43 }}>
                <div style={{ marginTop: 7, marginLeft: 7 }}>
                    <GamePiece />
                </div>
            </div>
        )
    }

    for (let i = 1; i < 14; i++) {
        if (direction === 'horizontal') {
            row.push(
                <div style={{ width: size, height: 43 }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                        <GamePiece />
                    </div>
                </div>
            )
        } else {
            row.push(
                <div style={{ width: size, height: 43 }}>
                    <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                        <GamePiece />
                    </div>
                </div>
            )
        }
    }

    if (direction === 'vertical') {
        row.push(
            <div style={{ width: size, height: 43 }}>
                <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                    <GamePiece />
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
                {spaceGenerator('horizontal')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: 47 }}>
                {spaceGenerator('vertical')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: 49 }}>
                {spaceGenerator('vertical', 49)}

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: 650 }}>
                {spaceGenerator('horizontal')}
            </div>
        </div>
    );
};

export default GameOuterBoard;