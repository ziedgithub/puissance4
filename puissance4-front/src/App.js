import React from 'react';
import {Route} from "react-router-dom";

import Login from "./pages/login/login.component";
import Game from "./pages/game/game.component";
import Users from "./pages/users/users.component";

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        <Route exact path='/' component={Login} />
        <Route path='/game' component={Game} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
}

export default App;
