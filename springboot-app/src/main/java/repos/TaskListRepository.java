package repos;
import org.springframework.data.jpa.repository.JpaRepository;
import models.TaskList;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {
    // Custom query methods can go here if needed
}

