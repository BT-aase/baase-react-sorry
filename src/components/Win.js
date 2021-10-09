import React from "react";
import { useDispatch, useSelector } from 'react-redux';
const remote = require('electron').remote;

import colors from "./colors";
import { restartGame } from "../redux/actions/game";

const Win = () => {

    const dispatch = useDispatch();

    const homePieces = useSelector((state) => state.game.playerHomePieces);
    const playerColors = useSelector((state) => state.game.playerColors);
    let winningPlayer = homePieces.find(home => home.pieces === 4);
    let winningColor = playerColors.find(player => player.playerNum === winningPlayer.playerNum);

    const closeWindow = () => {
        var window = remote.getCurrentWindow();
        window.close();
    }

    const restart = () => {
        dispatch(restartGame());
    }

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
                <div style={{ marginLeft: 85, marginTop: 25 }}>
                    <div>
                        <p style={{ color: '#fff', marginLeft: 11, fontSize: 24 }}>Congratulations!</p>
                        <p style={{
                            color: colors[winningColor.color], marginLeft: 45,
                            fontSize: 28, fontWeight: 700
                        }}>Player {winningPlayer.playerNum}</p>
                        <p style={{ color: '#fff', fontSize: 24 }}>has won the game!</p>
                    </div>
                </div>
                <div style={{ marginLeft: 85, marginTop: 25 }}>
                    <div>
                        <div
                            onClick={() => closeWindow()}
                            style={{
                                height: 50, width: 100, backgroundColor: '#ff6700',
                                borderRadius: 25, textAlign: 'center', border: '2px solid #fff',
                                marginLeft: 50
                            }}>
                            <p style={{ color: '#fff', fontSize: 24, paddingTop: 5 }}>OK</p>
                        </div>
                        <div
                            onClick={() => restart()}
                            style={{
                                height: 50, width: 200, backgroundColor: '#ff6700',
                                borderRadius: 25, textAlign: 'center', border: '2px solid #fff',
                                marginTop: 20
                            }}>
                            <p style={{ color: '#fff', fontSize: 24, paddingTop: 5 }}>Play Again</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Win;
