import React from "react";
import Home from "./elements/Home";

const InnerBoard = () => {
    return (
        <div>
            <div>
                <div style={{ position: 'fixed', left: 2, top: -59 }}>
                    <Home color='red' side='horizontal' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(90deg)',
                    right: -101, top: 55
                }}>
                    <Home color='#1464F4' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(270deg)',
                    left: -103, top: 640
                }}>
                    <Home color='green' />
                </div>
            </div>
        </div>
    );
};

export default InnerBoard;