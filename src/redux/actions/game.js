export const SET_PLAYER_DETAILS = 'SET_PLAYER_DETAILS';
export const CREATE_DECK = 'CREATE_DECK';
export const DRAW_CARD = 'DRAW_CARD';

export const setPlayerDetails = (color) => {
    return {
      type: SET_PLAYER_DETAILS,
      color
    };
  };

export const createDeck = () => {
  return {
    type: CREATE_DECK
  }
}

export const drawCard = () => {
  return {
    type: DRAW_CARD
  }
}