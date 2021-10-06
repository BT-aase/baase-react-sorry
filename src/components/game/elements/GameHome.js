import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PieceMove from "../../tools/PieceMovers";

import GamePiece from "./GamePiece";
import colors from "../../colors";

const zoneAdj = (side) => side === 'horizontal' ? 512 : 506;
const homeAdj = (side) => side === 'horizontal' ? 484 : 478;

const GameHome = (props) => {
    const piecesStart = [...Array(props.startPieces)].map((e, i) => <GamePiece color={props.color} key={i} />);

    const dispatch = useDispatch();
    let boardSide = useSelector((state) => state.game.gameSide);
    let movesPossible = useSelector((state) => state.game.possibleMoves);
    let boardPieces = useSelector((state) => state.game.piecesInPlay);

    const displayPiece = (id) => {
        let pieceinPlay = boardPieces.find(({ space }) => space === id);

        if (typeof pieceinPlay !== 'undefined') {
            return <GamePiece color={pieceinPlay.color} />
        }
    };

    const pieceMover = (space) => {
        return PieceMove(space, movesPossible, boardSide, null, boardPieces, dispatch);
    }

    return (
        <div>
            <div
                id={`${props.color}Start`}
                onClick={props.moves.includes(`${boardSide}Start`) && boardSide ? props.onStart : () => { }}
                style={{
                    width: 100,
                    height: 100,
                    marginLeft: 393,
                    marginTop: 610,
                    borderRadius: 70,
                    border: '3px solid black',
                    backgroundColor: props.moves.includes(`${boardSide}Start`) && boardSide === props.color ? colors[boardSide] : 'transparent',
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
                onClick={props.moves.includes(`${boardSide}Home`) && boardSide ? () => pieceMover(`${props.color}Home`) : () => { }}
                style={{
                    width: 100,
                    height: 100,
                    marginLeft: homeAdj(props.side),
                    marginTop: 375,
                    borderRadius: 70,
                    border: '3px solid black',
                    backgroundColor: props.moves.includes(`${boardSide}Home`) && boardSide === props.color ? colors[boardSide] : 'transparent',
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
                <div
                    id={`${props.color}Safe5`}
                    onClick={props.moves.includes(`${boardSide}Safe5`) && boardSide ? () => pieceMover(`${props.color}Safe5`) : () => { }}
                    style={{
                        width: 46, height: 47,
                        backgroundColor: props.moves.includes(`${boardSide}Safe5`) && boardSide === props.color ? colors[boardSide] : 'transparent',
                        border: '3px solid black', borderBottom: 0
                    }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                    {displayPiece(`${props.color}Safe5`)}
                    </div>
                </div>
                <div
                    id={`${props.color}Safe4`}
                    onClick={props.moves.includes(`${boardSide}Safe4`) && boardSide ? () => pieceMover(`${props.color}Safe4`) : () => { }}
                    style={{
                        width: 46, height: 47,
                        backgroundColor: props.moves.includes(`${boardSide}Safe4`) && boardSide === props.color ? colors[boardSide] : 'transparent',
                        border: '3px solid black', borderBottom: 0
                    }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                    {displayPiece(`${props.color}Safe4`)}
                    </div>
                </div>
                <div
                    id={`${props.color}Safe3`}
                    onClick={props.moves.includes(`${boardSide}Safe3`) && boardSide ? () => pieceMover(`${props.color}Safe3`) : () => { }}
                    style={{
                        width: 46, height: 47,
                        backgroundColor: props.moves.includes(`${boardSide}Safe3`) && boardSide === props.color ? colors[boardSide] : 'transparent',
                        border: '3px solid black', borderBottom: 0
                    }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                    {displayPiece(`${props.color}Safe3`)}
                    </div>
                </div>
                <div
                    id={`${props.color}Safe2`}
                    onClick={props.moves.includes(`${boardSide}Safe2`) && boardSide ? () => pieceMover(`${props.color}Safe2`) : () => { }}
                    style={{
                        width: 46, height: 47,
                        backgroundColor: props.moves.includes(`${boardSide}Safe2`) && boardSide === props.color ? colors[boardSide] : 'transparent',
                        border: '3px solid black', borderBottom: 0
                    }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                    {displayPiece(`${props.color}Safe2`)}
                    </div>
                </div>
                <div
                    id={`${props.color}Safe1`}
                    onClick={props.moves.includes(`${boardSide}Safe1`) && boardSide ? () => pieceMover(`${props.color}Safe1`) : () => { }}
                    style={{
                        width: 46, height: 47,
                        backgroundColor: props.moves.includes(`${boardSide}Safe1`) && boardSide === props.color ? colors[boardSide] : 'transparent',
                        border: '3px solid black', borderBottom: 0
                    }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                        {displayPiece(`${props.color}Safe1`)}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default GameHome;