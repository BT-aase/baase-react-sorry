import React from "react";

const Card = (props) => {

    const cardDisplay = (number) => {
        let display;
        let text;

        switch(number) {
            case 1:
                text = 'Must either start a man out or move one man forward 1 square.'
                break;
            default:
                break;
        }


        typeof (number) !== 'undefined' ?
            display = (
                <div style={{ width: 220, height: 140, backgroundColor: 'white', borderRadius: 10 }}>
                    <div style={{ display: 'flex', position: 'fixed', transform: 'rotate(270deg)', left: 190, top: 210 }}>
                        <p style={{ fontFamily: 'Purple Purse', fontSize: 22, paddingRight: 5 }}>{number}</p>
                        <p style={{ width: 115, fontSize: 9, paddingTop: 5 }}>{text}</p>
                    </div>
                    <div style={{position: 'fixed', transform: 'rotate(270deg)', left: 325, top: 190}}>
                        <p style={{ fontFamily: 'Purple Purse', fontSize: 60 }}>1</p>
                    </div>
                    <div style={{ display: 'flex', position: 'fixed', transform: 'rotate(90deg)', left: 340, top: 210 }}>
                        <p style={{ fontFamily: 'Purple Purse', fontSize: 22, paddingRight: 5 }}>{number}</p>
                        <p style={{ width: 115, fontSize: 9, paddingTop: 5 }}>{text}</p>
                    </div>
                </div>
            ) :
            display = (
                <div style={{ width: 220, height: 140, backgroundColor: '#007FFF', borderRadius: 10, textAlign: 'center', }}>
                    <p style={{ paddingTop: 35, color: 'white', fontSize: 50, fontFamily: 'Overlock', fontWeight: 900 }}>SORRY!</p>
                </div>
            );

        return display;
    }

    return (cardDisplay(props.number));
};

export default Card;
