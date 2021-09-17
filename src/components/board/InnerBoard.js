import React from "react";
import Home from "./elements/Home";

const InnerBoard = () => {
    return (
        <div style={{
            position: 'fixed', bottom: 48, left: 52,
            height: 604, width: 554, backgroundColor: "#cce3be"
        }}>
            <div>
                <div style={{
                    position: 'fixed', left: 2, top: -59
                }}>
                    <Home color='red' side='horizontal' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(90deg)',
                    right: -101, top: 55
                }}>
                    <Home color='#1464F4' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(180deg)',
                    bottom: -60.5, right: 4
                }}>
                    <Home color='yellow' side='horizontal' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(270deg)',
                    left: -103, top: 640
                }}>
                    <Home color='green' />
                </div>
            </div>
            <div>
                <div style={{
                    position: 'fixed', top: 170, left: 220,
                    width: 220, height: 140, transform: 'rotate(180deg)',
                    border: '3px solid white', textAlign: 'center',
                    fontFamily: 'Bahnschrift SemiBold'
                }}>
                    <p style={{ marginTop: 20, fontSize: 22 }}>DISCARD</p>
                    <p style={{ marginTop: -10, fontSize: 14 }}>FACE UP</p>
                    <p style={{ marginTop: -10, fontSize: 22 }}>HERE</p>
                </div>
                <div style={{
                    position: 'fixed', top: 385, left: 220,
                    width: 220, height: 140,
                    border: '3px solid white', textAlign: 'center',
                    fontFamily: 'Bahnschrift SemiBold'
                }}>
                    <p style={{ marginTop: 20, fontSize: 22 }}>PLACE PACK</p>
                    <p style={{ marginTop: -10, fontSize: 14 }}>FACE DOWN</p>
                    <p style={{ marginTop: -10, fontSize: 22 }}>HERE</p>
                </div>
            </div>
        </div>
    );
};

export default InnerBoard;