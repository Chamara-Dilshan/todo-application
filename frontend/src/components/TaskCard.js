import { useState } from "react";
import { markTaskAsDone } from "../api";

function TaskCard({ task, onDone }) {
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleDone = async () => {
    if (loading || removing) return;
    try {
      setLoading(true);
      await markTaskAsDone(task.id);
      setRemoving(true);
      // Wait for animation before removing from DOM
      setTimeout(() => {
        if (onDone) onDone();
      }, 400); // match CSS animation duration
    } catch (err) {
      console.error("Failed to mark task done", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`card task-card${removing ? " fade-out" : ""}`}>
      <div className="card-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-desc">{task.description}</p>
      </div>
      <div className="card-actions">
        <button className="secondary" onClick={handleDone} disabled={loading || removing}>
          {loading ? (
            <>
              <span className="loading-spinner" />
              <span>Marking done...</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Done
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
