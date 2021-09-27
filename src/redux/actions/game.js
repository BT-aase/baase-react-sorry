export const SET_PLAYER_DETAILS = 'SET_PLAYER_DETAILS';
export const CREATE_DECK = 'CREATE_DECK';
export const DRAW_CARD = 'DRAW_CARD';
export const START_ACTIONS = 'START_ACTIONS';
export const DISPLAY_MOVES = 'DISPLAY_MOVES';
export const MOVE_PIECE = 'MOVE_PIECE';
export const SWAP_PIECE = 'SWAP_PIECE';
export const SHOW_SWAPPABLE = 'SHOW_SWAPPABLE';

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

export const startActions = (color, action) => {
  return {
    type: START_ACTIONS,
    color,
    action
  }
}

export const displayMoves = () => {
  return {
    type: DISPLAY_MOVES
  }
}

export const movePiece = (oldSpace, newSpace) => {
  return {
    type: MOVE_PIECE,
    oldSpace,
    newSpace
  }
}

export const swapPiece = (space, color) => {
  return {
    type: SWAP_PIECE,
    space,
    color
  }
}

export const showSwappable = (selected, pieces) => {
 return {
    type: SHOW_SWAPPABLE,
    selected,
    pieces
 } 
}