import React from "react";
import InnerBoard from "./InnerBoard";

import OuterBoard from "./OuterBoard";

const Board = () => {
    return (
        <div style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
        }}>
            <OuterBoard />
            <InnerBoard />
        </div>
    );
};

export default Board;
