export const wrapBoard = (move) => {
    if (move > 56) {
        return move - 56;
    } else if (move < 1) {
        return move + 56
    } else {
        return move;
    }
}