import React from "react";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import { connect } from "react-redux";

import './users.styles.scss';
import UserList from "../../components/users-list/user-list.component";
import {setCurrentOpponent} from "../../redux/opponent/opponent.actions";
import {setInvited} from "../../redux/user/user.actions";
import config from "../../config";

const Users = ({currentUser, registrationSocket, history, setCurrentOpponent, setInvited}) => {
   registrationSocket.on('newInvitation', (src) => {
    const confirm = window.confirm('You have received a new invitation from '+ src);
    if (confirm) {
      setCurrentOpponent(src);
      setInvited();
      const confirmSocket = io(`${config.apiEndPoint}invite`);
      confirmSocket.emit('confirm', {
        src,
        to: currentUser
      });
      history.push('/game');
    }
  });

  return (
    <div>
      <h1>
        Welcome { currentUser }
      </h1>
      <span><i>Select a user to send invitation !</i></span>
      <UserList />
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  registrationSocket: state.user.registrationSocket
});

const mapDispatchToProps = dispatch => ({
  setCurrentOpponent: opponent => dispatch(setCurrentOpponent(opponent)),
  setInvited: () => dispatch(setInvited()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users));