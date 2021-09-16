import React from "react";

const Home = () => {
    return (
        <div>
            <div style={{
                width: 100,
                height: 100,
                marginLeft: 490,
                marginTop: 375,
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
                }}>
                    <svg height="90" width="85" style={{ marginLeft: -5, marginTop: -5 }}>
                        <polygon points="4,25 85,25 45,92" style={{ fill: 'white' }} />
                        <polygon points="4,65 85,65 45,-2" style={{ fill: 'white' }} />
                        <polygon points="10,29 80,29 45,85" style={{ fill: 'green' }} />
                        <polygon points="10,61 80,61 45,5" style={{ fill: 'green' }} />
                        <polygon points="12,29 32,29 45,7 58,29 78,29 69,45 
            78,60 58,60 45,80 32,60 14,59 22,45"
                            style={{ fill: 'none', stroke: 'black', strokeWidth: 3 }} />
                        <text x="25" y="50" fill="black" style={{ fontSize: 14, fontWeight: "bold" }}>HOME</text>
                    </svg>
                </div>
            </div>
            <div style={{ position: 'absolute', marginTop: 455, marginLeft: 515, zIndex: 10 }}>
                <div style={{
                    width: 49.5,
                    height: 20,
                    backgroundColor: 'black',
                }} />
                <div style={{
                    width: 49.5,
                    height: 47,

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
                <div style={{ width: 49.5, height: 47, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
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
                <div style={{ width: 49.5, height: 47, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
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
                <div style={{ width: 49.5, height: 47, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
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
                <div style={{ width: 49.5, height: 47, backgroundColor: 'white', border: '3px solid black', borderBottom: 0 }} >
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
                            fontWeight: 'bold',
                            marginTop: -20
                        }}>S</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;