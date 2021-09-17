import React from "react";

const firstBlackTriangle = (side) => side === 'vertical' ? 190 : 260;
const firstLine = (side) => side === 'vertical' ? 80 : 130;
const firstLineLen = (side) => side === 'vertical' ? 120 : 145;
const firstBlackCircle = (side) => side === 'vertical' ? 52 : 109;
const firstColorTriangle = (side) => side === 'vertical' ? 194 : 264;
const firstColorCircle = (side) => side === 'vertical' ? 54 : 111;

const secondBlackTriangle = (side) => side === 'vertical' ? 580 : 585;
const secondBlackLine = (side) => side === 'vertical' ? 145 : 150;
const secondBlackCircle = (side) => side === 'vertical' ? 439 : 434;
const secondColorTriangle = (side) => side === 'vertical' ? 584 : 589;
const secondColorCircle = (side) => side === 'vertical' ? 441 : 436;

const Slides = (props) => {
    return (
        <div>
            <div>
                <div>
                    <div style={{
                        position: 'absolute',
                        top: 718,
                        left: firstBlackTriangle(props.side),
                        width: 0,
                        height: 0,
                        borderTop: '17px solid transparent',
                        borderBottom: '17px solid transparent',
                        borderRight: '22px solid black'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 727,
                        left: firstLine(props.side),
                        width: firstLineLen(props.side),
                        height: 15,
                        backgroundColor: 'black'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 718,
                        left: firstBlackCircle(props.side),
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
                        left: firstColorTriangle(props.side),
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '12px solid transparent',
                        borderRight: `15px solid ${props.color}`
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 730,
                        left: firstLine(props.side),
                        width: firstLineLen(props.side),
                        height: 8,
                        backgroundColor: props.color
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 719.5,
                        left: firstColorCircle(props.side),
                        width: 29,
                        height: 29,
                        backgroundColor: props.color,
                        borderRadius: 25,
                        border: '1px solid black'
                    }} />
                </div>
                <div>
                    <div>
                        <div style={{
                            position: 'absolute',
                            top: 718,
                            left: secondBlackTriangle(props.side),
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
                            width: secondBlackLine(props.side),
                            height: 15,
                            backgroundColor: 'black'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: 718,
                            left: secondBlackCircle(props.side),
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
                            left: secondColorTriangle(props.side),
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
                            left: secondColorCircle(props.side),
                            width: 29,
                            height: 29,
                            backgroundColor: props.color,
                            borderRadius: 25,
                            border: '1px solid black'
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slides;