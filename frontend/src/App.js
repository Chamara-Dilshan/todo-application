import { useRef } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const refreshRef = useRef(null);

  return (
    <div className="App app-container">
      {/* <h1 className="app-title">Todo Application</h1> */}

      <div className="columns">
        <div className="left">
          <h2>Add a Task</h2>
          <TaskForm onCreated={() => refreshRef.current && refreshRef.current()} />
        </div>
        <div className="right">
          <h2>Recent Tasks</h2>
          <TaskList exposeRefresh={(fn) => (refreshRef.current = fn)} />
        </div>
      </div>
    </div>
  );
}

export default App;
