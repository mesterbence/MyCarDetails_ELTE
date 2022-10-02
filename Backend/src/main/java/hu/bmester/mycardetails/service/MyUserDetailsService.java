package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.User;
import hu.bmester.mycardetails.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(username);
        ArrayList<GrantedAuthority> roles = new ArrayList<>();
        appendRoles(user,roles);
        if(null == user)
            throw new UsernameNotFoundException("Felhasználó nem található: " + username);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), roles);
    }

    private void appendRoles(User user, ArrayList roles) {
        if(user.getRole().equals(UserRole.ADMIN)) {
            roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            roles.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
        if(user.getRole().equals(UserRole.USER)) {
            roles.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }
}
