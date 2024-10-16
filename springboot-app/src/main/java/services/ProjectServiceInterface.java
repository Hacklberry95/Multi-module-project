package services;

import java.util.List;
import java.util.Optional;

import models.Project;

public interface ProjectServiceInterface {
	
    List<Project> findAllProjects();

    Optional<Project> findProjectById(Long id);

    Project saveProject(Project project);

    void deleteProject(Long id);
}
