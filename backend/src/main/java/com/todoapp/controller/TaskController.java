package com.todoapp.controller;

import com.todoapp.model.Task;
import com.todoapp.service.TaskService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody CreateTask request) {
        Task task = Task.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .build();
        return ResponseEntity.ok(taskService.create(task));
    }

    @GetMapping("/recent")
    public List<Task> recent() {
        return taskService.recentPending();
    }

    @PutMapping("/{id}/done")
    public ResponseEntity<Void> markAsDone(@PathVariable Long id) {
        taskService.markDone(id);
        return ResponseEntity.ok().build();
    }

    @Data
    public static class CreateTask {
        @NotBlank @Size(max = 100)
        private String title;

        @Size(max = 10000)
        private String description;
    }
}
