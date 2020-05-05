/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import "../index.css";
import Board from "./Board";
import SoldierBlock from "./SoldierBlock";
import initialiseChessBoard from "../gameboard/Gameboard";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      whitePieces: [],
      blackFallenSoldiers: [],
      player: 1,
      selection: -1,
      status: "",
      turn: "white",
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (this.state.selection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({
          status:
            "Wrong selection. Choose player " + this.state.player + " pieces.",
        });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      } else {
        squares[i].style = {
          ...squares[i].style,
          backgroundColor: "RGB(111,143,114)",
        };
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i,
        });
      }
    } else if (this.state.selection > -1) {
      squares[this.state.sourceSelection].style = {
        ...squares[this.state.sourceSelection].style,
        backgroundColor: "",
      };
      if (squares[i] && squares[i].player === this.state.player) {
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          selection: -1,
        });
      } else {
        const squares = this.state.squares.slice();
        const whitePieces = this.state.whitePieces.slice();
        const blackPieces = this.state.blackPieces.slice();
        const isDestEnemyOccupied = squares[i] ? true : false;
        const isMovePossible = squares[
          this.state.sourceSelection
        ].isMovePossible(this.state.selection, i, isDestEnemyOccupied);
        const srcToDestPath = squares[
          this.state.sourceSelection
        ].getSrcToDestPath(this.state.selection, i);
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        if (isMovePossible && isMoveLegal) {
          if (squares[i] !== null) {
            if (squares[i].player === 1) {
              whitePieces.push(squares[i]);
            } else {
              blackPieces.push(squares[i]);
            }
          }
          squares[i] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === "white" ? "black" : "white";
          this.setState({
            selection: -1,
            squares: squares,
            whitePieces: whitePieces,
            blackPieces: blackPieces,
            player: player,
            status: "",
            turn: turn,
          });
        } else {
          this.setState({
            status:
              "Wrong selection. Choose valid source and destination again.",
            selection: -1,
          });
        }
      }
    }
  }

  isMoveLegal(srcToDestPath) {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div
              id="player-turn-box"
              style={{ backgroundColor: this.state.turn }}
            ></div>
            <div className="game-status">{this.state.status}</div>

            <div className="fallen-soldier-block">
              {
                <SoldierBlock
                  whitePieces={this.state.whitePieces}
                  blackPieces={this.state.blackPieces}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
