import UserActionTypes from './user.types';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const setConnectedUsers = users => ({
  type: UserActionTypes.SET_CONNECTED_USERS,
  payload: users
});

export const setRegistrationSocket = socket => ({
  type: UserActionTypes.SET_REGISTRATION_SOCKET,
  payload: socket
});

export const setInvited = () => ({
  type: UserActionTypes.SET_INVITED
});

export const toggleTurn = () => ({
  type: UserActionTypes.TOGGLE_TURN
});

export const setTurn = (value) => ({
  type: UserActionTypes.SET_TURN,
  payload: value
});
