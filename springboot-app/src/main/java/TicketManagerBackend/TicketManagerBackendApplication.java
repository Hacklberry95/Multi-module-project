package TicketManagerBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "repos")
@SpringBootApplication(scanBasePackages = {"controllers", "models", "repos", "services", "config"})
@EntityScan(basePackages = "models")
public class TicketManagerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketManagerBackendApplication.class, args);
	}
}
