import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: '',
  connectedUsers: [],
  registrationSocket: {},
  invited: false,
  turn: false
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.SET_CONNECTED_USERS:
      return {
        ...state,
        connectedUsers: action.payload
      };
    case UserActionTypes.SET_REGISTRATION_SOCKET:
      return {
        ...state,
        registrationSocket: action.payload
      };
    case UserActionTypes.SET_INVITED:
      return {
        ...state,
        invited: true
      };
    case UserActionTypes.TOGGLE_TURN:
      return {
        ...state,
        turn: !state.turn
      };
    case UserActionTypes.SET_TURN:
      return {
        ...state,
        turn: action.payload
      }
    default: return state
  }
}

export default userReducer;