import React from "react";
import Home from "./elements/Home";

const InnerBoard = () => {
    return (
        <div>
            <div>
                <div style={{
                    position: 'fixed', transform: 'rotate(270deg)',
                    left: -149, top: 640
                }}>
                    <Home color='yellow' />
                </div>
                <div style={{ position: 'fixed', left: -33, top: -59 }}>
                    <Home color='green' />
                </div>
            </div>
        </div>
    );
};

export default InnerBoard;