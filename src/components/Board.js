import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setPlayerDetails } from "../redux/actions/game";

import InnerBoard from "./board/InnerBoard";
import OuterBoard from "./board/OuterBoard";
import GameInnerBoard from "./game/GameInnerBoard";
import GameOuterBoard from "./game/GameOuterBoard";

const Board = () => {

    const dispatch = useDispatch();

    const [angle, setAngle] = useState(0);

    let colors = ['red', 'blue'];

    const rotateBoard = () => {
        // let newAngle;

        // if (angle < 270) {
        //     newAngle = angle + 90;
        // } else {
        //     newAngle= 0;
        // }

        // setAngle(newAngle);
        dispatch(setPlayerDetails(colors[0]))
        colors.shift();
        console.log(colors)
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
