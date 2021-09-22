import React from "react";

const spaceGenerator = (direction, width) => {
    let row = [];
    let size = typeof (width) === 'undefined' ? 47 : width;

    if (direction === 'horizontal') {
        row.push(
            <div style={{ width: size, height: 43 }}>
                <div style={{ marginTop: 7, marginLeft: 7 }}>
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4'
                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                </div>
            </div>
        )
    }

    for (let i = 1; i < 14; i++) {
        if (direction === 'horizontal') {
            row.push(
                <div style={{ width: size, height: 43 }}>
                    <div style={{ marginTop: 7, marginLeft: 7 }}>
                        <div style={{
                            width: 30, height: 30, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4'
                        }}>
                            <div style={{
                                width: 15, height: 15, border: '1px solid black',
                                borderRadius: 20, backgroundColor: '#1464F4',
                                marginTop: 6.5, marginLeft: 6.5
                            }}></div>
                        </div>
                    </div>
                </div>
            )
        } else {
            row.push(
                <div style={{ width: size, height: 43 }}>
                    <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                        <div style={{
                            width: 30, height: 30, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',

                        }}>
                            <div style={{
                                width: 15, height: 15, border: '1px solid black',
                                borderRadius: 20, backgroundColor: '#1464F4',
                                marginTop: 6.5, marginLeft: 6.5
                            }}></div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    if (direction === 'vertical') {
        row.push(
            <div style={{ width: size, height: 43 }}>
                <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                    <div style={{
                        width: 30, height: 30, border: '1px solid black',
                        borderRadius: 20, backgroundColor: '#1464F4',

                    }}>
                        <div style={{
                            width: 15, height: 15, border: '1px solid black',
                            borderRadius: 20, backgroundColor: '#1464F4',
                            marginTop: 6.5, marginLeft: 6.5
                        }}></div>
                    </div>
                </div>
            </div>
        )
    }

    return row;
}

const GameOuterBoard = () => {
    return (
        <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start',
            width: '100%', height: '100%', position: 'absolute', border: '5px solid transparent'
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: 650 }}>
                {spaceGenerator('horizontal')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: 47 }}>
                {spaceGenerator('vertical')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: 49 }}>
                {spaceGenerator('vertical', 49)}

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: 650 }}>
                {spaceGenerator('horizontal')}
            </div>
        </div>
    );
};

export default GameOuterBoard;