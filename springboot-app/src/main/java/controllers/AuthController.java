package controllers;

import org.springframework.security.core.Authentication;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.AuthRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDto authRequest, HttpServletRequest request) {
        if (authRequest.getUsername() == null || authRequest.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required");
        }

        if (authRequest.getPassword() == null || authRequest.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            // Set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Create a session and associate it with the SecurityContext
            HttpSession session = request.getSession(true); // true = create session if it doesn't exist
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            System.out.print("USER IS LOGGED IN!!!" + "\n");
            return ResponseEntity.ok(Map.of("authenticated", true, "user", authRequest.getUsername()));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        SecurityContextHolder.clearContext();
        System.out.println("USER IS LOGGED OUT!!!");
        return ResponseEntity.ok("Logout successful");
    }
    
    @GetMapping("/session")
    public ResponseEntity<?> checkSession(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
        	System.out.print("USER IS AUTHENTICATED!!!" + "\n");
            return ResponseEntity.ok().body(Map.of("authenticated", true, "user", authentication.getName()));
        }
        return ResponseEntity.ok().body(Map.of("authenticated", false));
    }
}
