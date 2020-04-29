import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import opponentReducer from "./opponent/opponent.reducer";
import gameReducer from "./game/game.reducer";

export default combineReducers({
  user: userReducer,
  opponent: opponentReducer,
  game: gameReducer
})