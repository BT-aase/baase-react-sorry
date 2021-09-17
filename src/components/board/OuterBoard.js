import React from "react";

import Slides from './elements/Slides';

const spaceGenerator = (direction, width) => {
	let row = [];
	let size = typeof (width) === 'undefined' ? 47 : width;

	if (direction === 'horizontal') {
		row.push(<div style={{ width: size, height: 43, border: '3px solid black' }}/>)
	}

	for (let i = 1; i < 14; i++) {
		if (direction === 'horizontal') {
			row.push(<div style={{ width: size, height: 43, border: '3px solid black', borderLeft: 0 }}/>)
		} else {
			row.push(<div style={{ width: size, height: 43, border: '3px solid black', borderTop: 0 }}/>)
		}
	}

	if (direction === 'vertical') {
		row.push(<div style={{ width: size, height: 43, border: '3px solid black', borderTop: 0, borderBottom: 0 }}/>)
	}

	return row;
}

const OuterBoard = () => {
	return (
		<div style={{
			display: 'flex', flexWrap: 'wrap', border: '5px solid red', justifyContent: 'space-between', alignItems: 'flex-start',
			width: '100%', height: '100%', position: 'absolute', zIndex: -1
		}}>
			<div style={{ display: 'flex', flexDirection: 'row', width: 650, backgroundColor: 'white' }}>
				{spaceGenerator('horizontal')}
			</div>
			<div style={{ position: 'fixed', top: -63, left: -4 }} >
				<Slides />
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', width: 47, backgroundColor: 'white' }}>
				{spaceGenerator('vertical')}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', width: 49, backgroundColor: 'white' }}>
				{spaceGenerator('vertical', 49)}

			</div>
			<div style={{ display: 'flex', flexDirection: 'row', width: 650, backgroundColor: 'white' }}>
				{spaceGenerator('horizontal')}
			</div>
		</div>
	);
};

export default OuterBoard;