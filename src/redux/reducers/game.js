import {
    START_GAME, CREATE_DECK, DRAW_CARD, START_ACTIONS,
    DISPLAY_MOVES, MOVE_PIECE, SWAP_PIECE, SHOW_SWAPPABLE,
    SLIDE_REMOVE, MOVE_TO_HOME, END_TURN, CLEAR_MOVES, RESTART_GAME
} from "../actions/game";

const initialState = {
    gameStarted: false,
    gameWon: false,
    gameSide: '',
    playerColors: [],
    playerStartPieces: [],
    playerHomePieces: [],
    cardDrawn: false,
    faceCard: 0,
    cardDeck: [],
    piecesInPlay: [],
    possibleMoves: [],
    drawAgain: false,
    moveInProgress: false,
    swapSelected: {}
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME: {
            let startPieces = [...state.playerStartPieces];
            let homePieces = [...state.playerHomePieces];
            for (let a = 1; a < action.colors.length + 1; a++) {
                startPieces.push({ playerNum: a, pieces: 4 })
                homePieces.push({ playerNum: a, pieces: 0 })
            }

            return {
                ...state,
                playerColors: action.colors,
                playerStartPieces: startPieces,
                playerHomePieces: homePieces,
                gameSide: action.startingColor,
                gameStarted: true
            }
        }
        case CREATE_DECK: {
            const cardTypes = [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13];
            const cardCount = (card) => card === 1 ? 5 : 4;
            let cards = [];

            for (let i = 0; i < cardTypes.length; i++) {
                for (let j = 0; j < cardCount(cardTypes[i]); j++) {
                    cards.push(cardTypes[i])
                }
            }

            cards = cards.sort(() => Math.random() - 0.5);

            return {
                ...state,
                cardDeck: cards,
                faceCard: 0
            }
        }
        case DRAW_CARD: {
            let updatedCardDeck = [...state.cardDeck];
            let newCard = updatedCardDeck.shift();
            return {
                ...state,
                cardDeck: updatedCardDeck,
                faceCard: newCard,
                cardDrawn: true
            }
        }
        case START_ACTIONS: {
            const player = [...state.playerColors].find((player) => player.color === action.color);
            let currentStart = [...state.playerStartPieces];
            const startPieces = currentStart.find((start) => start.playerNum === player.playerNum);
            let currentPieces = startPieces.pieces;

            const index = currentStart.findIndex(pieces => pieces === startPieces);
            currentStart.splice(index, 1);

            if (action.action === 'out') {
                let playPieces = [...state.piecesInPlay];
                let newPiece;
                switch (action.color) {
                    case 'red':
                        newPiece = { space: 33, color: 'red' };
                        break;
                    case 'blue':
                        newPiece = { space: 46, color: 'blue' };
                        break;
                    case 'yellow':
                        newPiece = { space: 5, color: 'yellow' };
                        break;
                    case 'green':
                        newPiece = { space: 18, color: 'green' };
                        break;
                    default:
                        break;
                }

                let checkOpp = playPieces.find(piece => piece.space === newPiece.space);
                let checkOppIndex = playPieces.findIndex(piece => piece.space === newPiece.space);
                if (checkOppIndex !== -1) {
                    const oppPlayer = [...state.playerColors].find((player) => player.color === checkOpp.color);
                    const oppStartPieces = currentStart.find((start) => start.playerNum === oppPlayer.playerNum);
                    let oppCurrentPieces = oppStartPieces.pieces;
                    let oppIndex = currentStart.findIndex(pieces => pieces === oppStartPieces);

                    currentStart.splice(oppIndex, 1);
                    playPieces.splice(checkOppIndex, 1);
                    currentStart.push({ playerNum: oppPlayer.playerNum, pieces: oppCurrentPieces + 1 })
                }

                playPieces.push(newPiece);
                currentStart.push({ playerNum: player.playerNum, pieces: currentPieces - 1 })

                return {
                    ...state,
                    playerStartPieces: currentStart,
                    piecesInPlay: playPieces
                }
            } else if (action.action === 'in') {
                if (currentPieces + 1 <= 4) {
                    currentStart.push({ playerNum: player.playerNum, pieces: currentPieces + 1 });
                } else {
                    currentStart.push({ playerNum: player.playerNum, pieces: currentPieces });
                }

                return {
                    ...state,
                    playerStartPieces: currentStart
                }
            } else if (action.action = 'sorry') {
                currentStart.push({ playerNum: player.playerNum, pieces: currentPieces - 1 });

                return {
                    ...state,
                    playerStartPieces: currentStart
                }
            }
        }
        case DISPLAY_MOVES: {
            let currCard = state.faceCard;
            let displayPieces = [];
            let moveCards = [1, 2, 3, 4, 5, 7, 8, 10, 12];
            let occupied = [];

            let getOccupied = (pieces) => {
                for (let i = 0; i < pieces.length; i++) {
                    occupied.push(pieces[i].space);
                }
            };

            let wrapBoard = (move) => {
                if (move > 56) {
                    return move - 56;
                } else if (move < 1) {
                    return move + 56
                } else {
                    return move;
                }
            }

            let pieceChecker = (value) => {
                let space = value.space;
                if (typeof space === 'string') {
                    return false;
                } else {
                    return true;
                }
            }

            let safeHome = (displayPieces) => {
                let diamonds = {
                    red: 32,
                    blue: 45,
                    yellow: 4,
                    green: 17
                }

                let block = diamonds[state.gameSide];

                const safePosition = (position, wrap) => {
                    if (wrap) {
                        let interval = 57 - position;
                        return 1 - interval;
                    } else {
                        return position
                    }
                }

                for (let s = 0; s < displayPieces.length; s++) {
                    let safeWrap = displayPieces[s].position > 43 && displayPieces[s].move > 3 && displayPieces[s].move < 12;
                    if (safePosition(displayPieces[s].position, safeWrap) < block && displayPieces[s].move >= block) {
                        const removePiece = () => displayPieces.splice(s, 1);
                        switch (displayPieces[s].move - block) {
                            case 0:
                                if (occupied.includes(`${state.gameSide}Safe1`)) {
                                    removePiece()
                                } else {
                                    displayPieces[s].move = `${state.gameSide}Safe1`;
                                }
                                break;
                            case 1:
                                if (occupied.includes(`${state.gameSide}Safe2`)) {
                                    removePiece()
                                } else {
                                    displayPieces[s].move = `${state.gameSide}Safe2`;
                                }
                                break;
                            case 2:
                                if (occupied.includes(`${state.gameSide}Safe3`)) {
                                    removePiece()
                                } else {
                                    displayPieces[s].move = `${state.gameSide}Safe3`;
                                }
                                break;
                            case 3:
                                if (occupied.includes(`${state.gameSide}Safe4`)) {
                                    removePiece()
                                } else {
                                    displayPieces[s].move = `${state.gameSide}Safe4`;
                                }
                                break;
                            case 4:
                                if (occupied.includes(`${state.gameSide}Safe5`)) {
                                    removePiece()
                                } else {
                                    displayPieces[s].move = `${state.gameSide}Safe5`;
                                }
                                break;
                            case 5:
                                displayPieces[s].move = `${state.gameSide}Home`;
                                break;
                            default:
                                removePiece();
                                break;
                        }

                    }
                }
            }

            if (moveCards.includes(currCard)) {
                let currPieces = [...state.piecesInPlay].filter(piece => piece.color === state.gameSide);
                getOccupied(currPieces);

                let diamonds = {
                    red: 32,
                    blue: 45,
                    yellow: 4,
                    green: 17
                }

                let block = diamonds[state.gameSide];

                const pieceMover = (position, card, occupied) => {
                    const safeCheck = (position, move) => { return wrapBoard(position + move) > block && position < block };
                    switch (card) {
                        case 1:
                            if (!occupied.includes(wrapBoard(position + 1)) || safeCheck(position, 1)) {
                                displayPieces.push({ move: wrapBoard(position + 1), position });
                            }
                            break;
                        case 2:
                            if (!occupied.includes(wrapBoard(position + 2)) || safeCheck(position, 2)) {
                                displayPieces.push({ move: wrapBoard(position + 2), position });
                            }
                            break;
                        case 3:
                            if (!occupied.includes(wrapBoard(position + 3)) || safeCheck(position, 3)) {
                                displayPieces.push({ move: wrapBoard(position + 3), position });
                            }
                            break;
                        case 4:
                            if (!occupied.includes(wrapBoard(position - 4))) {
                                displayPieces.push({ move: wrapBoard(position - 4), position, action: 'backwards' });
                            }
                            break;
                        case 5:
                            if (!occupied.includes(wrapBoard(position + 5)) || safeCheck(position, 5)) {
                                displayPieces.push({ move: wrapBoard(position + 5), position });
                            }
                            break;
                        case 7:
                            if (!occupied.includes(wrapBoard(position + 7)) || safeCheck(position, 7)) {
                                displayPieces.push({ move: wrapBoard(position + 7), position });
                            }
                            break;
                        case 8:
                            if (!occupied.includes(wrapBoard(position + 8)) || safeCheck(position, 8)) {
                                displayPieces.push({ move: wrapBoard(position + 8), position });
                            }
                            break;
                        case 10:
                            if (!occupied.includes(wrapBoard(position + 10)) || safeCheck(position, 10)) {
                                displayPieces.push({ move: wrapBoard(position + 10), position });
                            }

                            if (!occupied.includes(wrapBoard(position - 1))) {
                                displayPieces.push({ move: wrapBoard(position - 1), position, action: 'backwards' });
                            }
                            break;
                        case 12:
                            if (!occupied.includes(wrapBoard(position + 12)) || safeCheck(position, 12)) {
                                displayPieces.push({ move: wrapBoard(position + 12), position });
                            }
                            break;
                        default:
                            break;
                    }
                }

                const safeMover = (position, card, occupied) => {
                    let currColor = state.gameSide;
                    let safeSpaces = [`${currColor}Safe1`, `${currColor}Safe2`, `${currColor}Safe3`,
                    `${currColor}Safe4`, `${currColor}Safe5`, `${currColor}Home`]

                    let currSpace = safeSpaces.findIndex(space => space === position);
                    let newSpace;
                    let backwards;

                    if (card === 4) {
                        newSpace = safeSpaces[currSpace - 4];
                        backwards = true;
                    }
                    else if (card === 10) {
                        newSpace = safeSpaces[currSpace - 1];
                        backwards = true;
                    } else {
                        newSpace = safeSpaces[currSpace + card];
                        backwards = false;
                    }

                    if (typeof newSpace !== 'undefined' && !occupied.includes(newSpace)) {
                        if (!backwards) {
                            displayPieces.push({ move: newSpace, position });
                        } else {
                            displayPieces.push({ move: newSpace, position, action: 'backwards' });
                        }
                    } else if (typeof newSpace === 'undefined' && backwards) {
                        let safeEnters = {
                            red: 31,
                            blue: 44,
                            yellow: 3,
                            green: 16
                        }

                        let safeNum = safeEnters[currColor] + parseInt(position.slice(-1));
                        let safeOut;

                        if (card === 4) {
                            safeOut = safeNum - 4;
                        }
                        else if (card === 10) {
                            safeOut = safeNum - 1;
                        }

                        if (safeOut === 0) {
                            safeOut = 56;
                        }

                        if (!occupied.includes(safeOut)) {
                            displayPieces.push({ move: safeOut, position, action: 'backwards' })
                        }
                    }
                }

                let startExits = [
                    { space: 33, color: 'red' }, { space: 46, color: 'blue' },
                    { space: 5, color: 'yellow' }, { space: 18, color: 'green' }
                ]

                if (currCard === 1 || currCard === 2) {
                    let colorExit = startExits.find((space) => space.color === state.gameSide);
                    if (!occupied.includes(colorExit.space)) {
                        displayPieces.push({ move: `${state.gameSide}Start`, position: `${state.gameSide}Start` })
                    }
                };

                for (let i = 0; i < currPieces.length; i++) {
                    if (typeof currPieces[i].space !== 'string') {
                        pieceMover(currPieces[i].space, currCard, occupied);
                    } else {
                        safeMover(currPieces[i].space, currCard, occupied);
                    }
                };

                safeHome(displayPieces);
            } else if (currCard === 11) {
                let currPieces = [...state.piecesInPlay].filter(piece => piece.color === state.gameSide);
                let oppPieces = [...state.piecesInPlay].filter(piece => piece.color !== state.gameSide);

                getOccupied(currPieces);
                oppPieces = oppPieces.filter(pieceChecker);

                for (let i = 0; i < currPieces.length; i++) {
                    if (!occupied.includes(wrapBoard(currPieces[i].space + 11)) || safeCheck(position, 11)) {
                        displayPieces.push({ move: wrapBoard(currPieces[i].space + 11), position: currPieces[i].space })
                    }
                }

                if (currPieces.length > 0) {
                    for (let i = 0; i < oppPieces.length; i++) {
                        displayPieces.push({ move: 'swap', position: oppPieces[i].space })
                    }
                }

                safeHome(displayPieces);
            } else {
                let oppPieces = [...state.piecesInPlay].filter(piece => piece.color !== state.gameSide);
                let sorryPlayer = [...state.playerColors].find(player => player.color === state.gameSide);
                let sorryStart = [...state.playerStartPieces].find(player => player.playerNum === sorryPlayer.playerNum);

                oppPieces = oppPieces.filter(pieceChecker);

                if (sorryStart.pieces !== 0) {
                    for (let i = 0; i < oppPieces.length; i++) {
                        displayPieces.push({ move: 'sorry', position: oppPieces[i].space })
                    }
                }
            }

            let goAgain = currCard === 2 ? true : false;

            return {
                ...state,
                possibleMoves: displayPieces,
                drawAgain: goAgain
            }

        }
        case CLEAR_MOVES: {
            return {
                ...state,
                possibleMoves: [],
                moveInProgress: true
            }
        }
        case MOVE_PIECE: {
            let pieces = [...state.piecesInPlay];
            let movingPiece = pieces.find(piece => piece.space === action.oldSpace && piece.color === state.gameSide);
            let pieceIndex = pieces.findIndex(piece => piece.space === action.oldSpace && piece.color === state.gameSide);
            pieces.splice(pieceIndex, 1);
            pieces.push({ space: action.newSpace, color: movingPiece.color });

            if (String(action.newSpace).includes('Home')) {
                pieces.pop();
            }

            return {
                ...state,
                piecesInPlay: pieces
            }
        }
        case SWAP_PIECE: {
            let pieces = [...state.piecesInPlay];
            let pieceIndex = pieces.findIndex(piece => piece.space === action.space);
            pieces.splice(pieceIndex, 1);
            pieces.push({ space: action.space, color: action.color });

            return {
                ...state,
                piecesInPlay: pieces
            }
        }
        case SHOW_SWAPPABLE: {
            let swappablePieces = [];
            for (let s = 0; s < action.pieces.length; s++) {
                swappablePieces.push({ move: 'swap', position: action.pieces[s].space })
            }

            return {
                ...state,
                swapSelected: action.selected,
                possibleMoves: swappablePieces
            }
        }
        case SLIDE_REMOVE: {
            let pieces = [...state.piecesInPlay];
            let pieceIndex = pieces.findIndex(piece => piece.space === action.space);
            pieces.splice(pieceIndex, 1);

            return {
                ...state,
                piecesInPlay: pieces
            }
        }
        case MOVE_TO_HOME: {
            const player = [...state.playerColors].find(player => player.color === action.color);
            let currentHome = [...state.playerHomePieces];
            const homePieces = currentHome.find((pieces) => pieces.playerNum === player.playerNum);
            let currentHomePieces = homePieces.pieces;

            const index = currentHome.findIndex(pieces => pieces === homePieces);
            currentHome.splice(index, 1);
            currentHome.push({ playerNum: player.playerNum, pieces: currentHomePieces + 1 });

            return {
                ...state,
                playerHomePieces: currentHome
            }
        }
        case END_TURN: {
            let playerColors = [...state.playerColors];
            let currColor = state.gameSide;
            let piecesInHome = state.playerHomePieces;
            let newColor;
            let color;

            let isWin = piecesInHome.find(home => home.pieces === 4);

            if (isWin) {
                return {
                    ...state,
                    gameWon: true,
                    possibleMoves: [],
                    swapSelected: {},
                    moveInProgress: false,
                    cardDrawn: false
                };
            }

            let currPlayer = playerColors.find(player => player.color === currColor);
            let nextPlayer = playerColors.find(player => player.playerNum === currPlayer.playerNum + 1);

            if (nextPlayer) {
                newColor = nextPlayer.color;
            } else {
                newColor = playerColors[0].color;
            }

            if (state.drawAgain) {
                color = currColor;
            } else {
                color = newColor;
            }

            return {
                ...state,
                gameSide: color,
                possibleMoves: [],
                swapSelected: {},
                moveInProgress: false,
                cardDrawn: false
            }
        }
        case RESTART_GAME: {
            return {
                ...state,
                gameStarted: initialState.gameStarted,
                gameWon: initialState.gameWon,
                gameSide: initialState.gameSide,
                playerColors: initialState.playerColors,
                playerStartPieces: initialState.playerStartPieces,
                playerHomePieces: initialState.playerHomePieces,
                cardDrawn: initialState.cardDrawn,
                faceCard: initialState.faceCard,
                cardDeck: initialState.cardDeck,
            }
        }
        default:
            return state
    }
};

export default gameReducer;