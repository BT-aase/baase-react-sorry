export const SET_PLAYER_DETAILS = 'SET_PLAYER_DETAILS';

export const setPlayerDetails = (color) => {
    return {
      type: SET_PLAYER_DETAILS,
      color
    };
  };