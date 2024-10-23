package models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private String username;
    private String password;
    private String email;
    private Role role;

    // Constructor to initialize CustomUserDetails from UserModel
    public CustomUserDetails(UserModel userModel) {
        this.username = userModel.getUsername();
        this.password = userModel.getPasswordHash(); 
        this.email = userModel.getEmail();
        this.role = userModel.getRoles();  
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Return the role as GrantedAuthority
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    // You can implement additional methods if needed for email, etc.
    public String getEmail() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
