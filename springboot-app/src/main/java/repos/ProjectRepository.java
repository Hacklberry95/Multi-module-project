package repos;
import org.springframework.data.jpa.repository.JpaRepository;
import models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Custom query methods can go here if needed
}

