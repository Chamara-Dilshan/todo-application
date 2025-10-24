import { useEffect, useState, useCallback } from "react";
import { getRecentTasks } from "../api";
import TaskCard from "./TaskCard";

function TaskList({ exposeRefresh }) {
  const [tasks, setTasks] = useState([]);

  const refresh = useCallback(async () => {
    try {
      const { data } = await getRecentTasks();
      setTasks(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (err) {
      console.error("Failed to load tasks", err);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (exposeRefresh) exposeRefresh(refresh);
  }, [exposeRefresh, refresh]);

  if (!tasks || tasks.length === 0) {
    return <p className="muted">No Tasks Yet</p>;
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
