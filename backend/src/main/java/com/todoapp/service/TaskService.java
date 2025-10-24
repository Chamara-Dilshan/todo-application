package com.todoapp.service;

import com.todoapp.model.Task;
import com.todoapp.model.Task.Status;
import com.todoapp.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repository;

    @Transactional
    public Task create(Task task) {
        task.setId(null); 
        task.setStatus(Status.PENDING); 
        return repository.save(task);
    }

    @Transactional(readOnly = true)
    public List<Task> recentPending() {
        return repository.findTop5ByStatusOrderByCreatedAtDesc(Status.PENDING);
    }

    @Transactional
    public void markDone(Long id) {
        Task task = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setStatus(Status.COMPLETED);
        repository.save(task);
    }
}
