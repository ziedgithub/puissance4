import OpponentActionTypes from "./opponent.types";

export const setCurrentOpponent = (opponent) => ({
  type: OpponentActionTypes.SET_CURRENT_OPPONENT,
  payload: opponent
});