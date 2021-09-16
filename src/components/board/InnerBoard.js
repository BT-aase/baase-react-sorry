import React from "react";
import Home from "./elements/Home";

const InnerBoard = () => {
    return (
        <div>
            <div>
                {/* <div style={{ position: 'absolute', transform: 'rotate(90deg)', left: 762 }}>
                    <Home />
                </div> */}
                <div style={{
                    width: 100,
                    height: 100,
                    marginLeft: 397,
                    marginTop: 610,
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
                        backgroundColor: 'green'
                    }}>
                        <p style={{ marginTop: 30, marginLeft: 17, fontWeight: 'bold' }}>START</p>
                    </div>
                </div>
                <div style={{ position: 'absolute', marginTop: 690, zIndex: 10 }}>
                    <div style={{
                        width: 49.5,
                        height: 20,
                        marginLeft: 422,
                        backgroundColor: 'black',
                    }} />
                </div>
            </div><Home /></div>
    );
};

export default InnerBoard;