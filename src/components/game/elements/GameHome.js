import React from "react";
import GamePiece from "./GamePiece";

const zoneAdj = (side) => side === 'horizontal' ? 512 : 506;
const homeAdj = (side) => side === 'horizontal' ? 484 : 478;

const Home = (props) => {
    return (
        <div>
            <div style={{
                width: 100,
                height: 100,
                marginLeft: 393,
                marginTop: 610,
                borderRadius: 70,
                border: '3px solid black',
                backgroundColor: 'transparent',
                position: 'absolute'
            }}>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                    width: 65, height: 70, marginLeft: 15, marginTop: 10
                }}>
                    <GamePiece />
                    <GamePiece />
                    <GamePiece />
                    <GamePiece />
                </div>
            </div>
            <div style={{ position: 'absolute', marginTop: 690, marginLeft: 420 }}>
                <div style={{ width: 46, height: 20, backgroundColor: 'transparent' }} />
            </div>
            <div style={{
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
                    <GamePiece />
                    <GamePiece />
                    <GamePiece />
                    <GamePiece />
                </div>
            </div>
            <div style={{ position: 'absolute', marginTop: 455, marginLeft: zoneAdj(props.side), zIndex: 10 }}>
                <div style={{ width: 46, height: 20, backgroundColor: 'transparent' }} />
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }}>
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <GamePiece />
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <GamePiece />
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <GamePiece />
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <GamePiece />
                    </div>
                </div>
                <div style={{ width: 46, height: 46, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }}>
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <GamePiece />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;