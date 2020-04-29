import GameActionTypes from "./game.types";

const initialValues = [-1,0,0,0,0,0];

const INITIAL_STATE = {
  currentMatrix: (function () {
    let m = [];
    for (let i=0; i<7; i++) {
      m[i] = new Array(...initialValues)
    }
    return m;
  })()
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GameActionTypes.ADD_VALUE_TO_COLUMN:
      const { columnIndex, value } = action.payload;
      const currentMatrix = state.currentMatrix.map(column => column.slice());
      const indexOfNextCell = currentMatrix[columnIndex].indexOf(-1);
      if (indexOfNextCell >=0)
      {
        currentMatrix[columnIndex][indexOfNextCell] = value;
      }
      if (indexOfNextCell < 5 && indexOfNextCell >=0) {
        currentMatrix[columnIndex][indexOfNextCell+1] = -1;
      }
      return {
        ...state,
        currentMatrix
      };
    case GameActionTypes.INITIALIZE_MATRIX:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default gameReducer;