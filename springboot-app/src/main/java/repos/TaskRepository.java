package repos;
import org.springframework.data.jpa.repository.JpaRepository;
import models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Custom query methods can go here if needed
}

