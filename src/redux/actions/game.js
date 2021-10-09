export const START_GAME = 'START_GAME';
export const CREATE_DECK = 'CREATE_DECK';
export const DRAW_CARD = 'DRAW_CARD';
export const START_ACTIONS = 'START_ACTIONS';
export const DISPLAY_MOVES = 'DISPLAY_MOVES';
export const CLEAR_MOVES = 'CLEAR_MOVES';
export const MOVE_PIECE = 'MOVE_PIECE';
export const SWAP_PIECE = 'SWAP_PIECE';
export const SHOW_SWAPPABLE = 'SHOW_SWAPPABLE';
export const SLIDE_REMOVE = 'SLIDE_REMOVE';
export const MOVE_TO_HOME = 'MOVE_TO_HOME';
export const END_TURN = 'END_TURN';
export const RESTART_GAME = 'RESTART_GAME';

export const startGame = (colors, startingColor) => {
    return {
      type: START_GAME,
      colors,
      startingColor
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

export const clearMoves = () => {
  return {
    type: CLEAR_MOVES
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

export const slideRemove = (space) => {
  return {
    type: SLIDE_REMOVE,
    space
  }
}

export const moveToHome = (color) => {
  return {
    type: MOVE_TO_HOME,
    color
  }
}

export const endTurn = () => {
  return {
    type: END_TURN
  }
}

export const restartGame = () => {
  return {
    type: RESTART_GAME
  }
}