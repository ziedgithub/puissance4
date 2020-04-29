import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import io from "socket.io-client";

import { withRouter } from "react-router-dom";

import CustomInput from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custum-button/cutom-button.component";

import config from "../../config";
import './login.styles.scss';
import logo from '../../static/favicon.png';
import {setConnectedUsers, setCurrentUser, setRegistrationSocket} from "../../redux/user/user.actions";

class Login extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      error: ''
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState((state) => ({
      ...state,
      error: '',
      input: value
    }));
  }

  handleSubmit = async (event) => {
    const { input } = this.state;
    const { setCurrentUser, setConnectedUsers, history, setRegistrationSocket } = this.props;
    const user = {
        name: input
    };
    event.preventDefault();
    try {
      const url = `${config.apiEndPoint}api/users/exists/`;

      await axios(
        url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          data: {user}
        }
      );
      setCurrentUser(input);
      const socket = io(`${config.apiEndPoint}register`);
      setRegistrationSocket(socket);
      socket.on('connectedUsers', (users) => {
        setConnectedUsers(users);
      });
      history.push('/users');
      socket.emit('registerInfos', {
        username: input
      });
    } catch (e) {
      this.setState(state => ({
        ...state,
        error: e
      }))
    }
  }

  render() {
    const { input, error } = this.state;
    return (
      <div className='login'>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <img src={logo} alt="logo"/>
          <CustomInput
            value={input}
            type='text'
            handleChange={this.handleChange}
            label='Name'
            required
          />
          <CustomButton type='submit'>
            Validate
          </CustomButton>
          {
            error ?
              <div className='error'>
                Username already exists
              </div>: null
          }
        </form>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setConnectedUsers: (users) => dispatch(setConnectedUsers(users)),
  setRegistrationSocket: (socket) => dispatch(setRegistrationSocket(socket))
})

export default connect(null, mapDispatchToProps)(withRouter(Login));