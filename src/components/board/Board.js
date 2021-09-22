import React, { useState } from "react";
import InnerBoard from "./InnerBoard";
import OuterBoard from "./OuterBoard";
import GameInnerBoard from "../game/GameInnerBoard";
import GameOuterBoard from "../game/GameOuterBoard";

const Board = () => {

    const [angle, setAngle] = useState(0);

    const rotateBoard = () => {
        let newAngle;

        if (angle < 270) {
            newAngle = angle + 90;
        } else {
            newAngle= 0;
        }

        setAngle(newAngle);
    } 

    return (
        <div style={{
            height: 700,
            width: 660,
            left: 100,
            position: 'fixed',
            transform: `rotate(${angle}deg)`
        }}
            onClick={
                () => rotateBoard(angle)
            }
        >
            <OuterBoard />
            <InnerBoard />
            <GameOuterBoard/>
            <GameInnerBoard/>
        </div>
    );
};

export default Board;
