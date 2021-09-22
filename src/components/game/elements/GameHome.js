import React from "react";

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
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
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
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                </div>
            </div>
            <div style={{ position: 'absolute', marginTop: 455, marginLeft: zoneAdj(props.side), zIndex: 10 }}>
                <div style={{ width: 46, height: 20, backgroundColor: 'transparent' }} />
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }}>
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <div style={{
                            width: 30, height: 30, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',

                        }}>
                            <div style={{
                                width: 15, height: 15, border: '1px solid black',
                                borderRadius: 20, backgroundColor: '#1464F4',
                                marginTop: 6.5, marginLeft: 6.5
                            }}></div>
                        </div>
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <div style={{
                            width: 30, height: 30, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',

                        }}>
                            <div style={{
                                width: 15, height: 15, border: '1px solid black',
                                borderRadius: 20, backgroundColor: '#1464F4',
                                marginTop: 6.5, marginLeft: 6.5
                            }}></div>
                        </div>
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <div style={{
                            width: 30, height: 30, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',

                        }}>
                            <div style={{
                                width: 15, height: 15, border: '1px solid black',
                                borderRadius: 20, backgroundColor: '#1464F4',
                                marginTop: 6.5, marginLeft: 6.5
                            }}></div>
                        </div>
                    </div>
                </div>
                <div style={{ width: 46, height: 47, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }} >
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <div style={{
                            width: 30, height: 30, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',

                        }}>
                            <div style={{
                                width: 15, height: 15, border: '1px solid black',
                                borderRadius: 20, backgroundColor: '#1464F4',
                                marginTop: 6.5, marginLeft: 6.5
                            }}></div>
                        </div>
                    </div>
                </div>
                <div style={{ width: 46, height: 46, backgroundColor: 'transparent', border: '3px solid black', borderBottom: 0 }}>
                    <div style={{ marginTop: 7, marginLeft: 6 }}>
                        <div style={{
                            width: 30, height: 30, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',

                        }}>
                            <div style={{
                                width: 15, height: 15, border: '1px solid black',
                                borderRadius: 20, backgroundColor: '#1464F4',
                                marginTop: 6.5, marginLeft: 6.5
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;