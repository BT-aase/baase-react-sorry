import { SET_PLAYER_DETAILS } from "../actions/game";


const initialState = {
    gameSide: 'red',
    playerColors: [],
    playerHomePieces: []
};

const gameReducer = (state = initialState, action) => {
    console.log(action, state);
    switch (action.type) {
        case SET_PLAYER_DETAILS: {
            let updatedPlayerColors = [...state.playerColors];
            let updatedHomePieces = [...state.playerHomePieces];
            let playerNum = state.playerColors.length + 1;
            let color = action.color;
            updatedPlayerColors.push({playerNum,color})
            updatedHomePieces.push({playerNum, pieces: 4})
            return {
                ...state,
                playerColors: updatedPlayerColors,
                playerHomePieces: updatedHomePieces
            }
        }
        default:
            return state
    }
};

export default gameReducer;