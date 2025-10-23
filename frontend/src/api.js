import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const getRecentTasks = () => API.get("/api/tasks/recent");
export const createTask = (task) => API.post("/api/tasks", task);
export const markTaskAsDone = (id) => API.put(`/api/tasks/${id}/done`);

