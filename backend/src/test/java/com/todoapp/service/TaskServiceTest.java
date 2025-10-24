package com.todoapp.service;

import com.todoapp.model.Task;
import com.todoapp.model.Task.Status;
import com.todoapp.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void testCreateTask() {
        Task task = Task.builder()
            .title("Test Task")
            .description("Description")
            .status(Status.PENDING)
            .build();
        
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task createdTask = taskService.create(task);
        
        assertNotNull(createdTask);
        assertEquals("Test Task", createdTask.getTitle());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testGetRecentPendingTasks() {
        List<Task> tasks = Arrays.asList(
            Task.builder()
            .id(1L)
            .title("Task 1")
            .description("Description")
            .status(Status.PENDING)
            .build(),
            Task.builder()
            .id(2L)
            .title("Task 2")
            .description("Description")
            .status(Status.PENDING)
            .build()
        );
        when(taskRepository.findTop5ByStatusOrderByCreatedAtDesc(Status.PENDING)).thenReturn(tasks);

        List<Task> recentTasks = taskService.recentPending();

        assertEquals(2, recentTasks.size());
        verify(taskRepository, times(1)).findTop5ByStatusOrderByCreatedAtDesc(Status.PENDING);
    }

    @Test
    void testMarkTaskAsDone() {
        Task task = Task.builder()
            .id(1L)
            .title("Test Task")
            .description("Description")
            .status(Status.PENDING)
            .build();
                
        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);

        taskService.markDone(1L);

        assertEquals(Status.COMPLETED, task.getStatus());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testMarkTaskAsDoneNotFound() {
        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> taskService.markDone(1L));

        assertEquals("Task not found", exception.getMessage());
        verify(taskRepository, never()).save(any(Task.class));
    }
}