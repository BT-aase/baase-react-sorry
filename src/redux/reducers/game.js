import { SET_PLAYER_DETAILS } from "../actions/game";


const initialState = {
    gameSide: 'red',
    playerColors: [],
    playerStartPieces: []
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYER_DETAILS: {
            let updatedPlayerColors = [...state.playerColors];
            let updatedStartPieces = [...state.playerStartPieces];
            let playerNum = state.playerColors.length + 1;
            let color = action.color;
            updatedPlayerColors.push({playerNum,color})
            updatedStartPieces.push({playerNum, pieces: 4})
            return {
                ...state,
                playerColors: updatedPlayerColors,
                playerStartPieces: updatedStartPieces
            }
        }
        default:
            return state
    }
};

export default gameReducer;