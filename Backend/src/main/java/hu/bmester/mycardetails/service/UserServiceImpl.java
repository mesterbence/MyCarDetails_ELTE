package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.jwt.JwtUtil;
import hu.bmester.mycardetails.model.User;
import hu.bmester.mycardetails.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public void changeUserPassword(String password) {
        User currentUser = jwtUtil.getAuthenticatedUser();
        if(currentUser == null) { throw new UsernameNotFoundException("Felhasználó nem létezik!"); }
        currentUser.setPassword(password);
        userRepository.save(currentUser);
    }

    @Override
    public void changeUserMail(String mail) {
        User currentUser = jwtUtil.getAuthenticatedUser();
        if(currentUser == null) { throw new UsernameNotFoundException("Felhasználó nem létezik!"); }
        currentUser.setEmail(mail);
        userRepository.save(currentUser);
    }
}
