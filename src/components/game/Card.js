import React from "react";

const Card = (props) => {

    const cardDisplay = (number) => {
        let display;

        typeof (number) !== 'undefined' ?
            display = (
                <div style={{ width: 220, height: 140, backgroundColor: 'white', borderRadius: 10 }}>
                    <div style={{ position: 'fixed', transform: 'rotate(270deg)', left: 210, top: 190 }}>
                        {/* <p style={{ fontFamily:'Purple Purse', fontSize: 22, paddingTop: -30 }}>1</p> */}
                        <p style={{ width: 95, fontSize: 10 }}>Must either start a man out or move one man forward 1 square.</p>
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
