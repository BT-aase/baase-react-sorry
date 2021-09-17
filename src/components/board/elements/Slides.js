import React from "react";

const bottomBlackTriangle = (side) => side === 'vertical' ? 580 : 585;
const bottomBlackLine = (side) => side === 'vertical' ? 145 : 150;
const bottomBlackCircle = (side) => side === 'vertical' ? 439 : 434;
const bottomRedTriangle = (side) => side === 'vertical' ? 584 : 589;
const bottomRedCircle = (side) => side === 'vertical' ? 441 : 436;

const topBlackTriangle = (side) => side === 'vertical' ? 190 : 260;
const topLine = (side) => side === 'vertical' ? 80 : 130;
const topLineLen = (side) => side === 'vertical' ? 120 : 145;
const topBlackCircle = (side) => side === 'vertical' ? 52 : 109;
const topRedTriangle = (side) => side === 'vertical' ? 194 : 264;
const topRedCircle = (side) => side === 'vertical' ? 54 : 111;

const Slides = (props) => {
    return (
        <div>
            <div>
                <div>
                    <div style={{
                        position: 'absolute',
                        top: 718,
                        left: bottomBlackTriangle(props.side),
                        width: 0,
                        height: 0,
                        borderTop: '17px solid transparent',
                        borderBottom: '17px solid transparent',
                        borderRight: '22px solid black'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 728,
                        left: 455,
                        width: bottomBlackLine(props.side),
                        height: 15,
                        backgroundColor: 'black'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 718,
                        left: bottomBlackCircle(props.side),
                        width: 33,
                        height: 33,
                        backgroundColor: 'black',
                        borderRadius: 30
                    }} />
                </div>
                <div>
                    <div style={{
                        position: 'absolute',
                        top: 725,
                        left: bottomRedTriangle(props.side),
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderRight: `15px solid ${props.color}`
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 731,
                        left: 455,
                        width: 143,
                        height: 8,
                        backgroundColor: props.color
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 719.5,
                        left: bottomRedCircle(props.side),
                        width: 29,
                        height: 29,
                        backgroundColor: props.color,
                        borderRadius: 25,
                        border: '1px solid black'
                    }} />
                </div>
            </div>
            <div>
                <div>
                    <div style={{
                        position: 'absolute',
                        top: 718,
                        left: topBlackTriangle(props.side),
                        width: 0,
                        height: 0,
                        borderTop: '17px solid transparent',
                        borderBottom: '17px solid transparent',
                        borderRight: '22px solid black'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 727,
                        left: topLine(props.side),
                        width: topLineLen(props.side),
                        height: 15,
                        backgroundColor: 'black'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 718,
                        left: topBlackCircle(props.side),
                        width: 33,
                        height: 33,
                        backgroundColor: 'black',
                        borderRadius: 30
                    }} />
                </div>
                <div>
                    <div style={{
                        position: 'absolute',
                        top: 724,
                        left: topRedTriangle(props.side),
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '12px solid transparent',
                        borderRight: `15px solid ${props.color}`
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 730,
                        left: topLine(props.side),
                        width: topLineLen(props.side),
                        height: 8,
                        backgroundColor: props.color
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 719.5,
                        left: topRedCircle(props.side),
                        width: 29,
                        height: 29,
                        backgroundColor: props.color,
                        borderRadius: 25,
                        border: '1px solid black'
                    }} />
                </div>
            </div>
        </div>
    );
};

export default Slides;