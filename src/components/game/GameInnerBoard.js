import React from "react";
import GameHome from './elements/GameHome';
import Card from './elements/Card';

const GameInnerBoard = () => {

    let currentCard = 5;
    let deckCount = 10;

    return (
        <div style={{
            position: 'fixed', bottom: 48, left: 52,
            height: 604, width: 554, backgroundColor: 'transparent'
        }}>
            <div>
                <div style={{
                    position: 'fixed', left: 2, top: -57
                }}>
                    <GameHome color='red' side='horizontal' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(90deg)',
                    right: -101, top: 55
                }}>
                    <GameHome color='#1464F4' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(180deg)',
                    bottom: -57, right: 4
                }}>
                    <GameHome color='yellow' side='horizontal' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(270deg)',
                    left: -103, top: 640
                }}>
                    <GameHome color='green' />
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
                        <Card />
                    </div> :
                    <></>
                }
            </div>
        </div>
    );
};

export default GameInnerBoard;