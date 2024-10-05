package controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import models.TaskList;
import services.TaskListService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasklists")
@CrossOrigin(origins = "http://localhost:3000")  // Adjust the origin as per your React app's URL
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @GetMapping
    public List<TaskList> getAllTaskLists() {
        return taskListService.findAllTaskLists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskList> getTaskListById(@PathVariable Long id) {
        Optional<TaskList> taskList = taskListService.findTaskListById(id);
        return taskList.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public TaskList createTaskList(@RequestBody TaskList taskList) {
        return taskListService.saveTaskList(taskList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskList> updateTaskList(@PathVariable Long id, @RequestBody TaskList taskListDetails) {
        Optional<TaskList> taskList = taskListService.findTaskListById(id);
        if (taskList.isPresent()) {
            TaskList updatedTaskList = taskList.get();
            updatedTaskList.setName(taskListDetails.getName());
            return ResponseEntity.ok(taskListService.saveTaskList(updatedTaskList));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskList(@PathVariable Long id) {
        taskListService.deleteTaskList(id);
        return ResponseEntity.noContent().build();
    }
}

