import { useState } from "react";
import { createTask } from "../api";

function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const TITLE_MAX_LENGTH = 50;
  const DESC_MAX_LENGTH = 500;

  const validateForm = () => {
    const newErrors = {};
    
    // Title validations
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.length > TITLE_MAX_LENGTH) {
      newErrors.title = `Title cannot exceed ${TITLE_MAX_LENGTH} characters`;
    }

    // Description validations
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters";
    } else if (description.length > DESC_MAX_LENGTH) {
      newErrors.description = `Description cannot exceed ${DESC_MAX_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await createTask({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      setErrors({});
      if (onCreated) onCreated();
    } catch (err) {
      setErrors({ submit: "Failed to create task. Please try again." });
      console.error("Failed to create task", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label className="label">
        {/* <span className="label-text"><span className="required"></span></span> */}
        <input
          placeholder="Enter Task Title"
          maxLength={TITLE_MAX_LENGTH}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) validateForm();
          }}
          className={errors.title ? "error" : ""}
          required
        />
        <div className="input-meta">
          {errors.title ? (
            <span className="error-text">{errors.title}</span>
          ) : (
            <span className="char-count">
              {title.length}/{TITLE_MAX_LENGTH}
            </span>
          )}
        </div>
      </label>

      <label className="label">
        {/* <span className="label-text"><span className="required"></span></span> */}
        <textarea
          placeholder="Enter Task Description"
          maxLength={DESC_MAX_LENGTH}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) validateForm();
          }}
          className={errors.description ? "error" : ""}
          required
          rows={4}
        />
        <div className="input-meta">
          {errors.description ? (
            <span className="error-text">{errors.description}</span>
          ) : (
            <span className="char-count">
              {description.length}/{DESC_MAX_LENGTH}
            </span>
          )}
        </div>
      </label>

      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <div className="button-container">
        <button 
          className="primary" 
          type="submit" 
          disabled={loading || Object.keys(errors).length > 0}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
