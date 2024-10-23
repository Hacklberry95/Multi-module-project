package services;

import dto.UserRegistrationDto;
import models.CustomUserDetails;
import models.Role;
import models.UserModel;
import repos.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserModel> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserModel> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public UserModel saveUser(UserModel user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find user in database
        UserModel userModel = userRepository.findByUsername(username);
        if (userModel == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        // Create CustomUserDetails object from UserModel
        return new CustomUserDetails(userModel);
    }

    public UserModel registerNewUser(UserRegistrationDto userRegistrationDto) {
        // Check if username or email already exists
        if (userRepository.findByUsername(userRegistrationDto.getUsername()) != null) {
            throw new IllegalStateException("Username already exists");
        }
        if (userRepository.findByEmail(userRegistrationDto.getEmail()) != null) {
            throw new IllegalStateException("Email already exists");
        }

        // Create a new user
        UserModel newUser = new UserModel();
        newUser.setUsername(userRegistrationDto.getUsername());
        newUser.setPasswordHash(encodePassword(userRegistrationDto.getPassword()));
        newUser.setEmail(userRegistrationDto.getEmail());
        newUser.setRoles(Role.USER); 

        // Save the new user to the database
        return userRepository.save(newUser);
    }

    public String encodePassword(String rawPassword) {
        return new BCryptPasswordEncoder().encode(rawPassword);
    }
}
