import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDeck, drawCard, startActions, displayMoves, endTurn } from "../../redux/actions/game";

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
            const startPieces = playerStartPieces.find(selectPlayer => selectPlayer.playerNum === player.playerNum);
            return startPieces.pieces;
        } else {
            return 0;
        }
    }

    const showMoves = () => {
        let occupiedSpaces = [];
        let moveSpaces = useSelector((state) => state.game.possibleMoves);
        for (let count = 0; count < moveSpaces.length; count++) {
            occupiedSpaces.push(moveSpaces[count].move)
        }

        return occupiedSpaces;
    }

    const endMove = () => {
        setTimeout(function () { dispatch(endTurn()) }, 1000);
    };

    return (
        <div style={{
            position: 'fixed', bottom: 48, left: 52,
            height: 604, width: 554, backgroundColor: 'transparent'
        }}>
            <div>
                <div style={{
                    position: 'fixed', left: 2, top: -57
                }}>
                    <GameHome
                        color='red'
                        side='horizontal'
                        startPieces={startPieces('red')}
                        moves={showMoves()}
                        onStart={() => { dispatch(startActions('red', 'out'), endMove()) }}
                    />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(90deg)',
                    right: -101, top: 55
                }}>
                    <GameHome
                        color='blue'
                        startPieces={startPieces('blue')}
                        moves={showMoves()}
                        onStart={() => dispatch(startActions('blue', 'out'), endMove())}
                    />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(180deg)',
                    bottom: -57, right: 4
                }}>
                    <GameHome
                        color='yellow'
                        side='horizontal'
                        startPieces={startPieces('yellow')}
                        moves={showMoves()}
                        onStart={() => dispatch(startActions('yellow', 'out'), endMove())}
                    />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(270deg)',
                    left: -103, top: 640
                }}>
                    <GameHome
                        color='green'
                        startPieces={startPieces('green')}
                        moves={showMoves()}
                        onStart={() => dispatch(startActions('green', 'out'), endMove())}
                    />
                </div>
            </div>
            <div>
                {currentCard !== 0 ?
                    <div style={{
                        position: 'fixed', top: 170, left: 220, backgroundColor: "#cce3be"
                    }}>
                        <Card
                            reshuffle={deckCount === 0 ? () => dispatch(createDeck()) : () => {}}
                            number={currentCard}
                        />
                    </div> :
                    <></>
                }
                {deckCount !== 0 ?
                    <div style={{
                        position: 'fixed', top: 385, left: 220, backgroundColor: "#cce3be"
                    }}>
                        <Card
                            onClick={() => dispatch(drawCard())}
                            displayMoves={() => dispatch(displayMoves())}
                        />
                    </div> :
                    <></>
                }
            </div>
        </div>
    );
};

export default GameInnerBoard;