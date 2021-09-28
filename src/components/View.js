import React from "react";

import { useSelector } from 'react-redux';

import Board from "./Board";
import Start from "./Start";


const View = () => {

    let gameStatus = useSelector((state) => state.game.gameStarted);

    let viewDisplay = gameStatus ? <Board /> : <Start />

    return (
        viewDisplay
    )

};

export default View;