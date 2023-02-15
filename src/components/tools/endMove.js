import { endTurn } from "../../redux/actions/game";

export const endMove = (dispatch) => {
    setTimeout(function () { dispatch(endTurn()) }, 1000);
};