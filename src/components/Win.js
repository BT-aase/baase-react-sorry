import React from "react";
import { useDispatch, useSelector } from 'react-redux';
const remote = require('electron').remote;

import colors from "./colors";

const Win = () => {

    const homePieces = useSelector((state) => state.game.playerHomePieces);
    const playerColors = useSelector((state) => state.game.playerColors);
    let winningPlayer = homePieces.find(home => home.pieces === 4);
    let winningColor = playerColors.find(player => player.playerNum === winningPlayer.playerNum);

    // setTimeout(function () {
    //     var window = remote.getCurrentWindow();
    //     window.close();
    // }, 2000)



    return (
        <div style={{
            height: 400,
            width: 420,
            left: 300,
            top: 190,
            position: 'fixed',
            backgroundColor: '#fff',
            border: '5px solid #ff6700'
        }}>
            <div style={{
                height: 350,
                width: 370,
                left: 325,
                top: 215,
                position: 'fixed',
                backgroundColor: '#000058',
            }}>
                <div>
                    <div>
                        <p style={{ color: '#fff' }}>Congratulations!</p>
                        <p style={{ color: colors[winningColor.color] }}>Player {winningPlayer.playerNum}</p>
                        <p style={{ color: '#fff' }}>has won the game!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Win;
