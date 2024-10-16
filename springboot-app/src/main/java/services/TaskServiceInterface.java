package services;

import java.util.List;
import java.util.Optional;

import models.Task;

public interface TaskServiceInterface {
    List<Task> findAllTasks();

    Optional<Task> findTaskById(Long id);

    Task saveTask(Task task);

    void deleteTask(Long id);
}
