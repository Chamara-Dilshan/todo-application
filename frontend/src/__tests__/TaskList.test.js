import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import TaskList from "../components/TaskList";
import { getRecentTasks } from "../api";

jest.mock("../api", () => ({
  getRecentTasks: jest.fn(),
}));

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders 'No tasks yet' when there are no tasks", async () => {
    getRecentTasks.mockResolvedValueOnce({ data: [] });

    render(<TaskList />);

    expect(await screen.findByText(/no tasks yet/i)).toBeInTheDocument();
  });

  test("renders a list of tasks", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", description: "Description 1" },
      { id: 2, title: "Task 2", description: "Description 2" },
    ];

    getRecentTasks.mockResolvedValueOnce({ data: mockTasks });

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    });
  });

  test("handles API errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    getRecentTasks.mockRejectedValueOnce(new Error("API Error"));

    render(<TaskList />);

    expect(await screen.findByText(/no tasks yet/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});