package hu.bmester.mycardetails.service;

import hu.bmester.mycardetails.model.User;
import hu.bmester.mycardetails.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public User createUser(User user) {
        userRepository.save(user);
        return user; // TODO: rendes return
    }
}
