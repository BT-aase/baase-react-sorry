import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createDeck } from "../redux/actions/game";

import InnerBoard from "./board/InnerBoard";
import OuterBoard from "./board/OuterBoard";
import GameInnerBoard from "./game/GameInnerBoard";
import GameOuterBoard from "./game/GameOuterBoard";

const Board = () => {

    let currColor = useSelector((state) => state.game.gameSide);
    let deck = useSelector((state) => state.game.cardDeck);

    const dispatch = useDispatch();

    if (deck.length === 0) {
        dispatch(createDeck());
    };

    const [angle, setAngle] = useState(0);

    const rotateBoard = (color) => {
        let newAngle;

        switch (color) {
            case 'red':
                newAngle = 0;
                break;
            case 'blue':
                newAngle = 270;
                break;
            case 'yellow':
                newAngle = 180;
                break;
            case 'green':
                newAngle = 90;
                break;
            default:
                break;
        }

        setAngle(newAngle)
    }

    useEffect(() => {
        rotateBoard(currColor)
    }, [currColor]);

    return (
        <div style={{
            height: 700,
            width: 660,
            left: 170,
            top: 30,
            position: 'fixed',
            transform: `rotate(${angle}deg)`
        }}
        >
            <OuterBoard />
            <InnerBoard />
            <GameOuterBoard />
            <GameInnerBoard />
        </div>
    );
};

export default Board;
