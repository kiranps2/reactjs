import React, { useState } from "react";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("Add a task to get started!");
  const [headingColor, setHeadingColor] = useState("transparent");

  function addTask() {
    if (task == "") {
      return;
    }

    setTasks([...tasks, task]);
    setMessage("Task added: " + task + "!");
    setTask("");
    setHeadingColor("lightblue");
  }

  return (
    <div className="container mt-4">
      
      <h1
        style={{
          backgroundColor: headingColor,
          padding: "10px"
        }}
      >
        Task Planner
      </h1>

      <div className="card p-4 mb-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <TaskList
        tasks={tasks}
        message={message}
      />

    </div>
  );
}

export default App;