import React from "react";

import colors from "../../colors";

const shadeColors = {
    red: '#cc0000',
    blue: '#1050c3',
    yellow: '#cccc00',
    green: '#006600',
}

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
                marginTop: 6.5, marginLeft: 6.5,
                boxShadow: `0 0 0 2px ${shadeColors[props.color]}`
            }}></div>
        </div>
    )
}

export default GamePiece;