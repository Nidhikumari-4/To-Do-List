import React, { useState } from "react";
import "./App.css";
import trashIcon from "./trash.svg";

function App() {
  const [taskInput, updateTaskInput] = useState("");
  const [toDoList, updateToDoList] = useState([]);

  const inputKeyDown = (event) => {
    if (event.keyCode === 13) addNote();
  };

  const addNote = () => {
    toDoList.push({ description: taskInput, isComplete: false });
    updateToDoList(toDoList);
    updateTaskInput("");
  };

  const deleteTask = (index) => {
    const newList = toDoList.filter((item, i) => i !== index);
    updateToDoList(newList);
  };

  const markComplete = (index) => {
    const list = [...toDoList];
    list[index].isComplete = !list[index].isComplete;
    updateToDoList(list);
  };

  return (
    <>
      <div>
        <p className="heading">React To Do List 🔥</p>
        <div className="taskContainer column">
          <div>
            <input
              className="textInput"
              value={taskInput}
              onKeyDown={inputKeyDown}
              onChange={(event) => updateTaskInput(event.target.value)}
            ></input>
            <button className="btnAdd" onClick={addNote}>
              ADD
            </button>
          </div>

          {/* conditional rendering 
          (toDoList?.length ?)=if toDoList is having some length then only will show <ListItems /> (:)else No Task Added !*/}

          {toDoList?.length ? (
            toDoList.map((toDoObject, index) => (
              <ListItems
                index={index}
                itemData={toDoObject}
                deleteTask={deleteTask}
                markComplete={markComplete}
              />
            ))
          ) : (
            <p className="noTaskContainer">📌 No Task Added !</p>
          )}
        </div>
        {/* <p className="footerText">Nidhi Kumari</p> */}
      </div>
    </>
  );
}
function ListItems(props) {
  return (
    <div className="listItems row">
      <span
        className={props.itemData.isComplete ? "taskComplete" : ""}
        onClick={() => props.markComplete(props.index)}
      >
        {props.itemData.description}
      </span>
      <img
        src={trashIcon}
        className="deleteIcon"
        onClick={() => props.deleteTask(props.index)}
      />
    </div>
  );
}

export default App;
