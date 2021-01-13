import React, { Component } from "react";

export class test extends Component {
  componentDidMount() {
    const fill = document.querySelector(".fill");
    const empties = document.querySelectorAll(".empty");

    function dragStart(e) {
      console.log("start");
      console.log(e.target.name);
    }

    function dragEnd() {
      console.log("end");
    }

    // ------------------------------------------
    function dragOver(e) {
      e.preventDefault();
      console.log("over");
    }
    function dragEnter(e) {
      e.preventDefault();
      console.log("enter");
    }
    function dragLeave() {
      console.log("leave");
    }
    function dragDrop() {
      console.log("drop");
      this.append(fill);
    }
    // ------------------------------------------

    fill.addEventListener("dragstart", dragStart);
    fill.addEventListener("dragend", dragEnd);

    for (const empty of empties) {
      empty.addEventListener("dragover", dragOver);
      empty.addEventListener("dragenter", dragEnter);
      empty.addEventListener("dragleave", dragLeave);
      empty.addEventListener("drop", dragDrop);
    }

  }
  render() {
    return (
      <div className="App">
        <div
          className="empty"
          style={{ width: "500", height: "300px", backgroundColor: "red" }}
        >
          <div
            className="fill"
            name="fill_one"
            style={{ width: "50px", height: "50px", backgroundColor: "green" }}
            draggable={true}
          >
            1
          </div>

          <div
            className="fill"
            name="fill_two"
            style={{ width: "50px", height: "50px", backgroundColor: "green" }}
            draggable={true}
          >
            2
          </div>
        </div>
        <div
          className="empty"
          style={{ width: "500", height: "300px", backgroundColor: "blue" }}
        ></div>
      </div>
    );
  }
}

export default test;
