import {
    SET_PLAYER_DETAILS, CREATE_DECK, DRAW_CARD, START_ACTIONS,
    DISPLAY_MOVES, MOVE_PIECE, SWAP_PIECE, SHOW_SWAPPABLE, 
    SLIDE_REMOVE, END_TURN
} from "../actions/game";

const initialState = {
    gameSide: 'red',
    playerColors: [{ playerNum: 1, color: "red" }, { playerNum: 2, color: "blue" }],
    playerStartPieces: [{ playerNum: 1, pieces: 3 }, { playerNum: 2, pieces: 3 }],
    faceCard: 0,
    cardDeck: [],
    piecesInPlay: [{ space: 12, color: 'red' }, { space: 17, color: 'blue' }],
    possibleMoves: [],
    swapSelected: {}
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYER_DETAILS: {
            let updatedPlayerColors = [...state.playerColors];
            let updatedStartPieces = [...state.playerStartPieces];
            let playerNum = state.playerColors.length + 1;
            let color = action.color;
            updatedPlayerColors.push({ playerNum, color })
            updatedStartPieces.push({ playerNum, pieces: 4 })
            return {
                ...state,
                playerColors: updatedPlayerColors,
                playerStartPieces: updatedStartPieces
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
                cardDeck: cards
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
                currentStart.push({ playerNum: player.playerNum, pieces: currentPieces + 1 });

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
            let currCard = 11;
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
                            if (!occupied.includes(position + 1)) {
                                displayPieces.push({ move: wrapBoard(position + 1), position });
                            }
                            break;
                        case 2:
                            if (!occupied.includes(position + 2)) {
                                displayPieces.push({ move: wrapBoard(position + 2), position });
                            }
                            break;
                        case 3:
                            if (!occupied.includes(position + 3)) {
                                displayPieces.push({ move: wrapBoard(position + 3), position });
                            }
                            break;
                        case 4:
                            if (!occupied.includes(position - 4)) {
                                displayPieces.push({ move: wrapBoard(position - 4), position, action: 'backwards' });
                            }
                            break;
                        case 5:
                            if (!occupied.includes(position + 5)) {
                                displayPieces.push({ move: wrapBoard(position + 5), position });
                            }
                            break;
                        case 7:
                            if (!occupied.includes(position + 7)) {
                                displayPieces.push({ move: wrapBoard(position + 7), position });
                            }
                            break;
                        case 8:
                            if (!occupied.includes(position + 8)) {
                                displayPieces.push({ move: wrapBoard(position + 8), position });
                            }
                            break;
                        case 10:
                            if (!occupied.includes(position + 10)) {
                                displayPieces.push({ move: wrapBoard(position + 10), position });
                            }

                            if (!occupied.includes(position - 1)) {
                                displayPieces.push({ move: wrapBoard(position - 1), position, action: 'backwards' });
                            }
                            break;
                        case 12:
                            if (!occupied.includes(position + 12)) {
                                displayPieces.push({ move: wrapBoard(position + 12), position });
                            }
                            break;
                        default:
                            break;
                    }
                }

                let startExits = [
                    { space: 33, color: 'red' }, { space: 46, color: 'blue' },
                    { space: 5, color: 'yellow' }, { space: 18, color: 'green' }
                ]

                if (currCard === 1 || currCard === 2) {
                    let colorExit = startExits.find(({ color }) => color === state.gameSide);
                    if (!occupied.includes(colorExit.space)) {
                        displayPieces.push({ move: `${state.gameSide}Home`, position: `${state.gameSide}Home` })
                    }
                };

                for (let i = 0; i < currPieces.length; i++) {
                    pieceMover(currPieces[i].space, currCard, occupied);
                };

            } else if (currCard === 11) {
                let currPieces = [...state.piecesInPlay].filter(piece => piece.color === state.gameSide);
                let oppPieces = [...state.piecesInPlay].filter(piece => piece.color !== state.gameSide);

                getOccupied(currPieces);

                for (let i = 0; i < currPieces.length; i++) {
                    if (!occupied.includes(currPieces[i].space + 11)) {
                        displayPieces.push({ move: wrapBoard(currPieces[i].space + 11), position: currPieces[i].space })
                    }
                }

                for (let i = 0; i < oppPieces.length; i++) {
                    displayPieces.push({ move: 'swap', position: oppPieces[i].space })
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

            let currPlayer = playerColors.findIndex(player => player.color = currColor);
            console.log(currPlayer)

            if (currPlayer + 1 < playerColors.length) {
                newColor = playerColors[currPlayer + 1].color;
            } else {
                newColor = playerColors[0].color;
            }

            console.log(newColor)


            return {
                ...state,
                possibleMoves: [],
                swapSelected: {},
                gameSide: newColor
            }
        }
        default:
            return state
    }
};

export default gameReducer;