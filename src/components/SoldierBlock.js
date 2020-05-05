import React, { Component } from "react";
import "../index.css";
import Square from "./Square";

class SoldierBlock extends Component {
  renderSquare(square) {
    return <Square piece={square} style={square.style} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.props.whitePieces.map((ws) => this.renderSquare(ws))}
        </div>
        <div className="board-row">
          {this.props.blackPieces.map((bs, index) => this.renderSquare(bs))}
        </div>
      </div>
    );
  }
}

export default SoldierBlock;
