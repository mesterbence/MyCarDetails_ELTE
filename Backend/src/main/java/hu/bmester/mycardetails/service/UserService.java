package hu.bmester.mycardetails.service;


import hu.bmester.mycardetails.model.User;

import java.util.List;

public interface UserService {
    List<User> findAllUsers();
    User createUser(User user);
    User findUserByUsername(String username);
    User findUserByEmail(String email);
}
