import React from "react";

import { useSelector } from 'react-redux';

import Board from "./Board";
import Start from "./Start";
import Win from './Win';


const View = () => {

    let gameStatus = useSelector((state) => state.game.gameStarted);
    let gameWon = useSelector((state) => state.game.gameWon);

    let viewDisplay = gameStatus ?
        <>
            <Board />
            {gameWon && <Win />}
        </>
        : <Start />

    return (
        viewDisplay
    )

};

export default View;