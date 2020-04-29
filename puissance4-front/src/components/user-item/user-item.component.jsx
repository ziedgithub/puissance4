import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import io from "socket.io-client";

import './user-item.styles.scss';
import {setCurrentOpponent} from "../../redux/opponent/opponent.actions";
import config from "../../config";

class UserItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: false
    }
  }

  handleClick = (event) => {
    const { currentUser, history, setCurrentOpponent } = this.props;
    const socket = io(`${config.apiEndPoint}invite`);
    const opponent = event.target.innerHTML;

    socket.on('confirmed', () => {
      setCurrentOpponent(opponent);
      socket.close();
      history.push('/game');
    });

    socket.emit('invite', {
      src: currentUser,
      to: opponent
    })

    this.setState({
      waiting: true
    });
  };

  render() {
    const { name } = this.props;
    const { waiting } = this.state;
    return (
      <li onClick={this.handleClick}>
        <b>
          {name}
        </b>
        {
          waiting?
            <span style={{
              marginLeft: "3px"
            }}>
              Waiting for confirmation !!
            </span>: null
        }
      </li>
    )
  }
}

const mapStateToProps = (state) => ({
  registrationSocket: state.user.registrationSocket,
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentOpponent: opponent => dispatch(setCurrentOpponent(opponent))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserItem));