import React from "react";
import { useSelector } from "react-redux";

import colors from '../../colors';

const Card = (props) => {

    let cardDrawn = useSelector((state) => state.game.cardDrawn);

    const cardDisplay = (number) => {
        let display;
        let text;
        let width;
        let sides;
        let ends;
        let centerLeft;
        let centerTop = 190;

        switch (number) {
            case 1:
                text = 'Must either start a man out or move one man forward 1 square.'
                width = 115;
                sides = 210;
                ends = 195;
                centerLeft = 320;
                break;
            case 2:
                text = 'Must either start a man out or move one man forward 2 squares. DRAW AGAIN.'
                width = 115;
                sides = 210;
                ends = 195;
                centerLeft = 320;
                break;
            case 3:
                text = 'Must move one man forward 3 squares.'
                width = 95;
                sides = 215;
                ends = 195;
                centerLeft = 320;
                break;
            case 4:
                text = 'Must move one man backwards 4 squares.'
                width = 95;
                sides = 215;
                ends = 195;
                centerLeft = 320;
                break;
            case 5:
                text = 'Must move one man forward 5 squares.'
                width = 95;
                sides = 215;
                ends = 195;
                centerLeft = 320;
                break;
            case 7:
                text = 'Must move one man forward 7 squares'
                width = 95;
                sides = 205;
                ends = 200;
                centerLeft = 325;
                break;
            case 8:
                text = 'Must move one man forward 8 squares.'
                width = 95;
                sides = 215;
                ends = 195;
                centerLeft = 320;
                break;
            case 10:
                text = 'Must move one man forward 10 squares or move one man backward 1 square.'
                width = 95;
                sides = 205;
                ends = 200;
                centerLeft = 305;
                break;
            case 11:
                text = '';
                width = 95;
                sides = 215;
                ends = 190;
                centerLeft = 270;
                centerTop = 170;
                break;
            case 12:
                text = 'Must move one man forward 12 squares.'
                width = 95;
                sides = 215;
                ends = 195;
                centerLeft = 310;
                break;
            case 13:
                text = '';
                width = 95;
                ends = 155;
                centerLeft = 275;
                centerTop = 160;
                break;
            default:
                break;
        }


        typeof (number) !== 'undefined' ?
            display = (
                <div
                    style={{ width: 220, height: 140, backgroundColor: 'white', borderRadius: 10 }}
                    onClick={() => { props.reshuffle() }}
                >
                    <div style={{
                        display: 'flex', position: 'fixed', transform: 'rotate(270deg)',
                        left: ends, top: typeof (sides) !== 'undefined' ? sides : 160
                    }}>
                        {number !== 13 ?
                            <p style={{ fontFamily: 'Purple Purse', fontSize: 22, paddingRight: 5 }}>{number}</p> :
                            <p style={{ fontFamily: 'Overlock', fontSize: 26, paddingRight: 5 }}>SORRY!</p>}
                        <p style={{ width: width, fontSize: 9, paddingTop: 5 }}>{text}</p>
                    </div>
                    <div style={{ position: 'fixed', transform: 'rotate(270deg)', left: centerLeft, top: centerTop }}>
                        {number !== 11 && number !== 13 ?
                            <p style={{ fontFamily: 'Purple Purse', fontSize: 60 }}>{number}</p> :
                            (
                                <>
                                    <p style={{ fontSize: 9, width: 125 }}>
                                        {number === 11 ?
                                            'Move one man forward 11 squares or any one of your men may change place with any one man of any opponent.' :
                                            "Must take one man from your start, place it on any square that is occupied by any opponent, and return that opponent's man to its start."
                                        }
                                    </p>
                                    <p style={{ fontSize: 9, width: 125 }}>
                                        {number === 11 ?
                                            'Note: Forfeit move if you do not wish to change places and it is impossible to go forward 11 squares.' :
                                            "If there is not man on your start or no opponent's man is on any square your move is forfeited."
                                        }
                                    </p>
                                </>
                            )
                        }
                    </div>
                    <div style={{
                        display: 'flex', position: 'fixed', transform: 'rotate(90deg)',
                        right: ends, top: typeof (sides) !== 'undefined' ? sides : 260
                    }}>
                        {number !== 13 ?
                            <p style={{ fontFamily: 'Purple Purse', fontSize: 22, paddingRight: 5 }}>{number}</p> :
                            <p style={{ fontFamily: 'Overlock', fontSize: 24, paddingRight: 5 }}>SORRY!</p>}
                        <p style={{ width: width, fontSize: 9, paddingTop: 5 }}>{text}</p>
                    </div>
                </div>
            )
            :
            display = (
                <div style={{
                    width: 220, height: 140, backgroundColor: colors.cardBack,
                    borderRadius: 10, textAlign: 'center', border: !cardDrawn ? '5px solid #ff6700' : ''
                }}
                    onClick={() => { props.onClick(); props.displayMoves(); }}
                >
                    <p style={{ paddingTop: 35, color: 'white', fontSize: 50, fontFamily: 'Overlock', fontWeight: 900 }}>SORRY!</p>
                </div>
            );

        return display;
    }

    return (cardDisplay(props.number));
};

export default Card;
