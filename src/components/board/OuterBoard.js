import React from "react";

const spaceGenerator = (direction, width) => {
	let row = [];
	let size = typeof (width) === 'undefined' ? 47 : width;

	if (direction === 'horizontal') {
		row.push(<div style={{ width: size, height: 47, border: '3px solid black' }}>0</div>)
	}

	for (let i = 1; i < 14; i++) {
		if (direction === 'horizontal') {
			row.push(<div style={{ width: size, height: 47, border: '3px solid black', borderLeft: 0 }}>{i}</div>)
		} else {
			row.push(<div style={{ width: size, height: 47, border: '3px solid black', borderTop: 0 }}>{i-1}</div>)
		}
	}

	if (direction === 'vertical') {
		row.push(<div style={{ width: size, height: 47, border: '3px solid black', borderTop: 0, borderBottom: 0 }}>13</div>)
	}

	return row;
}

const OuterBoard = () => {
	return (
		<div style={{
			display: 'flex', flexWrap: 'wrap', border: '5px solid red', justifyContent: 'space-between', alignItems: 'flex-start',
			width: '100%', height: '100%', position: 'absolute', zIndex: -1
		}}>
			<div style={{ display: 'flex', flexDirection: 'row', width: 654, backgroundColor: 'white' }}>
				{spaceGenerator('horizontal')}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', width: 47, backgroundColor: 'white' }}>
				{spaceGenerator('vertical')}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', width: 50, backgroundColor: 'white' }}>
				{spaceGenerator('vertical', 50)}

			</div>
			<div style={{ display: 'flex', flexDirection: 'row', width: 654, backgroundColor: 'white' }}>
				{spaceGenerator('horizontal')}
			</div>
		</div>
	);
};

export default OuterBoard;