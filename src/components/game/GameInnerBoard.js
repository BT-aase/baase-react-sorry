import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawCard } from "../../redux/actions/game";

import GameHome from './elements/GameHome';
import Card from './elements/Card';

const GameInnerBoard = () => {

    const dispatch = useDispatch();

    let currentCard = useSelector((state) => state.game.faceCard);
    let deckCount = useSelector((state) => state.game.cardDeck.length);

    const startPieces = (playerColor) => {
        const playerColors = useSelector((state) => state.game.playerColors);
        const playerStartPieces = useSelector((state) => state.game.playerStartPieces);
        const player = playerColors.find(({ color }) => color === playerColor);
        if (typeof player !== 'undefined') {
            const startPieces = playerStartPieces.find(({ playerNum }) => playerNum === player.playerNum);
            return startPieces.pieces;
        } else {
            return 0;
        }
    }

    return (
        <div style={{
            position: 'fixed', bottom: 48, left: 52,
            height: 604, width: 554, backgroundColor: 'transparent'
        }}>
            <div>
                <div style={{
                    position: 'fixed', left: 2, top: -57
                }}>
                    <GameHome color='red' side='horizontal' startPieces={startPieces('red')} />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(90deg)',
                    right: -101, top: 55
                }}>
                    <GameHome color='blue' startPieces={startPieces('blue')}/>
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(180deg)',
                    bottom: -57, right: 4
                }}>
                    <GameHome color='yellow' side='horizontal' startPieces={startPieces('yellow')}/>
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(270deg)',
                    left: -103, top: 640
                }}>
                    <GameHome color='green' startPieces={startPieces('green')}/>
                </div>
            </div>
            <div>
                {currentCard !== 0 ?
                    <div style={{
                        position: 'fixed', top: 170, left: 220, backgroundColor: "#cce3be"
                    }}>
                        <Card number={currentCard} />
                    </div> :
                    <></>
                }
                {deckCount !== 0 ?
                    <div style={{
                        position: 'fixed', top: 385, left: 220, backgroundColor: "#cce3be"
                    }}>
                        <Card onClick={() => dispatch(drawCard())}/>
                    </div> :
                    <></>
                }
            </div>
        </div>
    );
};

export default GameInnerBoard;