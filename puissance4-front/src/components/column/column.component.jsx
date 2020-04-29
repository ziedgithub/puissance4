import React from "react";
import { connect } from "react-redux";

import './column.styles.scss';
import Cell from "../cell/cell.component";

class Column extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      hoverColor: false
    }
  }

  setHover = () => {
    const {turn} = this.props;
    if (turn) {
      this.setState(state => ({
        ...state,
        hoverColor: true
      }))
    }
  }
  setOut = () => {
    const {turn} = this.props;
    if (turn) {
      this.setState(state => ({
        ...state,
        hoverColor: false
      }))
    }
  }

  handleClick = (column) => {
    const {turn} = this.props;
    if (turn) {
      const { gameSocket, currentUser, currentOpponent, invited} = this.props;
      gameSocket.emit('newAction', {
        x: column,
        player: currentUser,
        player1: invited ? currentOpponent:currentUser,
        player2: invited ? currentUser:currentOpponent
      });
    }
  }

  render() {
    const {index, currentColumn, turn} = this.props;
    return (
      <div className='column' onClick={() => this.handleClick(index)} onMouseOver={this.setHover} onMouseOut={this.setOut}>
        {
          (function (s) {
            let result = [];
            for (let i = 0; i < 6; i++) {
              result.push(
                <Cell
                  key={i}
                  bg={
                    bgValue(currentColumn(index)[i])
                  }
                  opac={s.hoverColor && currentColumn(index)[i]=== -1 && turn}
                />)
            }
            return result;
          })(this.state)
        }
      </div>
    )
  }
}

const bgValue = (value) => {
  if (value === 1) {return 'red'}
  if (value === 2) {return 'yellow'}
  return 'white'
}


const mapStateToProps = state => ({
  currentColumn: (idx) => state.game.currentMatrix[idx],
  currentUser: state.user.currentUser,
  currentOpponent: state.opponent.currentOpponent,
  invited: state.user.invited,
  turn: state.user.turn
});

export default connect(mapStateToProps)(Column);