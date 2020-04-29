import OpponentActionTypes from "./opponent.types";

const INITIAL_STATE = {
  currentOpponent: ''
}

const opponentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OpponentActionTypes.SET_CURRENT_OPPONENT:
      return ({
        ...state,
        currentOpponent: action.payload
      });
    default:
      return state;
  }
}

export default opponentReducer;