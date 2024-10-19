package services;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dto.UserRegistrationDto;
import models.UserModel;
import repos.UserRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserServiceInterface{

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
        UserModel user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        String[] rolesArray = user.getRoles().split(","); // Split comma-separated roles
        List<GrantedAuthority> authorities = Arrays.stream(rolesArray)
                                                   .map(SimpleGrantedAuthority::new)
                                                   .collect(Collectors.toList());

        // Build and return UserDetails object
        return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                .password(user.getPasswordHash()) // Use the stored password
                .authorities(authorities) // Pass the list of authorities
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
    public UserModel registerNewUser(UserRegistrationDto userRegistrationDto) {
        // Check if the username is already taken
        if (userRepository.findByUsername(userRegistrationDto.getUsername()) != null) {
            throw new IllegalStateException("Username already exists");
        }

        // Create a new user
        UserModel newUser = new UserModel();
        newUser.setUsername(userRegistrationDto.getUsername());
        newUser.setPasswordHash(encodePassword(userRegistrationDto.getPassword()));
        newUser.setEmail(userRegistrationDto.getEmail());
        newUser.setRoles("ROLE_USER");

        // Save to database
        return userRepository.save(newUser);
    }
    

    public String encodePassword(String rawPassword) {
        return new BCryptPasswordEncoder().encode(rawPassword);
    }
}

