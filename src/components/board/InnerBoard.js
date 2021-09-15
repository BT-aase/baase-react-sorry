import React from "react";

const InnerBoard = () => {
    return (
        <div>
            <div style={{
                width: 100,
                height: 100,
                marginLeft: 518,
                marginTop: 190,
                borderRadius: 70,
                border: '3px solid black',
                backgroundColor: 'white',
                zIndex: 15,
                position: 'absolute'
            }}>
                <div style={{
                    width: 85,
                    height: 85,
                    marginLeft: 5,
                    marginTop: 5,
                    borderRadius: 70,
                    border: '3px solid black',
                    backgroundColor: 'black',
                    zIndex: 15,
                    position: 'absolute'
                }}>
                    <svg height="175" width="175">
                        <polygon points="0,15 80,15 42,83" style={{ fill: 'white'}} />
                        <polygon points="5,65 78,65 42,0" style={{ fill: 'white'}} />
                        <polygon points="10,20 70,20 42,75" style={{ fill: 'green'}} />
                        <polygon points="15,60 68,60 42,10" style={{ fill: 'green'}} />
                    </svg>
                </div>
            </div>
            <div style={{ position: 'absolute', marginTop: 455, zIndex: 10 }}>
                <div style={{
                    width: 49.5,
                    height: 20,
                    marginLeft: 516,
                    backgroundColor: 'black',
                }} />
                <div style={{
                    width: 49.5,
                    height: 47,
                    marginLeft: 516,
                    backgroundColor: 'white',
                    border: '3px solid black',
                    borderBottom: 0
                }}>
                    <div style={{
                        width: 39.5,
                        height: 37,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            fontWeight: 'bold'
                        }}>N E</p>
                    </div>
                </div>
                <div style={{ width: 49.5, height: 47, marginLeft: 516, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{
                        width: 39.5,
                        height: 37,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            fontWeight: 'bold'
                        }}>Z O</p>
                    </div>
                </div>
                <div style={{ width: 49.5, height: 47, marginLeft: 516, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{
                        width: 39.5,
                        height: 37,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            fontWeight: 'bold'
                        }}>E</p>
                    </div>
                </div>
                <div style={{ width: 49.5, height: 47, marginLeft: 516, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{
                        width: 39.5,
                        height: 37,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            fontWeight: 'bold'
                        }}>A F</p>
                    </div>
                </div>
                <div style={{ width: 49.5, height: 47, marginLeft: 516, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{
                        width: 39.5,
                        height: 37,
                        backgroundColor: 'green',
                        marginTop: 3,
                        marginLeft: 2.5,
                        border: '2px solid black',
                    }}>
                        <p style={{
                            transform: 'rotate(270deg)',
                            fontWeight: 'bold'
                        }}>S</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerBoard;