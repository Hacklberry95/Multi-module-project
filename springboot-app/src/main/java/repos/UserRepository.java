package repos;
import org.springframework.data.jpa.repository.JpaRepository;
import models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    // Custom query methods can go here if needed
	UserModel findByUsername(String username);
}

