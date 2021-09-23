import { SET_PLAYER_DETAILS, CREATE_DECK, DRAW_CARD } from "../actions/game";

const initialState = {
    gameSide: 'red',
    playerColors: [],
    playerStartPieces: [],
    faceCard: 0,
    cardDeck: []
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
        default:
            return state
    }
};

export default gameReducer;