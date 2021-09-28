import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import colors from "./colors";

const Start = () => {

    const dispatch = useDispatch();

    const [numOfPlayers, setNumOfPlayers] = useState(0);
    const [playerColors, setPlayerColors] = useState([]);


    let playerCircles = [];
    let colorCircles = [];

    for (let a = 2; a < 5; a++) {
        playerCircles.push(
            <div style={{
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

    for (let b = 0; b < 4; b++) {
        colorCircles.push(
            <div style={{ height: 60, width: 60, borderRadius: 65, backgroundColor: colors[boardColors[b]], border: '2px solid white' }} />
        )
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
                    <p style={{ color: 'white', fontSize: 24 }}>How many players?</p>
                    <div style={{ display: 'flex', width: 300, justifyContent: 'space-between', marginLeft: 20 }}>
                        {playerCircles}
                    </div>
                </div>
                {numOfPlayers !== 0 &&
                    <div style={{ marginTop: 50 }}>
                        <p style={{ color: 'white', fontSize: 24 }}>Player 1, select your color -</p>
                        <div style={{ display: 'flex', width: 350, justifyContent: 'space-between' }}>
                            {colorCircles}
                        </div>
                    </div>
                }
                {numOfPlayers !== 0 &&
                    <div style={{ marginTop: 50 }}>
                        <p style={{ color: 'white', fontSize: 24 }}>Choose a player to go first -</p>
                    </div>
                }
            </div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Start;
