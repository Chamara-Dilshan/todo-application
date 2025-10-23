import { useEffect, useState, useCallback } from "react";
import { getRecentTasks } from "../api";
import TaskCard from "./TaskCard";

// TaskList shows up to the most recent 5 tasks. It accepts an `exposeRefresh` prop
// so parent can trigger a refresh when a new task is created.
function TaskList({ exposeRefresh }) {
  const [tasks, setTasks] = useState([]);

  const refresh = useCallback(async () => {
    try {
      const { data } = await getRecentTasks();
      // ensure only most recent 5 tasks are shown
      setTasks(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (err) {
      console.error("Failed to load tasks", err);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // expose refresh to parent
  useEffect(() => {
    if (exposeRefresh) exposeRefresh(refresh);
  }, [exposeRefresh, refresh]);

  if (!tasks || tasks.length === 0) {
    return <p className="muted">No tasks yet</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDone={refresh} />
      ))}
    </div>
  );
}

export default TaskList;
