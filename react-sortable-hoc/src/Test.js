import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = SortableElement(({ value }) => (
  <li style={{ width: "50px", height: "50px", listStyleType: "none" }}>
    {value}
  </li>
));
const SortableList = SortableContainer(({ items }) => {
  return (
    <ul
      style={{
        width: "200px",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)"
      }}
    >
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});
export class Test extends Component {
  state = {
    items: ["1", "2", "3", "4", "5", "6"]
  };
  onSortEnd = props => {
    this.setState(({ items }) => ({
      items: arrayMove(items, props.oldIndex, props.newIndex)
    }));
  };
  render() {
    return (
      <SortableList
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        updateBeforeSortStart={this.updateBeforeSortStart}
        axis="xy"
      />
    );
  }
}

export default Test;
