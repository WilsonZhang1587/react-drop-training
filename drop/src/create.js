import React, { Component } from "react";

import Board from "./Create/Board";
import Card from "./Create/Card";

export class Create extends Component {
  state = { array: [] };
  componentDidMount() {
    document.addEventListener("drop", this.get);
  }

  get = async () => {
    let arr = [];
    let board = document.getElementById("board-1");

    const map = Array.prototype.map;
    await map.call(board.children, (obj, index) => {
      arr.push(obj.dataset.value);
    });

    this.setState({ array: arr });
  };

  close = () => {
    document.removeEventListener("drop", this.get);
  };

  open = () => {
    document.addEventListener("drop", this.get);
  };

  render() {
    console.log(this.state.array);
    return (
      <div>
        <Board
          id="board-1"
          className="board"
          style={{ width: "500px", height: "200px", backgroundColor: "red" }}
        >
          <Card id="card-1" className="card" draggable="true" value="No.1">
            <p>Card One</p>
          </Card>
        </Board>

        <Board
          id="board-2"
          className="board"
          style={{ width: "500px", height: "200px", backgroundColor: "blue" }}
        >
          <Card id="card-2" className="card" draggable="true" value="No.2">
            <p>Card Two</p>
          </Card>
        </Board>

        <Board
          id="board-3"
          className="board"
          style={{ width: "500px", height: "200px", backgroundColor: "green" }}
        >
          <Card id="card-3" className="card" draggable="true" value="No.3">
            <p>Card Three</p>
          </Card>
        </Board>

        <button onClick={this.open}>open</button>
        <br />
        <button onClick={this.close}>close</button>
      </div>
    );
  }
}

export default Create;
