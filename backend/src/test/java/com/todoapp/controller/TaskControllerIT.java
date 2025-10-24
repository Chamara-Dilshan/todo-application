package com.todoapp.controller;

import com.todoapp.model.Task;
import com.todoapp.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.DynamicPropertyRegistry;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
public class TaskControllerIT {

    @Container
    @SuppressWarnings("resource")
    private static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass");

    @DynamicPropertySource
    static void registerDatasourceProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mysqlContainer::getJdbcUrl);
        registry.add("spring.datasource.username", mysqlContainer::getUsername);
        registry.add("spring.datasource.password", mysqlContainer::getPassword);
    }

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    void setUp() {
        taskRepository.deleteAll();
    }

    @Test
    void testCreateTask() {
        Task task = new Task(null, "Integration Test Task", "Description", Task.Status.PENDING, null);
        ResponseEntity<Task> response = restTemplate.postForEntity("http://localhost:" + port + "/api/tasks", task, Task.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Integration Test Task", response.getBody().getTitle());
    }

    @Test
    void testGetRecentPendingTasks() {
        Task task1 = new Task(null, "Task 1", "Description", Task.Status.PENDING, null);
        Task task2 = new Task(null, "Task 2", "Description", Task.Status.PENDING, null);
        taskRepository.saveAll(List.of(task1, task2));

        ResponseEntity<Task[]> response = restTemplate.getForEntity("http://localhost:" + port + "/api/tasks/recent", Task[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().length);
    }

    @Test
    void testMarkTaskAsDone() {
        Task task = new Task(null, "Task to Complete", "Description", Task.Status.PENDING, null);
        task = taskRepository.save(task);

        restTemplate.put("http://localhost:" + port + "/api/tasks/" + task.getId() + "/done", null);

        Task updatedTask = taskRepository.findById(task.getId()).orElseThrow();
        assertEquals(Task.Status.COMPLETED, updatedTask.getStatus());
    }
}