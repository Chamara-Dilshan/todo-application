import { useState } from "react";
import { createTask } from "../api";

function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);
      await createTask({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      if (onCreated) onCreated();
    } catch (err) {
      // In a real app we'd surface the error to the user
      console.error("Failed to create task", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label className="label">
        <span className="label-text">Title</span>
        <input
          placeholder="Title"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="label">
        <span className="label-text">Description</span>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </label>

      <div>
        <button className="primary" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
