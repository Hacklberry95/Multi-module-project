package services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import dto.UserRegistrationDto;
import models.UserModel;

public interface UserServiceInterface extends UserDetailsService  {
    List<UserModel> findAllUsers();

    Optional<UserModel> findUserById(Long id);

    UserModel saveUser(UserModel user);

    void deleteUser(Long id);
    
    UserModel registerNewUser(UserRegistrationDto userRegistrationDto);

    String encodePassword(String rawPassword);
}
