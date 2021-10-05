import {
    START_GAME, CREATE_DECK, DRAW_CARD, START_ACTIONS,
    DISPLAY_MOVES, MOVE_PIECE, SWAP_PIECE, SHOW_SWAPPABLE,
    SLIDE_REMOVE, END_TURN
} from "../actions/game";

const initialState = {
    gameStarted: false,
    gameSide: '',
    playerColors: [],
    playerStartPieces: [],
    faceCard: 0,
    cardDeck: [],
    piecesInPlay: [],
    possibleMoves: [],
    swapSelected: {}
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME: {
            let startPieces = [...state.playerStartPieces];
            for (let a = 1; a < action.colors.length + 1; a++) {
                startPieces.push({ playerNum: a, pieces: 4 })
            }

            return {
                ...state,
                playerColors: action.colors,
                playerStartPieces: startPieces,
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
                faceCard: newCard
            }
        }
        case START_ACTIONS: {
            const player = [...state.playerColors].find(({ color }) => color === action.color);
            let currentStart = [...state.playerStartPieces];
            const startPieces = currentStart.find(({ playerNum }) => playerNum === player.playerNum);
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

            if (moveCards.includes(currCard)) {
                let currPieces = [...state.piecesInPlay].filter(piece => piece.color === state.gameSide);
                getOccupied(currPieces);

                const pieceMover = (position, card, occupied) => {
                    switch (card) {
                        case 1:
                            if (!occupied.includes(wrapBoard(position + 1))) {
                                displayPieces.push({ move: wrapBoard(position + 1), position });
                            }
                            break;
                        case 2:
                            if (!occupied.includes(wrapBoard(position + 2))) {
                                displayPieces.push({ move: wrapBoard(position + 2), position });
                            }
                            break;
                        case 3:
                            if (!occupied.includes(wrapBoard(position + 3))) {
                                displayPieces.push({ move: wrapBoard(position + 3), position });
                            }
                            break;
                        case 4:
                            if (!occupied.includes(wrapBoard(position - 4))) {
                                displayPieces.push({ move: wrapBoard(position - 4), position, action: 'backwards' });
                            }
                            break;
                        case 5:
                            if (!occupied.includes(wrapBoard(position + 5))) {
                                displayPieces.push({ move: wrapBoard(position + 5), position });
                            }
                            break;
                        case 7:
                            if (!occupied.includes(wrapBoard(position + 7))) {
                                displayPieces.push({ move: wrapBoard(position + 7), position });
                            }
                            break;
                        case 8:
                            if (!occupied.includes(wrapBoard(position + 8))) {
                                displayPieces.push({ move: wrapBoard(position + 8), position });
                            }
                            break;
                        case 10:
                            if (!occupied.includes(wrapBoard(position + 10))) {
                                displayPieces.push({ move: wrapBoard(position + 10), position });
                            }

                            if (!occupied.includes(wrapBoard(position - 1))) {
                                displayPieces.push({ move: wrapBoard(position - 1), position, action: 'backwards' });
                            }
                            break;
                        case 12:
                            if (!occupied.includes(wrapBoard(position + 12))) {
                                displayPieces.push({ move: wrapBoard(position + 12), position });
                            }
                            break;
                        default:
                            break;
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

                    for (let s = 0; s < displayPieces.length; s++) {
                        if (displayPieces[s].position < block && displayPieces[s].move >= block) {
                            console.log('move into safe')
                            switch (displayPieces[s].move - block) {
                                case 0:
                                    displayPieces[s].move = `${state.gameSide}Safe1`;
                                    break;
                                case 1:
                                    displayPieces[s].move = `${state.gameSide}Safe2`;
                                    break;
                                case 2:
                                    displayPieces[s].move = `${state.gameSide}Safe3`;
                                    break;
                                case 3:
                                    displayPieces[s].move = `${state.gameSide}Safe4`;
                                    break;
                                case 4:
                                    displayPieces[s].move = `${state.gameSide}Safe5`;
                                    break;
                                case 5:
                                    displayPieces[s].move = `${state.gameSide}Home`;
                                    break;
                                default:
                                    let index = displayPieces.indexOf(displayPieces[s]);
                                    console.log(s, index)
                                    break;
                            }
                        }
                    }
                }

                let startExits = [
                    { space: 33, color: 'red' }, { space: 46, color: 'blue' },
                    { space: 5, color: 'yellow' }, { space: 18, color: 'green' }
                ]

                if (currCard === 1 || currCard === 2) {
                    let colorExit = startExits.find(({ color }) => color === state.gameSide);
                    if (!occupied.includes(colorExit.space)) {
                        displayPieces.push({ move: `${state.gameSide}Start`, position: `${state.gameSide}Start` })
                    }
                };

                for (let i = 0; i < currPieces.length; i++) {
                    pieceMover(currPieces[i].space, currCard, occupied);
                };

                safeHome(displayPieces)

                console.log(displayPieces)

            } else if (currCard === 11) {
                let currPieces = [...state.piecesInPlay].filter(piece => piece.color === state.gameSide);
                let oppPieces = [...state.piecesInPlay].filter(piece => piece.color !== state.gameSide);

                getOccupied(currPieces);

                for (let i = 0; i < currPieces.length; i++) {
                    if (!occupied.includes(wrapBoard(currPieces[i].space + 11))) {
                        displayPieces.push({ move: wrapBoard(currPieces[i].space + 11), position: currPieces[i].space })
                    }
                }

                if (currPieces.length > 0) {
                    for (let i = 0; i < oppPieces.length; i++) {
                        displayPieces.push({ move: 'swap', position: oppPieces[i].space })
                    }
                }

            } else {
                let oppPieces = [...state.piecesInPlay].filter(piece => piece.color !== state.gameSide);

                for (let i = 0; i < oppPieces.length; i++) {
                    displayPieces.push({ move: 'sorry', position: oppPieces[i].space })
                }
            }

            return {
                ...state,
                possibleMoves: displayPieces
            }

        }
        case MOVE_PIECE: {
            let pieces = [...state.piecesInPlay];
            let movingPiece = pieces.find(piece => piece.space === action.oldSpace && piece.color === state.gameSide);
            let pieceIndex = pieces.findIndex(piece => piece.space === action.oldSpace && piece.color === state.gameSide);
            pieces.splice(pieceIndex, 1);
            pieces.push({ space: action.newSpace, color: movingPiece.color });

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
        case END_TURN: {
            let playerColors = [...state.playerColors];
            let currColor = state.gameSide;
            let newColor;

            let currPlayer = playerColors.find(player => player.color === currColor);
            let nextPlayer = playerColors.find(player => player.playerNum === currPlayer.playerNum + 1);

            if (nextPlayer) {
                newColor = nextPlayer.color;
            } else {
                newColor = playerColors[0].color;
            }

            return {
                ...state,
                gameSide: newColor,
                possibleMoves: [],
                swapSelected: {}
            }
        }
        default:
            return state
    }
};

export default gameReducer;