const displayPiece = (id) => {
    let pieceinPlay = boardPieces.find(({ space }) => space === id);

    if (typeof pieceinPlay !== 'undefined') {
        return <GamePiece color={pieceinPlay.color} />
    }
};

const displayMoves = (moves) => {
    let occupiedSpaces = [];

    for (let count = 0; count < moves.length; count++) {
        let move = moves[count].move;
        if (typeof move === 'string') {
            let safeHome = move.includes(`${currColor}Safe`) || move.includes(`${currColor}Home`);
            if (!safeHome) {
                occupiedSpaces.push(moves[count].position)
            }
        } else {
            occupiedSpaces.push(move)
        }
    }

    return occupiedSpaces;
}


export const sideSpaces = (direction, width, outlier, orientation) => {
    let row = [];
    let size = typeof (width) === 'undefined' ? 47 : width;
    let singlePoint;
    const moves = movesPossible;

    if (outlier === 'start' && orientation === 'normal') {
        singlePoint = 1;
    }
    else if (outlier === 'start' && orientation === 'flipped') {
        singlePoint = 42
    }
    else if (outlier === 'end' && orientation === 'normal') {
        singlePoint = 28;
    }
    else {
        singlePoint = 43;
    }

    if (direction === 'horizontal') {
        row.push(

        )
    }

    for (let i = 1; i < 14; i++) {
        let id = orientation === 'flipped' ? 42 - i : i + 1;

        if (direction === 'horizontal') {
            row.push(

            )
        } else {
            let id = orientation === 'flipped' ? 57 - i : i + 14

            row.push(

            )
        }
    }


    if (direction === 'vertical') {
        row.push(
            <div
                id={`box-${singlePoint}`}
                key={singlePoint}
                style={{
                    width: size, height: 43,
                    backgroundColor: displayMoves(moves).includes(singlePoint) ? colors[currColor] : 'transparent',
                    border: displayMoves(moves).includes(singlePoint) ? '2px solid black' : 'transparent'
                }}>
                <div style={{ marginTop: 7, marginLeft: size !== 47 ? 10 : 7 }}>
                    {displayPiece(singlePoint)}
                </div>
            </div>
        )
    }

    return row;
}