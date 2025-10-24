import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "../components/TaskForm";
import { createTask } from "../api";

jest.mock("../api", () => ({
  createTask: jest.fn(),
}));

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with title and description inputs", () => {
    render(<TaskForm />);

    expect(screen.getByPlaceholderText(/enter task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter task description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("validates inputs and shows error messages", async () => {
    render(<TaskForm />);

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/description is required/i)).toBeInTheDocument();
  });

  test("submits the form when inputs are valid", async () => {
    createTask.mockResolvedValueOnce({});

    render(<TaskForm onCreated={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/enter task title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter task description/i), {
      target: { value: "Test Description" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith({
        title: "Test Title",
        description: "Test Description",
      });
    });
  });
});