import React from "react";
import { useSelector } from "react-redux";

import GamePiece from "./GamePiece";
import colors from "../../colors";

const zoneAdj = (side) => side === 'horizontal' ? 512 : 506;
const homeAdj = (side) => side === 'horizontal' ? 484 : 478;

const GameHome = (props) => {
    const piecesStart = [...Array(props.startPieces)].map((e, i) => <GamePiece color={props.color} key={i} />);
    let boardSide = useSelector((state) => state.game.gameSide);

    return (
        <div>
            <div
                id={`${props.color}Start`}
                onClick={props.moves.includes(`${boardSide}Home`) && boardSide ? props.onStart : () => { }}
                style={{
                    width: 100,
                    height: 100,
                    marginLeft: 393,
                    marginTop: 610,
                    borderRadius: 70,
                    border: '3px solid black',
                    backgroundColor: props.moves.includes(`${boardSide}Home`) && boardSide === props.color ? colors[boardSide] : 'transparent',
                    position: 'absolute'
                }}>
                <div
                    style={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                        width: 65, height: 70, marginLeft: 15, marginTop: 10
                    }}>
                    {piecesStart}
                </div>
            </div>
            <div style={{ position: 'absolute', marginTop: 690, marginLeft: 420 }}>
                <div style={{ width: 46, height: 20, backgroundColor: 'transparent' }} />
            </div>
            <div
                id={`${props.color}Home`}
                style={{
                    width: 100,
                    height: 100,
                    marginLeft: homeAdj(props.side),
                    marginTop: 375,
                    borderRadius: 70,
                    border: '3px solid black',
                    backgroundColor: 'transparent',
                    position: 'absolute'
                }}>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                    width: 65, height: 70, marginLeft: 15, marginTop: 15
                }}>
                </div>
            </div>
            <div style={{ position: 'absolute', marginTop: 455, marginLeft: zoneAdj(props.side), zIndex: 10 }}>
                <div style={{ width: 46, height: 20, backgroundColor: 'transparent' }} />
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }}>
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                    </div>
                </div>
                <div style={{ width: 46, height: 46, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }}>
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default GameHome;