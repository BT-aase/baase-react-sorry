import React from "react";

const HomeArrows = (props) => {
    return (
        <div>
            <div style={{
                width: 50,
                height: 50,
            }}>
                <svg height="100" width="100">
                    <polygon points="90,45 83,38 83,18 90,28 97,18 97,38" style={{ fill: 'white', stroke: 'black', strokeWidth: 1 }} />
                    <line x1="90" y1="45" x2="90" y2="60" style={{stroke: 'black', strokeWidth: 2}} />
                    <path d="M 90 60 Q 90 80, 70 80" stroke="black" strokeWidth="2" fill="transparent" />
                    <line x1="50" y1="80" x2="70" y2="80" style={{stroke: 'black', strokeWidth: 2}} />
                    <polygon points="50,80 60,90 35,80 60,70" style={{ fill: 'red', stroke: 'black', strokeWidth: 1 }} />
                </svg>
            </div>
        </div>
    );
};

export default HomeArrows;
