import React from "react";

const InnerBoard = () => {
    return (
        <div>
            <div style={{
                width: 135,
                height: 135,
                marginLeft: 580,
                marginTop: 290,
                borderRadius: 70,
                border: '3px solid black',
                backgroundColor: 'white',
                zIndex: 15,
                position: 'absolute'
            }}>
                <div style={{
                    width: 120,
                    height: 120,
                    marginLeft: 5,
                    marginTop: 5,
                    borderRadius: 70,
                    border: '3px solid black',
                    backgroundColor: 'black',
                    zIndex: 15,
                    position: 'absolute'
                }}>
                    <svg height="200" width="200">
                        <polygon points="0,35 115,35 60,120" style={{ fill: 'white'}} />
                        <polygon points="5,90 110,90 60,0" style={{ fill: 'white'}} />
                        <polygon points="10,40 105,40 60,110" style={{ fill: 'green'}} />
                        <polygon points="15,85 100,85 60,10" style={{ fill: 'green'}} />
                    </svg>
                </div>
            </div>
            <div style={{ position: 'absolute', marginTop: 409, zIndex: 10 }}>
                <div style={{
                    width: 72,
                    height: 20,
                    marginLeft: 610,
                    backgroundColor: 'black',
                }} />
                <div style={{
                    width: 72,
                    height: 53,
                    marginLeft: 610,
                    backgroundColor: 'white',
                    border: '3px solid black',
                    borderBottom: 0
                }}>
                    <div style={{
                        width: 62,
                        height: 45,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            marginLeft: 3,
                            marginTop: -2,
                            fontWeight: 'bold'
                        }}>N E</p>
                    </div>
                </div>
                <div style={{ width: 72, height: 53, marginLeft: 610, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{
                        width: 62,
                        height: 45,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            marginLeft: 3,
                            marginTop: -10,
                            fontWeight: 'bold'
                        }}>Z O</p>
                    </div>
                </div>
                <div style={{ width: 72, height: 53, marginLeft: 610, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{
                        width: 62,
                        height: 45,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            marginLeft: 1,
                            marginTop: -2,
                            fontWeight: 'bold'
                        }}>T Y</p>
                    </div>
                </div>
                <div style={{ width: 72, height: 53, marginLeft: 610, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{
                        width: 62,
                        height: 45,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            marginLeft: 3,
                            fontWeight: 'bold'
                        }}>A F E</p>
                    </div>
                </div>
                <div style={{ width: 72, height: 53, marginLeft: 610, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{
                        width: 62,
                        height: 45,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            marginLeft: 5,
                            marginTop: -25,
                            fontWeight: 'bold'
                        }}>S</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerBoard;