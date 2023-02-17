import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PieceMove from "../tools/PieceMovers";
import HorizSide from "./elements/outerBoard/sides/HorizSide";
import VertiSide from "./elements/outerBoard/sides/VertiSide";

const GameOuterBoard = () => {
    let currColor = useSelector((state) => state.game.gameSide);
    let movesPossible = useSelector((state) => state.game.possibleMoves);
    let boardPieces = useSelector((state) => state.game.piecesInPlay);
    let swapSelected = useSelector((state) => state.game.swapSelected);

    const pieceMover = (space) => {
        return PieceMove(space, movesPossible, currColor, swapSelected, boardPieces, useDispatch());
    }

    return (
        <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start',
            width: '100%', height: '100%', position: 'absolute', border: '5px solid transparent'
        }}>
            <HorizSide direction="normal"/>
            <VertiSide width={47} direction="flipped"/>
            <VertiSide width={49} direction="normal"/>
            <HorizSide direction="flipped"/>
        </div>
    );
};

export default GameOuterBoard;