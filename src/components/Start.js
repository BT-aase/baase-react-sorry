import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { startGame, createDeck } from "../redux/actions/game";

import colors from "./colors";

const Start = () => {

    const dispatch = useDispatch();

    const [numOfPlayers, setNumOfPlayers] = useState(0);
    const [playerColors, setPlayerColors] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [gameColors, setGameColors] = useState([]);
    const [startingPlayer, setStartingPlayer] = useState(0);


    let playerCircles = [];
    let colorCircles = [];
    let startingCircles = [];

    for (let a = 2; a < 5; a++) {
        playerCircles.push(
            <div
                key={a}
                style={{
                    height: 60, width: 60, borderRadius: 65,
                    backgroundColor: numOfPlayers !== 0 && numOfPlayers !== a ? 'gray' : 'white',
                    color: numOfPlayers !== 0 && numOfPlayers !== a ? 'white' : '#000058'
                }}
                onClick={numOfPlayers === 0 ? () => setNumOfPlayers(a) : () => { }}>
                <p style={{ marginLeft: 25, paddingTop: 10, fontSize: 24 }}>{a}</p>
            </div>
        )
    }

    const boardColors = ['red', 'blue', 'yellow', 'green'];

    const colorSet = (color) => {
        setGameColors([...gameColors, color])
        setPlayerColors([...playerColors, { playerNum: currentPlayer, color }])

        if (currentPlayer !== numOfPlayers) {
            setCurrentPlayer(currentPlayer + 1);
        }
    }


    for (let b = 0; b < 4; b++) {
        colorCircles.push(
            <div
                key={b}
                style={{
                    height: 60, width: 60, borderRadius: 65,
                    backgroundColor: gameColors.includes(boardColors[b]) ? 'gray' : colors[boardColors[b]],
                    border: '2px solid white'
                }}
                onClick={() => colorSet(boardColors[b])}
            />
        )
    }

    for (let d = 1; d < numOfPlayers + 1; d++) {
        if (playerColors.length === numOfPlayers) {
            startingCircles.push(
                <div
                    key={d}
                    style={{
                        height: 60, width: 60, borderRadius: 65,
                        backgroundColor: startingPlayer !== 0 && startingPlayer !== d ? 'gray' : colors[playerColors[d - 1].color],
                        color: startingPlayer !== 0 && startingPlayer !== d ? 'white' : '#000058',
                        border: '2px solid white'
                    }}
                    onClick={startingPlayer === 0 ? () => setStartingPlayer(d) : () => { }}>
                    <p style={{ marginLeft: 23, paddingTop: 10, fontSize: 24 }}>{d}</p>
                </div>
            )
        }
    }

    const gameStart = () => {
        let startingColor = playerColors.find(player => player.playerNum === startingPlayer);
        dispatch(startGame(playerColors, startingColor.color));
        dispatch(createDeck());
    }

    return (
        <div style={{
            height: 700,
            width: 660,
            left: 170,
            top: 30,
            position: 'fixed',
            backgroundColor: '#000058'
        }}>
            <div style={{ textAlign: 'center', marginTop: 10 }}><p style={{ color: 'white', fontSize: 30 }}>- Welcome to Sorry -</p></div>
            <div style={{ marginLeft: 150 }}>
                <div>
                    <p style={{ color: 'white', fontSize: 24, marginLeft: 75 }}>How many players?</p>
                    <div style={{ display: 'flex', width: 300, justifyContent: 'space-between', marginLeft: 25 }}>
                        {playerCircles}
                    </div>
                </div>
                {numOfPlayers !== 0 &&
                    <div style={{ marginTop: 50 }}>
                        <p style={{ color: 'white', fontSize: 24, marginLeft: 50 }}>Player {currentPlayer}, select your color</p>
                        <div style={{ display: 'flex', width: 350, justifyContent: 'space-between', marginLeft: 10 }}>
                            {colorCircles}
                        </div>
                    </div>
                }
                {numOfPlayers !== 0 && playerColors.length === numOfPlayers &&
                    <div style={{ marginTop: 50, marginLeft: 40 }}>
                        <p style={{ color: 'white', fontSize: 24 }}>Choose a player to go first</p>
                        <div style={{ display: 'flex', width: 295, justifyContent: 'space-between' }}>
                            {startingCircles}
                        </div>
                    </div>
                }
                {startingPlayer !== 0 &&
                    <div style={{ marginTop: 50, marginLeft: 60 }}>
                        <div style={{
                            height: 50, width: 250, backgroundColor: '#23e000',
                            borderRadius: 25, textAlign: 'center'
                        }}
                            onClick={() => gameStart()}
                        >
                            <p style={{ color: 'white', fontSize: 24, paddingTop: 5 }}>Start Game</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Start;
