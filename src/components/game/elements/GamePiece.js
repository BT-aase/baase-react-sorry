import React from "react";

const GamePiece = (props) => {
    return (
        <div style={{
            width: 30, height: 30, border: '1px solid black',
            borderRadius: 20, backgroundColor: '#1464F4',

        }}>
            <div style={{
                width: 15, height: 15, border: '1px solid black',
                borderRadius: 20, backgroundColor: '#1464F4',
                marginTop: 6.5, marginLeft: 6.5
            }}></div>
        </div>
    )
}

export default GamePiece;