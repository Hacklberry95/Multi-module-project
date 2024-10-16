package services;

import java.util.List;
import java.util.Optional;

import models.TaskList;

public interface TaskListServiceInterface {
    List<TaskList> findAllTaskLists();

    Optional<TaskList> findTaskListById(Long id);

    TaskList saveTaskList(TaskList taskList);

    void deleteTaskList(Long id);
}
