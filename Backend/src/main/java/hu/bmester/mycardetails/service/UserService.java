package hu.bmester.mycardetails.service;


import hu.bmester.mycardetails.model.User;

import java.util.List;

public interface UserService {
    List<User> findAllUsers();
    User createUser(User user);
}
