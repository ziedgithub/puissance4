import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

import config from "../../config";
import './game.styles.scss';
import Column from "../../components/column/column.component";
import {addValueToColumn, initializeMatrix} from "../../redux/game/game.actions";
import {setTurn, toggleTurn} from "../../redux/user/user.actions";

class Game extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      gameSocket: {},
      win: false,
      lose: false,
      x: null
    }
  }

  componentDidMount() {
    const { currentUser, currentOpponent, registrationSocket, invited, addCell, setTurn, toggleTurn, history, initializeMatrix } = this.props;
    if(registrationSocket.socket) {
      registrationSocket.close();
    }
    if (!currentOpponent && !currentUser) {
      history.push('/');
    }
    const gameSocket = io(`${config.apiEndPoint}game`);
    this.setState(state => ({
      ...state,
      gameSocket
    }));
    gameSocket.emit('startGame', invited?
      {player1: currentOpponent, player2: currentUser}:
      {player1: currentUser, player2: currentOpponent}
    );
    setTurn(!invited);
    gameSocket.on('newAction',({x, player}) => {
      addCell(player === currentUser ? 1: 2, x);
      toggleTurn();
      const { currentMatrix } = this.props;
      if(this.verifyWin(currentMatrix, x)) {
        alert(`You ${player === currentUser ? 'win' : 'lose'}`);
        initializeMatrix();
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  verifyWin(matrix, column) {
    const horiz = (M, columnIdx, cellIdx) => {
      const searchingValue = M[columnIdx][cellIdx];
      let right = 0;
      let left = -1;
      while(columnIdx+right<7 && M[columnIdx+right][cellIdx]=== searchingValue){
        right++;
      }
      while(columnIdx+left>=0 && M[columnIdx+left][cellIdx]=== searchingValue){
        left--;
      }
      return right - left -1;
    }
    const vert = (M, columnIdx, cellIdx) => {
      const searchingValue = M[columnIdx][cellIdx];
      let down = 0;
      while(cellIdx+down>=0 && M[columnIdx][cellIdx+down]=== searchingValue){
        down--;
      }
      return -down;
    }
    const rightInc = (M, columnIdx, cellIdx) => {
      const searchingValue = M[columnIdx][cellIdx];
      let upRight = 0;
      let downLeft = -1;

      while(columnIdx+upRight<7 && cellIdx+upRight<6 && M[columnIdx+upRight][cellIdx+upRight]=== searchingValue){
        upRight++;
      }
      while(columnIdx+downLeft>=0 && cellIdx+downLeft>=0 && M[columnIdx+downLeft][cellIdx+downLeft]=== searchingValue){
        downLeft--;
      }

      return upRight - downLeft -1;
    }
    const leftInc = (M, columnIdx, cellIdx) => {
      const searchingValue = M[columnIdx][cellIdx];
      let upLeft = -1;
      let downRight = 0;

      while(columnIdx+upLeft>=0 && cellIdx-upLeft<6 && M[columnIdx+upLeft][cellIdx-upLeft]=== searchingValue){
        upLeft--;
      }
      while(columnIdx+downRight<7 && cellIdx-downRight>=0 && M[columnIdx+downRight][cellIdx-downRight]=== searchingValue){
        downRight++;
      }

      return downRight-upLeft -1;
    }
    const nextCellIdx = matrix[column].indexOf(-1);
    const playedCellIdx = nextCellIdx!==-1 ? nextCellIdx - 1 : 5;
    const horizontal = horiz(matrix, column, playedCellIdx) >= 4;
    const vertical = vert(matrix, column, playedCellIdx) >= 4;
    const rightIncline = rightInc(matrix, column, playedCellIdx) >= 4;
    const leftIncline = leftInc(matrix, column, playedCellIdx) >= 4;
    return horizontal || vertical || rightIncline || leftIncline;
  }

  render() {
    return (
      <div className='gamePage'>
        <h1>
          <span className={this.props.turn? 'turn': ''}>You</span> VS <span className={!this.props.turn? 'turn': ''}>{this.props.currentOpponent}</span>
        </h1>
        <div className='gameMatrix'>
          <div className='content'>
            {
              (function (s) {
                let result = [];
                for (let i = 0; i < 7; i++) {
                  result.push(
                    <Column key={i} index={i} gameSocket={s.gameSocket} />
                    )
                }
                return result;
              })(this.state)
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  registrationSocket: state.user.registrationSocket,
  currentOpponent: state.opponent.currentOpponent,
  invited: state.user.invited,
  currentMatrix: state.game.currentMatrix,
  turn: state.user.turn
});

const mapDispatchToProps = dispatch => ({
  addCell: (value, idxC) => dispatch(addValueToColumn(value, idxC)),
  setTurn: (value) => dispatch(setTurn(value)),
  toggleTurn: () => dispatch(toggleTurn()),
  initializeMatrix: () => dispatch(initializeMatrix())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));