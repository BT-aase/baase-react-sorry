import React from "react";

const GameSpace = () => {
    return (
        <div
            id={`box-${id}`}
            key={id}
            style={{
                width: size,
                height: 43,
                backgroundColor: displayMoves(moves).includes(id) ? colors[currColor] : 'transparent',
                border: displayMoves(moves).includes(id) ? '2px solid black' : 'transparent'
            }}>
            <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                {displayPiece(id)}
            </div>
        </div>
    )
}

export default GameSpace