import { SET_PLAYER_DETAILS, CREATE_DECK, DRAW_CARD, START_ACTIONS, DISPLAY_MOVES, displayMoves } from "../actions/game";

const initialState = {
    gameSide: 'red',
    playerColors: [],
    playerStartPieces: [],
    faceCard: 0,
    cardDeck: [],
    piecesInPlay: [{ space: 12, color: 'red' }, { space: 1, color: 'red' }, { space: 22, color: 'blue' }],
    possibleMoves: []
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

            if (action.action = 'out') {
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

            if (moveCards.includes(currCard)) {
                let currPieces = [...state.piecesInPlay].filter(piece => piece.color === state.gameSide);

                getOccupied(currPieces);

                const pieceMover = (position, card, occupied) => {
                    switch (card) {
                        case 1:
                            if (!occupied.includes(position + 1)) {
                                displayPieces.push(position + 1);
                            }
                            break;
                        case 2:
                            if (!occupied.includes(position + 2)) {
                                displayPieces.push(position + 2);
                            }
                            break;
                        case 3:
                            if (!occupied.includes(position + 3)) {
                                displayPieces.push(position + 3);
                            }
                            break;
                        case 4:
                            if (!occupied.includes(position - 4)) {
                                displayPieces.push(position - 4);
                            }
                            break;
                        case 5:
                            if (!occupied.includes(position + 5)) {
                                displayPieces.push(position + 5);
                            }
                            break;
                        case 7:
                            if (!occupied.includes(position + 7)) {
                                displayPieces.push(position + 7);
                            }
                            break;
                        case 8:
                            if (!occupied.includes(position + 8)) {
                                displayPieces.push(position + 8);
                            }
                            break;
                        case 10:
                            if (!occupied.includes(position + 10)) {
                                displayPieces.push(position + 10);
                            }

                            if (!occupied.includes(position - 1)) {
                                displayPieces.push(position - 1);
                            }
                            break;
                        case 12:
                            if (!occupied.includes(position + 12)) {
                                displayPieces.push(position + 12);
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

                for (let i = 0; i < currPieces.length; i++) {
                    if (currCard === 1 || currCard === 2) {
                        let colorExit = startExits.find(({ color }) => color === state.gameSide);
                        if (!occupied.includes(colorExit.space)) {
                            displayPieces.push(`${state.gameSide}Home`)
                        }
                    };

                    pieceMover(currPieces[i].space, currCard, occupied)
                };

            } else if (currCard === 11) {
                let currPieces = [...state.piecesInPlay].filter(piece => piece.color === state.gameSide);
                let oppPieces = [...state.piecesInPlay].filter(piece => piece.color !== state.gameSide);

                getOccupied(currPieces);
                console.log(occupied)

                for (let i = 0; i < currPieces.length; i++) {
                    if (!occupied.includes(currPieces[i].space + 11)) {
                        displayPieces.push(currPieces[i].space + 11)
                    }
                }


                for (let i = 0; i < oppPieces.length; i++) {
                    displayPieces.push(oppPieces[i].space)
                }

            } else {
                let oppPieces = [...state.piecesInPlay].filter(piece => piece.color !== state.gameSide);

                for (let i = 0; i < oppPieces.length; i++) {
                    displayPieces.push(oppPieces[i].space)
                }
            }

            return {
                ...state,
                possibleMoves: displayPieces
            }

        }
        default:
            return state
    }
};

export default gameReducer;