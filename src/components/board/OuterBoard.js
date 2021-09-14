import React from "react";

const spaceGenerator = (direction, width) => {
	let row = [];
	let size = typeof (width) === 'undefined' ? 68 : width;

	if (direction === 'horizontal') {
		row.push(<div style={{ width: 68, height: 53, border: '3px solid black' }} />)
	}

	for (let i = 0; i < 11; i++) {
		if (direction === 'horizontal') {
			row.push(<div style={{ width: 68, height: 53, border: '3px solid black', borderLeft: 0 }} />)
		} else {
			row.push(<div style={{ width: size, height: 53, border: '3px solid black', borderTop: 0 }} />)
		}
	}

	if (direction === 'vertical') {
		row.push(<div style={{ width: size, height: 53, border: '3px solid black', borderTop: 0, borderBottom: 0 }} />)
	}

	return row;
}

const OuterBoard = () => {
	return (
		<div style={{
			display: 'flex', flexWrap: 'wrap', border: '5px solid red', justifyContent: 'space-between', alignItems: 'flex-start',
			width: '100%', height: '100%', position: 'absolute', zIndex: -1
		}}>
			<div style={{ display: 'flex', flexDirection: 'row', width: 812, backgroundColor: 'white' }}>
				{spaceGenerator('horizontal')}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', width: 68, backgroundColor: 'white' }}>
				{spaceGenerator('vertical')}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', width: 70, backgroundColor: 'white' }}>
				{spaceGenerator('vertical', 70)}

			</div>
			<div style={{ display: 'flex', flexDirection: 'row', width: 812, backgroundColor: 'white' }}>
				{spaceGenerator('horizontal')}
			</div>
		</div>
	);
};

export default OuterBoard;