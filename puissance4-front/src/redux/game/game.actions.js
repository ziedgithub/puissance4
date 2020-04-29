import GameActionTypes from './game.types';

export const addValueToColumn = (value, columnIndex) => ({
  type: GameActionTypes.ADD_VALUE_TO_COLUMN,
  payload: {
    value,
    columnIndex
  }
});

export const initializeMatrix = () => ({
  type: GameActionTypes.INITIALIZE_MATRIX
});