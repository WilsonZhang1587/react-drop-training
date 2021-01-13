import React, { Component } from "react";
import "@atlaskit/css-reset";

import initialData from "./Dnd1/initial-data";
import Column from "./Dnd1/Column";

import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export class App extends Component {
  state = initialData;

  onDragStart = start => {
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.2s ease";
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({ homeIndex });
  };

  // onDragUpdate = update => {
  //   const { destination } = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(this.state.tasks).length
  //     : 0;
  //   document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
  // };

  onDragEnd = result => {
    this.setState({ homeIndex: null });

    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";

    // TODO: reorder our column
    // destination -> 目的地的位置 , source -> 起始的位置 , draggableId -> 正在拖曳的 id
    const { destination, source, draggableId } = result;
    // 沒有目的地 就不作業
    if (!destination) {
      return;
    }
    // 起始區塊 =目的地區塊 && 起始拖曳物件 =目的地拖曳物件
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // const column = this.state.columns[source.droppableId];
    const start = this.state.columns[source.droppableId]; // 起始位置的區塊 id
    const finish = this.state.columns[destination.droppableId]; // 目的地位置的區塊 id

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds); // 把舊有的 [] clone 成一個新的 []
      // ↓ 起始位置和目的地相同時 => [] 位置不同時重新排序
      newTaskIds.splice(source.index, 1); // 刪除起始位置的 [] 排序
      newTaskIds.splice(destination.index, 0, draggableId); // 新增目的地位置的 [] 排序
      // 把舊有的 data 換掉
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      //最後 setState 更新
      this.setState(newState);
    } else {
      // Moving from one list to another
      const startTaskIds = Array.from(start.taskIds); // 起始位置的 舊有 [] clone 成一個新的 []
      startTaskIds.splice(source.index, 1); // 刪除起始位置的 [] 排序
      const newStart = {
        ...start,
        taskIds: startTaskIds
      };

      const finishTaskIds = Array.from(finish.taskIds); // 目的地位置的 舊有 [] clone 成一個新的 []
      finishTaskIds.splice(destination.index, 0, draggableId); // 新增目的地位置的 [] 排序
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };
      this.setState(newState);
    }
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId]
            );

            // 目的地的排序 > 起始區塊的排序 , 則關閉 目的地區塊的接收拖曳事件
            const isDropDisabled = index < this.state.homeIndex;

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                isDropDisabled={isDropDisabled}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

export default App;
