import React from "react";

import colors from "../../colors";

const GamePiece = (props) => {

    let color = colors[props.color];

    return (
        <div style={{
            width: 30, height: 30, border: '1px solid black',
            borderRadius: 20, backgroundColor: color,

        }}>
            <div style={{
                width: 15, height: 15, border: '1px solid black',
                borderRadius: 20, backgroundColor: color,
                marginTop: 6.5, marginLeft: 6.5
            }}></div>
        </div>
    )
}

export default GamePiece;