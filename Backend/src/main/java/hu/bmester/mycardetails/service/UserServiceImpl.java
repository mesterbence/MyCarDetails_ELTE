package hu.bmester.mycardetails.service;

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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getPrincipal().toString();
        User currentUser = userRepository.findUserByUsername(currentUserName);
        if(currentUser == null) { throw new UsernameNotFoundException(currentUserName + " felhasználó nem létezik."); }
        currentUser.setPassword(password);
        userRepository.save(currentUser);
    }

    @Override
    public void changeUserMail(String mail) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getPrincipal().toString();
        User currentUser = userRepository.findUserByUsername(currentUserName);
        if(currentUser == null) { throw new UsernameNotFoundException(currentUserName + " felhasználó nem létezik."); }
        currentUser.setEmail(mail);
        userRepository.save(currentUser);
    }
}
