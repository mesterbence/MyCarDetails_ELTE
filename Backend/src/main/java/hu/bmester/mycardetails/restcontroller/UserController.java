package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.model.User;
import hu.bmester.mycardetails.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/user/users")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/api/user/create")
    public ResponseEntity<?> createNewUser(@RequestBody User user) {
        userService.createUser(user);
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.CREATED); // TODO: rendes return
    }
}
