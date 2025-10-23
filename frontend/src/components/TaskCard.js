import { useState } from "react";
import { markTaskAsDone } from "../api";

function TaskCard({ task, onDone }) {
  const [loading, setLoading] = useState(false);

  const handleDone = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await markTaskAsDone(task.id);
      // refresh parent list
      if (onDone) onDone();
    } catch (err) {
      console.error("Failed to mark task done", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card task-card">
      <div className="card-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-desc">{task.description}</p>
      </div>
      <div className="card-actions">
        <button className="secondary" onClick={handleDone} disabled={loading}>
          {loading ? "..." : "Done"}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
