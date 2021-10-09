import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { endTurn } from "../redux/actions/game";

import InnerBoard from "./board/InnerBoard";
import OuterBoard from "./board/OuterBoard";
import GameInnerBoard from "./game/GameInnerBoard";
import GameOuterBoard from "./game/GameOuterBoard";

const Board = () => {

    const dispatch = useDispatch();

    let currColor = useSelector((state) => state.game.gameSide);
    let movesPossible = useSelector((state) => state.game.possibleMoves);
    let movingPiece = useSelector((state) => state.game.moveInProgress);
    let cardDrawn = useSelector((state) => state.game.cardDrawn);

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

        setAngle(newAngle);
    }

    useEffect(() => {
        rotateBoard(currColor)
    }, [currColor]);

    useEffect(() => {
        if (movesPossible.length === 0 && cardDrawn && !movingPiece) {
            setTimeout(function () { dispatch(endTurn()) }, 1000);
        }
    }, [cardDrawn])

    let onlySwap = typeof (movesPossible.find(move => move.move !== 'swap')) === 'undefined';

    return (
        <div>
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
            {cardDrawn && onlySwap &&
                <div style={{
                    position: 'fixed', width: 150, height: 40, textAlign: 'center', color: 'white',
                    backgroundColor: '#000058', top: 5, left: 450, border: '2px solid white', borderRadius: 25
                }}
                    onClick={() => dispatch(endTurn())}
                >
                    <p style={{marginTop: 5}}>FORFEIT TURN</p>
                </div>
            }
        </div>
    );
};

export default Board;
