package services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import models.TaskList;
import repos.TaskListRepository;
import java.util.List;
import java.util.Optional;

@Service
public class TaskListService {

    @Autowired
    private TaskListRepository taskListRepository;

    public List<TaskList> findAllTaskLists() {
        return taskListRepository.findAll();
    }

    public Optional<TaskList> findTaskListById(Long id) {
        return taskListRepository.findById(id);
    }

    public TaskList saveTaskList(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public void deleteTaskList(Long id) {
        taskListRepository.deleteById(id);
    }
}

