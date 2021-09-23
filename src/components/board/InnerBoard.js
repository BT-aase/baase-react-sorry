import React from "react";

import Home from "./elements/Home";
import HomeArrows from "./elements/HomeArrows";
import colors from "../colors";

const InnerBoard = () => {

    return (
        <div style={{
            position: 'fixed', bottom: 48, left: 52,
            height: 604, width: 554, backgroundColor: "#cce3be"
        }}>
            <div>
                <div style={{
                    position: 'fixed', left: 2, top: -57
                }}>
                    <Home color={colors.red} side='horizontal' />
                </div>
                <div style={{
                    position: 'fixed', right: 253, bottom: 57
                }}>
                    <HomeArrows color={colors.red}  />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(90deg)',
                    right: -101, top: 55
                }}>
                    <Home color={colors.blue} />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(90deg)',
                    left: 55, bottom: 240
                }}>
                    <HomeArrows color={colors.blue} side='vertical' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(180deg)',
                    bottom: -57, right: 4
                }}>
                    <Home color={colors.yellow} side='horizontal' />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(180deg)',
                    left: 253, top: 57
                }}>
                    <HomeArrows color={colors.yellow} />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(270deg)',
                    left: -103, top: 640
                }}>
                    <Home color={colors.green} />
                </div>
                <div style={{
                    position: 'fixed', transform: 'rotate(270deg)',
                    right: 60, top: 235
                }}>
                    <HomeArrows color={colors.green} side='vertical' />
                </div>
            </div>
            <div>
                <div style={{
                    position: 'fixed', top: 170, left: 220,
                    width: 220, height: 140, transform: 'rotate(180deg)',
                    border: '3px solid white', textAlign: 'center',
                    fontFamily: 'Roboto', fontWeight: 500
                }}>
                    <p style={{ marginTop: 20, fontSize: 20 }}>DISCARD</p>
                    <p style={{ marginTop: -10, fontSize: 14 }}>FACE UP</p>
                    <p style={{ marginTop: -10, fontSize: 20 }}>HERE</p>
                </div>
                <div style={{
                    position: 'fixed', top: 385, left: 220,
                    width: 220, height: 140,
                    border: '3px solid white', textAlign: 'center',
                    fontFamily: 'Roboto', fontWeight: 500
                }}>
                    <p style={{ marginTop: 20, fontSize: 20 }}>PLACE PACK</p>
                    <p style={{ marginTop: -10, fontSize: 14 }}>FACE DOWN</p>
                    <p style={{ marginTop: -10, fontSize: 20 }}>HERE</p>
                </div>
            </div>
        </div>
    );
};

export default InnerBoard;